<script setup>
import { formatCurrency } from '@/helpers';
import { useAppointmentsStore } from '@/stores/appointments';
import SelectedService from '@/components/SelectedService.vue';
import DatePicker from '@/components/DatePicker.vue';
import { ref } from 'vue';

const appointmentsStore = useAppointmentsStore();

const formatter = ref({
    date: 'DD/MM/YYYY',
    month: 'MMM'
});

</script>

<template>
    <h2 class="text-4xl font-extrabold text-white ">Detalles Cita y Resumen</h2>
    <p class="text-white text-lg">A continuación verifica la información y confirma tu cita</p>

    <h3 class="text-3xl font-extrabold text-white">Servicios</h3>  

    <p v-if="appointmentsStore.noServicesSelected" class="text-lg text-white text-center"> No hay servicios seleccionados </p>

    <div v-else class="grid gap-5 ">
        <SelectedService 
            v-for=" service in appointmentsStore.services"
            :key="service._id"
            :service="service"
        />

        <p class="text-right text-white text-2xl">Total a pagar: 
            <span class="font-black"> {{ formatCurrency(appointmentsStore.totalAmount) }} </span>
        </p>
    </div>

    <div class="space-y-9"  v-if="!appointmentsStore.noServicesSelected">
        <div>
            <h3 class="text-3xl font-extrabold text-white">Fecha y Hora</h3>
            <p class="text-white text-lg">Selecciona la fecha y la hora</p>
        </div>
        
        <div class="lg:flex gap-5 items-start">
            <div class="w-full lg:w-96 flex justify-center rounded-lg">
                <DatePicker 
                    v-model="appointmentsStore.date"
                />
            </div>

            <div v-if="appointmentsStore.isDateSelected" class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0">
                <button
                    class="block  rounded-lg text-xl font-black p-3 disabled:opacity-20"
                    v-for="hour in appointmentsStore.hours"
                    @click="appointmentsStore.time = hour"
                    :disabled="appointmentsStore.disableTime(hour) ? true : false "
                    :class="appointmentsStore.time === hour ? 'bg-blue-600 text-white' : 'text-blue-600 bg-white' "
                >
                    {{ hour }}
                </button>
            </div>
        </div>

        <div v-if="appointmentsStore.isValidReservation" class="flex justify-end py-5" >
            <button
                class="w-full md:w-auto bg-blue-600 p-4 rounded-lg uppercase font-black text-white block"
                @click="appointmentsStore.saveAppointment"
            >
                Confirmar Reservación
            </button>
        </div>
       
    </div>

</template>
