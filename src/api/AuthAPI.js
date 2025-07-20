import api from "@/lib/axios";

export default {

    register(data) {
        return api.post('/auth/register', data)
    },

    verifyAccount(token) {
        return api.get(`/auth/verify/${token}`)
    },

    login(data) {
        return api.post('/auth/login', data)
    },
    auth() {
        const token = localStorage.getItem('AUTH_TOKEN')
        return api.get('/auth/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    admin() {
        const token = localStorage.getItem('AUTH_TOKEN')
        return api.get('/auth/admin', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },
    forgotPassword(data){
        return api.post('/auth/forgot-password', data)
    },
    verifyPasswordResetToken(token) {
        return api.get(`/auth/forgot-password/${token}`)
    },
    updatePassword(token, data) {
        return api.post(`/auth/forgot-password/${token}`, data)
    }

}

