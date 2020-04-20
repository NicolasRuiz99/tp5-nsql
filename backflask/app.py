from flask import Flask
from flask import render_template, jsonify, request, redirect, url_for
import json
from connectiondb import inicializar_db1
from api_connection import get_data
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/update_db', methods=['GET'])
def update_db():
    try:
        db = inicializar_db1()
        db.list.drop()
        data = get_data()
        db.list.insert_many(data)
        return "OK"
    except (Exception) as err:
        return str(err), 500

@app.route('/delete', methods=['POST'])
def delete():
    try:
        id = request.json['id']
        db = inicializar_db1()
        db.list.delete_one({"id":str(id)})
        return "OK"
    except (Exception) as err:
        return str(err), 500

@app.route('/get_api', methods=['GET'])
def get_api():
    return str(get_data())

@app.route('/search', methods=['POST'])
def search():
    try:
        name = request.json["name"]
        db = inicializar_db1()
        res = []
        for x in db.list.find({"name":str(name)},{"_id":0}):
            res.append(x)
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

@app.route('/get', methods=['POST'])
def get():
    try:
        id = request.json['id']
        db = inicializar_db1()
        res = db.list.find_one({"id":str(id)},{"_id":0})
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

@app.route('/', methods=['GET'])
def listall():
    try:
        db = inicializar_db1()
        res = []
        for x in db.list.find({},{"_id":0}):
            res.append(x)
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

@app.route('/top5', methods=['GET'])
def top5():
    try:
        db = inicializar_db1()
        res = []
        for x in db.list.find({"$where":"parseInt(this.cmc_rank)<=5"},{"_id":0}):
            res.append(x)
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

@app.route('/top20', methods=['GET'])
def top20():
    try:
        db = inicializar_db1()
        res = []
        for x in db.list.find({"$where":"parseInt(this.cmc_rank)<=20"},{"_id":0}):
            res.append(x)
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

if __name__ == '__main__':
    app.run(host='backflask', port='5000', debug=True)