from flask import Flask, request, jsonify
from flask_cors import cross_origin
from clustering import get_clusters
import json
import requests

app = Flask(__name__)


@app.route('/api/cluster', methods=['POST'])
@cross_origin(origins='*', send_wildcard=True)
def cluster_from_file():
    file = request.files['file']
    text = file.read().decode("utf-8")
    clusters = get_clusters(text)
    return jsonify(json.dumps(clusters, default=lambda o: o.__dict__))


@app.route('/api/aem/fetch', methods=['POST'])
@cross_origin(origins='*', send_wildcard=True)
def fetch_from_aem():
    print("Xd")
    print(request.form)
    url = request.form['url']
    user = request.form['user']
    pwd = request.form['pwd']
    addr = f'http://{user}:{pwd}@{url}/system/console/slinglog/tailer.txt?name=%2Flogs%2Ferror.log'
    print(addr)
    logs = requests.get(addr).text
    logs = '\n'.join([log for log in logs.split('\n') if 'ERROR' in log])
    print("gotit")
    print(logs)
    clusters = get_clusters(logs)
    return jsonify(json.dumps(clusters, default=lambda o: o.__dict__))


if __name__ == '__main__':
    app.run(host='localhost')
