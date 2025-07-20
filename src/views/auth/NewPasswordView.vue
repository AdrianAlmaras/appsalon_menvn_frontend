<script setup>
import { onMounted, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AuthAPI from '@/api/AuthAPI';
import { reset } from '@formkit/core'

const route = useRoute();
const router = useRouter()
const { token } = route.params;
const toast = inject('toast');
//console.log(route.params.token);

const validToken = ref(false);
// validar token
onMounted( async () => {
    try {
        const { data } = await AuthAPI.verifyPasswordResetToken(token);
        //console.log(data);
        if(data) {
            validToken.value = true
        }
    } catch (error) {
        //console.log(error);
        validToken.value = false
        toast.open({
            message: error.response.data.msg,
            type: 'error'
        })
    }
})
// actualizar token
const handleSubmit = async ({password}) => {
    console.log(password);
    try {
        const { data } = await AuthAPI.updatePassword(token, {password});
        console.log(data);
        reset('newPasswordForm')
        toast.open({
            message: data.msg,
            type: 'success'
        })
        setTimeout(() => {
            router.push({name: 'login'})
        }, 2000);
       
    } catch (error) {
        console.log(error);
        if (error.response) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            })

        }
    }
}

</script>

<template>
    <div v-if="validToken">
        <h1 class="text-5xl font-bold text-white text-center mt-10">Nuevo password</h1>
        <p class="text-2xl text-white text-center my-5">Coloca tu nuevo password</p>

        <FormKit
            id="newPasswordForm"
            type="form"
            :actions="false"
            incomplete-message="No se pudo enviar, revisa las notificaciones"
            @submit="handleSubmit"
        >
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

            <FormKit type="submit">Guardar Password</FormKit>
        </FormKit>
    </div>

    <p v-else class="text-center text-2xl font-black text-white">Token no válido</p>
</template>

