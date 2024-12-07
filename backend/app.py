from flask import Flask, jsonify, request, Response
from flask_cors import CORS
import boto3
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app, origins=["http://localhost:3000"])

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(MONGO_URI)
db = client.videoStreaming
videos_collection = db.videos

s3_client = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY"),
    aws_secret_access_key=os.getenv("AWS_SECRET_KEY"),
    region_name=os.getenv("AWS_REGION"),
)

BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")


@app.route("/api/videos", methods=["GET"])
def get_videos():
    """Fetch metadata for all videos."""
    try:
        videos = list(videos_collection.find({}, {"_id": 0}))
        return jsonify(videos)
    except Exception as e:
        return jsonify({"error": f"Error fetching videos: {str(e)}"}), 500


@app.route("/api/video/<filename>", methods=["GET"])
def stream_video(filename):
    """Stream video using byte-range requests or presigned URL."""
    range_header = request.headers.get("Range", None)
    video_metadata = videos_collection.find_one({"filename": filename})
    if not video_metadata:
        return jsonify({"error": "Video not found in the database."}), 404
    bucket_key = f"videos/{filename}"

    try:
        presigned_url = s3_client.generate_presigned_url(
            "get_object",
            Params={"Bucket": BUCKET_NAME, "Key": bucket_key},
            ExpiresIn=36000,
        )
    except Exception as e:
        return jsonify({"error": f"Error generating presigned URL: {str(e)}"}), 500

    if range_header:
        byte1, byte2 = 0, None
        try:
            if "bytes=" in range_header:
                byte_range = range_header.split("bytes=")[1].split("-")
                byte1 = int(byte_range[0])
                if len(byte_range) > 1 and byte_range[1]:
                    byte2 = int(byte_range[1])

            range_request = {"Range": f"bytes={byte1}-{byte2}"}
            response = s3_client.get_object(Bucket=BUCKET_NAME, Key=bucket_key, Range=range_request)

            return Response(
                response["Body"].read(),
                206,
                content_type="video/mp4",
                status=206,
                headers={
                    "Content-Range": f"bytes {byte1}-{byte2}/{response['ContentLength']}",
                    "Accept-Ranges": "bytes",
                },
            )
        except Exception as e:
            return jsonify({"error": f"Error fetching video with byte range: {str(e)}"}), 400

    return jsonify({"presigned_url": presigned_url}), 200

CORS(app, resources={r"/*": {"origins": "*"}})

if __name__ == "__main__":
    app.run(debug=True)
