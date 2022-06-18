// https://www.bezkoder.com/vue-axios-file-upload/

import axios from 'axios'
import authHeader from './auth-header'
const API_URL = 'https://webprogevent.herokuapp.com/api/'
class UploadService {
    upload = (file) => {
        let formData = new FormData();
        formData.append('file', file);
        console.log(formData)
        return axios.post(API_URL + 'upload', formData, { headers: authHeader() });
    }

    download = (file) => {
        console.log(file)
        return axios.get(API_URL + 'download/' + file, {}, { headers: authHeader() });
    }
}

export default new UploadService()