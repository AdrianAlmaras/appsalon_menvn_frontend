import { ref, onMounted } from 'vue'; // al momento que se cargue el store se carguen los servicios
import {  defineStore  } from 'pinia';
import ServicesAPI from '@/api/ServicesAPI';

export const useServicesStore = defineStore('services', () => {
    const services = ref([]);

    onMounted(async () => {
        try {
            const { data } = await ServicesAPI.all();
            services.value = data;
            //console.log(data);
        } catch (error) {
            console.log(error);
        }
    })


    return {
        services
    }
})

