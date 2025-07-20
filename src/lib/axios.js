import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use((config) => {
    // si encuentra algun token lo agrega en el request
    const token = localStorage.getItem('AUTH_TOKEN');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    // sobreescribimos en la config y la retornamos para que asi forme parte de cada request
    return config
})

export default api

// interceptors - funciones que puedes agregar al instancia de axios hay para los request y las respuestas
/*
Los interceptors en Axios son funciones que te permiten interceptar y modificar las peticiones o
respuestas de tus solicitudes HTTP antes de que lleguen al servidor o al cliente, respectivamente.

¿Para qué sirven?
Interceptar y modificar peticiones (ej. agregar un token de autenticación).

Interceptar y modificar respuestas (ej. manejar errores globales).

Registrar logs o métricas.

Mostrar spinners/cargadores de forma global.



*/