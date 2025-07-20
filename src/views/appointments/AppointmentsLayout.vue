<script setup>
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

</script>

<template>
    <!-- header -->
    <div class="flex justify-between">
        <h1 class="text-2xl lg:text-5xl font-black text-white">App Salón</h1>

        <div class="flex flex-col space-y-7">
            <div class="flex gap-3 items-center">
                <p class="text-white text-right">Hola: {{ userStore.getUserName }}</p>

                <button 
                    type="button"
                    class="bg-red-600 hover:bg-red-700 p-3 text-white uppercase text-xs font-black rounded-lg"
                    @click="userStore.logout"
                >
                    Cerrar Sesión
                </button>
            </div>

            <nav class="flex gap-2 items-center justify-end">
                <RouterLink
                    :to="{name: 'my-appointments'}"
                    class="p-3 text-gray-200 uppercase text-xs font-black rounded-lg"
                >
                    Mis Citas
                </RouterLink>

                <RouterLink
                    :to="{name:'new-appointment'}"
                    class="p-3 text-gray-200 uppercase text-xs font-black rounded-lg bg-blue-600"
                >
                    Nueva Cita
                </RouterLink>
            </nav>
        </div>
    </div>

    <main>
        <RouterView />
    </main>
</template>

