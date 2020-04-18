from pymongo import MongoClient

def inicializar ():
    client = MongoClient(host='db',port=27017)

    mydb = client["mydatabase"]
    return mydb
    #mycol = mydb["customers"]

    #mydict = { "name": "John", "address": "Highway 37" }

    #x = mycol.insert_one(mydict)

    #dblist = client.list_database_names()
    #if "mydatabase" in dblist:
    #    return "The database exists."
    #return "OK"