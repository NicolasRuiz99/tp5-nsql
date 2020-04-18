from flask import Flask
from flask import render_template, jsonify, request, redirect, url_for
import json
from connectiondb import inicializar
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def index():
    db = inicializar()
    res = []
    for x in db.customers.find({}):
        res.append(x)
    return str(res)


if __name__ == '__main__':
    app.run(host='backflask', port='5000', debug=True)