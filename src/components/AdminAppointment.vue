<script setup>
import { displayDate } from '../helpers/date'
import { formatCurrency } from '../helpers';

const props = defineProps({
    appointment: {
        type: Object
    }
})

//console.log(props.appointment.user);

</script>

<template>
          <div 
              class="bg-white p-5 space-y-3 rounded-lg"
          >
                <p class="text-gray-500 font-black">
                    Fecha: <span class="font-normal"> <em>{{ displayDate( appointment.date ) }}</em>  </span>
                    Hora: <span class="font-normal"> <em>{{ appointment.time }} Horas.</em> </span>
                </p>

                <p class="text-gray-500 font-black">
                    Nombre Cliente: <span class="font-normal"> <em>{{ appointment.user.name }}</em>  </span>
                    Email: <span class="font-normal"> <em>{{ appointment.user.email }}</em>  </span>
                </p>

                <p class="text-lg font-black">Servicios Solicitados en la cita</p>
                <div v-for="service in appointment.services">
                    <p>{{ service.name }}</p>
                    <p class="text-2xl font-black text-blue-500">{{ formatCurrency( service.price ) }}</p>
                </div>

                <p class="text-2xl font-black text-right">
                    Total a pagar: <span class="text-blue-600"> {{ formatCurrency( appointment.totalAmount ) }} </span>
                </p>
            </div>
</template>