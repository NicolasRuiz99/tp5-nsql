from flask import Flask
from flask import render_template, jsonify, request, redirect, url_for
import json
from connectiondb import inicializar_db1,inicializar_db2
from api_connection import get_data
from flask_cors import CORS
from hasheo import hasheo_db,hashear

app = Flask(__name__)
CORS(app)

def validacion (db1_list,db2):
    res = False
    for i in db1_list:
        data1 = hashear(i)
        data2 = db2.list.find_one({"cmc_rank":i["cmc_rank"]},{"_id":0})
        if (data1 == data2["hash"]):
            res = True
        else:
            res = False
            break
    return res

def validacion_one (item,db2):
    res = False
    data1 = hashear(item)
    data2 = db2.list.find_one({"cmc_rank":item["cmc_rank"]},{"_id":0})
    if (data1 == data2["hash"]):
        res = True
    else:
        res = False
    return res

#ruta para actualizar la bbdd con los datos de la api

@app.route('/update_db', methods=['GET'])
def update_db():
    try:
        #Cargamos la primera bbdd
        db = inicializar_db1()
        db.list.drop()
        data = get_data()
        db.list.insert_many(data)
        #y obtenemos datos
        data = db.list.find({},{"_id":0})
        #los hasheamos y cargamos en la bbdd2
        hash_data = hasheo_db (data)
        db2 = inicializar_db2()
        db2.list.drop()
        db2.list.insert_many(hash_data)
        return "OK"
    except (Exception) as err:
        return str(err), 500

#ruta para eliminar una criptomoneda dado el ranking

@app.route('/delete', methods=['POST'])
def delete():
    try:
        rank = request.json['rank']
        db = inicializar_db1()
        db2 = inicializar_db2()
        db.list.delete_one({"cmc_rank":str(rank)})
        db2.list.delete_one({"cmc_rank":str(rank)})
        return "OK"
    except (Exception) as err:
        return str(err), 500

#ruta para buscar una moneda dado el nombre

@app.route('/search', methods=['POST'])
def search():
    try:
        name = request.json["name"]
        db = inicializar_db1()
        db2 = inicializar_db2()
        res = db.list.find_one({"name":str(name)},{"_id":0})
        if (res != None) and (validacion_one(res,db2) == False):
            raise Exception ('corrupt data')
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

#ruta para obtener una moneda dado el id

@app.route('/get', methods=['POST'])
def get():
    try:
        id = request.json['id']
        db = inicializar_db1()
        db2 = inicializar_db2()
        res = db.list.find_one({"id":str(id)},{"_id":0})
        if (res != None) and (validacion_one(res,db2) == False):
            raise Exception ('corrupt data')
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

#listado de las 500 criptomonedas

@app.route('/', methods=['GET'])
def listall():
    try:
        db = inicializar_db1()
        db2 = inicializar_db2()
        res = []
        for x in db.list.find({},{"_id":0}):
            res.append(x)
        if (validacion(res,db2) == False) or (db.list.count() != db2.list.count()):
            raise Exception ('corrupt data')
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

#listado del top5

@app.route('/top5', methods=['GET'])
def top5():
    try:
        db = inicializar_db1()
        db2 = inicializar_db2()
        res = []
        for x in db.list.find({"$where":"parseInt(this.cmc_rank)<=5"},{"_id":0}):
            res.append(x)
        if (validacion(res,db2) == False) or (db.list.count() != db2.list.count()):
            raise Exception ('corrupt data')
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

#listado del top20

@app.route('/top20', methods=['GET'])
def top20():
    try:
        db = inicializar_db1()
        db2 = inicializar_db2()
        res = []
        for x in db.list.find({"$where":"parseInt(this.cmc_rank)<=20"},{"_id":0}):
            res.append(x)
        if (validacion(res,db2) == False) or (db.list.count() != db2.list.count()):
            raise Exception ('corrupt data')
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

if __name__ == '__main__':
    app.run(host='backflask', port='5000', debug=True)