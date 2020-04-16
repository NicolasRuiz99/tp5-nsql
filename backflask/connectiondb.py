from pymongo import MongoClient

def inicializar ():
    client = MongoClient(host='localhost',port=27017)

    mydb = client["mydatabase"]

    dblist = client.list_database_names()
    if "mydatabase" in dblist:
        print("The database exists.")