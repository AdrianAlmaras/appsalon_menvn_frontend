import api from '../lib/axios.js';

export default {
    create(data) {
        const token = localStorage.getItem('AUTH_TOKEN')
        return api.post('/appointments', data)
    },
    getByDate(date) {
        return api.get(`/appointments/?date=${date}`)
    },
    getUserAppointments(userId) {
        return api.get(`/users/${userId}/appointments`)
    },
    getAppointmentById(appointmentId) {
        return api.get(`/appointments/${appointmentId}`)
    },
    updateAppointment(id, data) {
        return api.put(`/appointments/${id}`, data)
    },
    deleteAppointment(id) {
        return api.delete(`/appointments/${id}`)
    }
}

