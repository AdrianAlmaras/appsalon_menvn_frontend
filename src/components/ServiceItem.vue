<script setup>
import { formatCurrency } from '@/helpers';
import { useAppointmentsStore } from '../stores/appointments';

const appointments = useAppointmentsStore();

defineProps({
    service: {
        type: Object,
        required: true
    }
});

</script>

<template>

    <div 
        :class=" appointments.isServiceSelected(service._id) ? 'bg-blue-600 text-white' : 'bg-white' "
        class="p-5 space-y-5 rounded-lg cursor-pointer" 
        @click="appointments.onServiceSelected(service)"
    >
       
       <p class="text-2xl font-light"> {{ service.name }} </p> 

       <p 
        :class=" appointments.isServiceSelected(service._id) ? ' text-white' : 'text-blue-600' "
        class="text-3xl font-black "
        > {{ formatCurrency(service.price) }} </p>

    </div>

</template>


