import axios from 'axios';

export default class RestService {
    constructor() {
        this.backendURL = "http://ratemeapi.azurewebsites.net/api";
    }
    getService(id) {
        return axios.get(this.backendURL + '/service/' + id);
    }

    getServices(name) {
        return axios.get(this.backendURL + '/search/' + name);
    }

    generateCode(userId, clientId) {
        return axios.post(this.backendURL + '/code/', {
            'clientID': clientId,
            'userId': userId
        })
    }

    getServiceByToken(token) {
        return axios.get(this.backendURL + '/info/' + token);
    }

    use() {
        return true
    }
}
