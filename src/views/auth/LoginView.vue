<script setup>
import AuthAPI from '@/api/AuthAPI';
import { inject } from 'vue';
import { useRouter } from 'vue-router';

const toast = inject('toast');
const router = useRouter(); 

const handleSubmit = async (formData) => {
    try {
        const { data: { token } } = await AuthAPI.login(formData);
        // guardamos en local storage
        localStorage.setItem('AUTH_TOKEN', token);
        
        // redirigimos al usuario a las citas
        router.push( {'name': 'my-appointments'} )

        //console.log( token );
        // toast.open({
        //     message: data.msg,
        //     type: 'success'
        // });
    } catch (error) {
        console.log(error)
        if(error.response) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            });
        }
    }
}
</script>

<template>
    <h1 class="text-5xl font-bold text-white text-center mt-10">Iniciar Sesión</h1>
    <p class="text-2xl text-white text-center my-5">Si tienes una cuenta, inicia sesión</p>

    <FormKit
        id="loginForm"
        type="form"
        :actions="false"
        incomplete-message="No se pudo enviar, revisa las notificaciones"
        @submit="handleSubmit"
    >
        <FormKit
            type="email"
            label="Email"
            name="email"
            placeholder="Email de Usuario"
            validation="required|email"
            :validation-messages="{
                required: 'El email es obligatorio',
                email: 'Email no válido'
            }"
        />

        <FormKit
            type="password"
            label="Password"
            name="password"
            placeholder="Password de Usuario"
            validation="required"
            :validation-messages="{
                required: 'El password es obligatorio',
                length: 'El password debe contener al menos 8 caracteres'
            }"
        />
        

        <FormKit
            type="submit"
        >Iniciar Sesión</FormKit>
        
    </FormKit>
</template>
