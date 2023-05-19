import axios from 'axios'

const LAPTOP_API_BASE_URL = "http://localhost:8080/api/v1/laptops";

class LaptopService {
    getAllLaptops() {
        return axios.get(LAPTOP_API_BASE_URL);
    }
    createLaptop(formdata) {
        return axios.post(LAPTOP_API_BASE_URL, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });
    }
    getLaptops(id) {
        return axios.get(LAPTOP_API_BASE_URL + '/' + id);
    }
    updateLaptop(Laptop, id) {
        return axios.put(LAPTOP_API_BASE_URL + '/' + id, Laptop, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });
    }
    deleteLaptop(id) {
        return axios.delete(LAPTOP_API_BASE_URL + '/' + id);
    }
}

const laptopService = new LaptopService();
export default laptopService;