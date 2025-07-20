<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const authRoutes = [
    { name: 'register', text: 'Crear una cuenta' }, 
    { name: 'login', text: 'Iniciar Sesión' },
    { name: 'forgot-password', text: 'Olvidé mi password' },
    
];

</script>

<template>
    <div class="mx-auto lg:w-3/5 mt-20">
    
        <RouterView/>

        <nav class="my-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0">
            
            <RouterLink 
                class="uppercase font-bold text-white"
                v-for="authRoute in authRoutes"
                :key="authRoute.name"
                :to="{name: authRoute.name}"
                :class="{'hidden': route.name === authRoute.name}"
            >{{ authRoute.text }}</RouterLink>
            
        </nav>
    </div>

</template>


