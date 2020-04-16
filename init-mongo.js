db.createUser({
    user: "tp_crypto",
    psw: "cryptopass",
    roles: [{
        role: "readWrite",
        db: "db_crypto"
    }]
})