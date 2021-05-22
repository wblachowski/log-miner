from flask import Flask, request, jsonify
from flask_cors import cross_origin
from clustering import get_clusters
import json

app = Flask(__name__)


@app.route('/api/cluster', methods=['POST'])
@cross_origin(origins='*', send_wildcard=True)
def cluster_from_file():
    file = request.files['file']
    text = file.read().decode("utf-8")
    clusters = get_clusters(text)
    return jsonify(json.dumps(clusters, default=lambda o: o.__dict__))


if __name__ == '__main__':
    app.run(host='localhost')
