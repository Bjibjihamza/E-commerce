import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;


export const fetchDataFromApi = async(url) => {
    
    try {
        const { data } = await axios.get(`${BASE_URL}${url}`);
        return data;
    } catch(error) {
        console.log(error);
        return error;
    }
}

export const postData = async (url, FormData) => {
    try {
        const { res } = await axios.post(`${BASE_URL}${url}`, FormData);
        return res; 
    } catch(error) {
        console.error("error", error);
    }
}



export const postUser = async (url, FormData) => {
    try {
        console.log('Data sending...');
        const res = await axios.post(`${BASE_URL}${url}`, FormData);  // Send FormData without recaptchaToken
        return res.data;  // Return the response data instead of just res
    } catch (error) {
        console.error("Error:", error);
        throw error;  // Throw the error to be caught in the calling function
    }
};


export const postData_v2 = async (url, formData) => {
    try {
        const response = await axios.post(`${BASE_URL}${url}`, formData);
        return response.data; 
    } catch (error) {
        console.error("Error posting data:", error);
        throw error;
    }
};

export const editData = async (url, updatedData) => {
    const { res } = await axios.put(`${BASE_URL}${url}`, updatedData);
    return res; 
}

export const deletData = async (url) => {
    const { res } = await axios.delete(`${BASE_URL}${url}`);
    return res; 
}

export const deleteImages = async (url, imgUrl) => {
    try {
        // Envoyer imgUrl comme paramètre de requête dans DELETE
        const res = await axios.delete(`${BASE_URL}${url}?imgUrl=${encodeURIComponent(imgUrl)}`);
        return res;
    } catch (error) {
        console.error("Error deleting image:", error);
        throw error;
    }
};
