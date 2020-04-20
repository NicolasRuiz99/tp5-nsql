import hashlib

def hashear (x):
    x = str (x)
    res = hashlib.sha512(x.encode())
    return str(res.hexdigest())

def hasheo_db (db1_list):
    db2_list = []
    for i in db1_list:
        item = {
            "cmc_rank":i["cmc_rank"],
            "hash":hashear(i)
        }
        db2_list.append (item)

    return db2_list