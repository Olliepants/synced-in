import axios from 'axios'

export default {
    readProfiles: _read
}


function _read() {

    return axios.get(process.env.REACT_APP_BACKEND_ORIGIN + '/api/profiles/')
        .then(onSuccess)
        .catch(onError)
}

function onSuccess(response) {
    return response.data
}

function onError(xhr) {
    console.log(xhr)
    return Promise.reject(xhr.data)
}
