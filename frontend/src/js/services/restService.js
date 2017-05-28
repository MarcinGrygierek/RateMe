import axios from 'axios';

export default class RestService {
    constructor() {
        this.backendURL = "http://localhost:5000/api"
    }
    getService(id) {
        return axios.get(this.backendURL + '/service/' + id);
    }

    getServices(name) {
        return axios.get(this.backendURL + '/search/' + name);
    }

    generateCode(name, id) {
        return axios.post(this.backendURL + '/code/', {
            'clientID': id,
            'userName': name
        })
    }

    use() {
        return true
    }
}
