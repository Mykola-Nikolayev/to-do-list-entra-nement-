import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:5050'
})
/*`axios.create()` est utilisé pour créer une instance d'Axios nommée `api`. Cette instance est configurée avec une URL de base `'http://localhost:5050'`, 
ce qui signifie que toutes les requêtes effectuées avec cette instance auront cette URL comme préfixe*/
api.interceptors.request.use(config => {
    const authToken = localStorage.getItem('authToken')

    if(authToken) {
        config.headers.Authorization = `Bearer ${authToken}`
    }

 //ajoute un en-tête d'autorisation avec un jeton JWT à chaque requête sortante mais a revoir
    return config;
}, error => {
    return Promise.reject(error);
})