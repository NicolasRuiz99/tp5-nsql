import axios from 'axios';

const listAll = async() => {
    return axios
        .get("http://localhost:5000/")
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const listTop5 = async() => {
    return axios
        .get("http://localhost:5000/top5")
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const listTop20 = async() => {
    return axios
        .get("http://localhost:5000/top20")
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

const deleteItem = async(rank) => {
    return axios
        .post("http://localhost:5000/delete", {
            rank
        })
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

export {
    listAll,
    deleteItem,
    listTop5,
    listTop20
};