import { ref, onMounted, computed } from 'vue';
import { defineStore } from "pinia";
import { useRouter } from 'vue-router';
import AuthAPI from '@/api/AuthAPI';
import AppointmentAPI from '@/api/AppointmentAPI';

export const useUserStore = defineStore('user', () => {
    const router = useRouter();
    const user = ref({});
    const userAppointments = ref([]);
    const loading = ref(true)

    // obtenemos el usuario tan pronto cuando tarde en cargar el store
    onMounted(async () => {
        try {
            // aautenticamos al usuario
            const {data} = await AuthAPI.auth();
            //console.log(data);
            // asiganamos al state
            user.value = data;

            // consultamos las citas del usuario
            await getUserAppointments()
        } catch (error) {
            console.log(error);
        } finally {
            loading.value = false
        }
    });

    async function getUserAppointments() {
        //let data = []
        const {data}  = await AppointmentAPI.getUserAppointments(user.value._id);
        //console.log(data);
        userAppointments.value = data;
    }

    function logout() {
        localStorage.removeItem('AUTH_TOKEN');
        user.value = {};
        router.push({name: 'login'})
    }

    const getUserName = computed(() => user.value?.name ? user.value?.name : '');

    const getUserId = computed(() => user.value?._id ? user.value?._id : '');

    const noAppointments = computed(() => userAppointments.value.length === 0 );

    const getAppointmentsComputed = computed(() => userAppointments.value.length > 0 ? userAppointments.value : [] );

    return {
        user,
        getUserName,
        logout,
        getUserAppointments,
        noAppointments,
        loading,
        userAppointments,
        getUserId,
        getAppointmentsComputed
    }
})


