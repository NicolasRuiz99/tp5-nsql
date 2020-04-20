from pymongo import MongoClient

def inicializar_db1 ():
    try:
        client = MongoClient(host='db',port=27017)

        mydb = client["crypto_coins"]
        return mydb
    except (Exception) as err:
        return err

def inicializar_db2 ():
    try:
        client = MongoClient(host='db2',port=27017)

        mydb = client["crypto_coins"]
        return mydb
    except (Exception) as err:
        return err