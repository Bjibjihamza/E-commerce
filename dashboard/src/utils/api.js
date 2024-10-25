import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchDataFromApi = async (url) => {
    try {
        const { data } = await axios.get(`${BASE_URL}${url}`);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const postData = async (url, formData) => {
    try {
        const response = await axios.post(`${BASE_URL}${url}`, formData);
        return response.data; 
    } catch (error) {
        console.error("Erreur lors de l'envoi des données :", error);

        return {
            error: true,
            message: error.response ? error.response.data.msg : "Une erreur est survenue",
            status: error.response ? error.response.status : 500
        };
    }
};


export const postData_v2 = async (url, formData) => {
    try {
        const response = await axios.post(`${BASE_URL}${url}`, formData);
        return response.data; 
    } catch (error) {
        console.error("Erreur lors de l'envoi des données :", error);

        return {
            error: true,
            message: error.response ? error.response.data.msg : "Une erreur est survenue",
            status: error.response ? error.response.status : 500
        };
    }
};

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

export const editData = async (url, updatedData) => {
    const { res } = await axios.put(`${BASE_URL}${url}`, updatedData);
    return res;
};

export const deletData = async (url) => {
    const { res } = await axios.delete(`${BASE_URL}${url}`);
    return res;
};

export const deleteImages = async (url, imgUrl) => {
    try {
        const res = await axios.delete(`${BASE_URL}${url}?imgUrl=${encodeURIComponent(imgUrl)}`);
        return res;
    } catch (error) {
        console.error("Erreur lors de la suppression de l'image :", error);
        throw error;
    }
};
