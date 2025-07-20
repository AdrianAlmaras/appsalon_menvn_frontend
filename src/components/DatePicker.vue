<!-- SFC file -->
<script setup>
import { ref } from "vue";
import VueTailwindDatepicker from "vue-tailwind-datepicker";

//const dateValue = ref([]);

const formatter = ref({
    date: 'DD/MM/YYYY',
    month: 'MMM'
});

// le pasa en auto la fecha del calendario
const disableDate = (date) => {
  const today = new Date();
  return date < today || date.getMonth() > today.getMonth() + 1 || [0, 6].includes( date.getDay() )
}


</script>

<template>
  <vue-tailwind-datepicker 
    i18n="es-mx"  
    as-single 
    no-input
    :formatter="formatter"
    :disable-date="disableDate"
  />
</template>