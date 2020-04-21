import axios from 'axios';

const listAll = async() => {
    return axios
        .get("http://localhost:5000/")
        .then(res => {
            return res.data
        })
        .catch(err => { throw err.response.data })
}

export {
    listAll
};