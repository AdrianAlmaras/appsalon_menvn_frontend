<script setup>
import { onMounted, inject } from 'vue';
import AuthAPI from '@/api/AuthAPI';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { token } = route.params;
const toast = inject('toast');


onMounted(async () =>  {
    try {
       const {data} = await AuthAPI.verifyAccount(token);
       //console.log(data);
        toast.open({
            message: data.msg,
            type: 'success'
        });

        setTimeout(() => {
            router.push({name: 'login'})
        }, 3500)

    } catch (error) {
        console.log(error);
         if(error.response) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            });
        }
    }
});

</script>

<template>
    <div>
        <h1 class="text-5xl font-bold text-white text-center mt-10">Verificar Cuenta</h1>
        
    </div>
</template>

