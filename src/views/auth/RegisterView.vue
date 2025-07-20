<script setup>
import { inject } from 'vue';
import { reset } from '@formkit/vue';
import AuthAPI from '@/api/AuthAPI';

const toast = inject('toast');
// toast.open({
//     message: 'Probando Toast',
//     type: 'success'
// })


const handleSubmit = async ( {password_confirm, ...formData} ) => {
    //console.log(data);
    try {

        const {data} = await AuthAPI.register(formData);
        //console.log(data.msg);
        toast.open({
            message: data.msg,
            type: 'success'
        });
        // importamos la funcion de reset para resetear el formulario, se le pasa el nombre de nuestro form
        reset('registerForm')

    } catch (error) {
        console.log(error);
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
    
    <h1 class="text-5xl font-bold text-white text-center mt-10">Crea una cuenta</h1>
    <p class="text-2xl text-white text-center my-5">Crea una cuenta en AppSalón</p>

    <FormKit
        id="registerForm"
        type="form"
        :actions="false"
        incomplete-message="No se pudo enviar, revisa las notificaciones"
        @submit="handleSubmit"
    >
        <FormKit
            type="text"
            label="Nombre"
            name="name"
            placeholder="Tu nombre"
            validation="required|length:3"
            :validation-messages="{
                required: 'El nombre es obligatorio',
                length: 'El nombre es muy corto'
            }"
        />

        <FormKit
            type="email"
            label="Email"
            name="email"
            placeholder="Email de Registro"
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
            placeholder="Password de Usuario - Min 8 Caracteres"
            validation="required|length:8"
            :validation-messages="{
                required: 'El password es obligatorio',
                length: 'El password debe contener al menos 8 caracteres'
            }"
        />
        
        <!--  regla de validacion de confirm en el name se escribe primero el name del campo q va acomparar y segundo_confirm  -->
        <!--  con confirm validas que sean iguales  -->
        <FormKit
            type="password"
            label="Repetir Password"
            name="password_confirm"
            placeholder="Repite el password"
            validation="required|confirm"
            :validation-messages="{
                required: 'El password es obligatorio',
                confirm: 'Los passwords no son iguales'
            }"
        />
        

        <FormKit
            type="submit"
        >Crear Cuenta</FormKit>
        
    </FormKit>
</template>


