import axios from 'axios';

export default class RestService {
    get(entity) {
        return axios.get(`/${entity}`);
    }
}
