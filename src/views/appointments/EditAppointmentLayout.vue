<script  setup>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';
import AppointmentAPI from '@/api/AppointmentAPI';
import { useAppointmentsStore } from '@/stores/appointments';

// info de la rutas
const route = useRoute();
const router = useRouter();
const appointmentStore = useAppointmentsStore();

//console.log(route.params.id);
const { id } = route.params;

// cuando cargue el layout uqeremos que cargue la info de la cita
onMounted( async () => {
    try {
        // console.log(id);
        const { data } = await AppointmentAPI.getAppointmentById(id);
        // pasar la data al store
        appointmentStore.setSelectedAppointment(data)
        // console.log(data);
    } catch (error) {
        console.log(error);
        router.push({name: 'my-appointments'})
    }
})

</script>

<template>
    <nav class="my-5 flex gap-3">
        <RouterLink 
            :to="{name: 'edit-appointment'}"
            class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
            :class="route.name === 'edit-appointment'  ? 'bg-blue-600 text-white' : 'bg-white text-blue-500'"
        >
            Servicios
        </RouterLink>

        <RouterLink 
            :to="{name: 'edit-appointment-details'}"
            class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
            :class="route.name === 'edit-appointment-details' ? 'bg-blue-600 text-white' : 'bg-white text-blue-500'"
        >
            Cita y Resumen
        </RouterLink>
    </nav>

    <div class="space-y-5">
        <RouterView />
    </div>
</template>


