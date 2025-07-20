<script setup>
import { onMounted, ref } from 'vue';
import Appointment from '@/components/Appointment.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();


// onMounted(async () => {
//     const userId = userStore.getUserId();
//     userStore.getUserAppointments(userId);
//     console.log(userStore.userAppointments);
      
//     });

</script>

<template>
    <h2 class="text-4xl font-extrabold text-white mt-10">Mis Citas</h2>
    <p class="text-white text-lg mt-5">A continuación podrás administrar tus próximas citas</p>

    <p v-if="userStore.loading" class="text-white text-2xl text-center mt-5">Cargando...</p>

    <div v-else>
        <p class="text-white text-2xl text-center mt-5" v-if="userStore.noAppointments" > 
            No tienes próximas citas 
        </p>
        
        <div v-else class="grid grid-cols-1 gap-5 mt-10" >
            <Appointment
                v-for=" appointment in userStore.getAppointmentsComputed"
                :key="appointment._id"
                :appointment="appointment"
            />
        </div>
    </div>



    
</template>
