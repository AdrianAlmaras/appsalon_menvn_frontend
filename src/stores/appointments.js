import { ref, computed, onMounted, inject, watch } from 'vue'; // al momento que se cargue el store se carguen los servicios
import {  defineStore  } from 'pinia';
import { useRouter } from 'vue-router';
import {useUserStore} from '@/stores/user'

import AppointmentAPI from '@/api/AppointmentAPI';
import { convertToISO, convertToDDMMYYYY } from '@/helpers/date';

export const useAppointmentsStore = defineStore('appointments', () => {
    
    // bandera para saber si estamos editando
    const appointmentId = ref('');

    const services = ref([]); // guardamos nuestros servicios
    const date = ref('');  // guardamos la fecha de la cita
    const hours = ref([]);
    const time = ref(''); // guardamos la hora de la cita
    const appointmentsByDate = ref([]);

    const router = useRouter();
    const toast = inject('toast');

    const userStore = useUserStore();

    onMounted(() => {
        const startHour = 10;
        const endHour = 19;

        for(let hour = startHour;  hour <= endHour; hour++) {
            //console.log(  hour + ':00' )
            hours.value.push( hour + ':00' )
        }
    });

    watch(date, async () => {
        // como tambien se ejecuta al crear una cita, reiniciamos los valores se ejecuta
        // prevenimos si se hace una cita
        time.value = '';
        if ( date.value === '') return

        // deshabilitar fecha si hay citas pendientes
        // Obtenemos lass citas por fecha
        const { data } = await AppointmentAPI.getByDate(date.value)
        //console.log( data )
        
        // validacion para editar la cita 
        if(appointmentId.value) {
            //console.log('edicion');
            // habilitamos la hora
            appointmentsByDate.value = data.filter( appointment => appointment._id !== appointmentId.value );
            // seleccionamos la hora por default al editar
            time.value = data.filter( appointment => appointment._id === appointmentId.value )[0].time;
            //console.log(time.value);
        } else {
            //console.log('registro nuevo');
            appointmentsByDate.value = data;
        }

    })

    function setSelectedAppointment(appointment) {
        //console.log(appointment);

        services.value = appointment.services; 
        date.value = convertToDDMMYYYY(appointment.date); // 18/07/2025
        // const newDate = convertToDDMMYYYY(appointment.date);  
        // console.log(newDate);
        time.value = appointment.time;
        appointmentId.value = appointment._id;
    }

    function onServiceSelected(service) {
        //console.log(service);
        if ( services.value.some( selectedService =>  selectedService._id === service._id ) ) {
            //console.log('ya esta en la cita')
            services.value = services.value.filter( selectedService =>  selectedService._id !== service._id )
        } else {
            
            if (services.value.length === 2) {
                alert('Máximo 2 servicios por cita');
                return
            } 
            
            services.value.push(service);     
            
            //console.log('no esta en la cita')
           
        }
    };
    // guardar cita - mandamos la data para insert o editar la cita
    async function saveAppointment() {
        //console.log('crear appointment');
        const appointment = {
            services: services.value.map( service => service._id ),
            date: convertToISO(date.value),
            time: time.value,
            totalAmount: totalAmount.value
        }

        // console.log(appointmentId.value);
        // return
        // guardar servicio 
        
        if(appointmentId.value) {
            try {

                const {data} = await AppointmentAPI.updateAppointment(appointmentId.value, appointment);
                //console.log(data);
                toast.open({
                    message: data.msg,
                    type: 'success'
                });

           
            } catch (error) {
                console.log(error);
            }            
        } else {
            try {

                const {data} = await AppointmentAPI.create(appointment);
                //console.log(data);
                toast.open({
                    message: data.msg,
                    type: 'success'
                });

                //await userStore.getUserAppointments()
                //router.push({name: 'my-appointments'})
                // setTimeout(() => {
                //     router.push({name: 'my-appointments'});
                //     clearAppointmentData();
                // }, 800);
           
            } catch (error) {
                console.log(error);
            }            
        }

        clearAppointmentData();
        await userStore.getUserAppointments();
        router.push({name: 'my-appointments'});
    }

    // limpiar el state que se usa para mostrar la info de la cita
    function clearAppointmentData() {
        services.value = []; // guardamos nuestros servicios
        date.value = '';  // guardamos la fecha de la cita
        time.value = ''; // guardamos la hora de la cita
        // limpiar nuestros state para saber si se esta actualizando o no
        appointmentId.value = ''
    }

    // eliminar cita
    async function cancelAppointment( id ) {
        try {
            if( confirm('¿Deseas cancelar esta cita?') ) {
                const { data } = await AppointmentAPI.deleteAppointment(id);
                toast.open({
                    message: data.msg,
                    type: 'success'
                })

                await userStore.getUserAppointments();
                // alternativa
                //userStore.userAppointments = userStore.userAppointments.filter( appointment => appointment._id !== id )
            }

        } catch (error) {
            console.log(error);
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })
        }
    }

    const isServiceSelected = computed(() => {
        return (id) => services.value.some( service => service._id === id )
    });

    const noServicesSelected = computed(() => services.value.length === 0 );

    const totalAmount = computed(() => {
        return services.value.reduce((total, service) => total + service.price, 0)
    })

    const isValidReservation = computed(() => {
        return services.value.length && date.value.length && time.value.length
    });

    const isDateSelected = computed(() => {
        return date.value ? true : false
    });

    const disableTime = computed(() => {
        return (hour) => {
            return appointmentsByDate.value.find( appointment => appointment.time === hour )
        }
    });

    return {
        onServiceSelected,
        isServiceSelected,
        services,
        date,
        hours,
        time,
        totalAmount,
        noServicesSelected,
        isValidReservation,
        saveAppointment,
        isDateSelected,
        disableTime,
        setSelectedAppointment,
        clearAppointmentData,
        cancelAppointment
    }
})

