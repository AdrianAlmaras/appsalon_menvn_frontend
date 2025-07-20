import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AppointmentsLayout from '@/views/appointments/AppointmentsLayout.vue';
import AuthAPI from '@/api/AuthAPI';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
     {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'admin-appointments',
          component: () => import('../views/admin/AppointmentsView.vue'),
        }
      ]
    },
    {
      path: '/reservaciones',
      name: 'appointments',
      component: AppointmentsLayout,
      meta: { requiresAuth: true }, //guard de navegacion (el usuario tiene que estar autenticado para ingresar a estas páginas)
      children: [
        {
          path: '',
          name: 'my-appointments',
          component: () => import('../views/appointments/MyAppointmentsView.vue'),
        },
        {
          path: 'nueva',
          component: () => import('../views/appointments/NewAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'new-appointment',
              component: () => import('../views/appointments/ServicesView.vue'),
            },
            {
              path: 'detalles',
              name: 'appointment-details',
              component: () => import('../views/appointments/AppointmentView.vue'),
            }
          ]
        },
        {
          path: ':id/editar',
          component: () => import('../views/appointments/EditAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'edit-appointment',
              component: () => import('../views/appointments/ServicesView.vue'),
            },
            {
              path: 'detalles',
              name: 'edit-appointment-details',
              component: () => import('../views/appointments/AppointmentView.vue'),
            }
          ]
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'registro',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue'),
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: () => import('../views/auth/ConfirmAccountView.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
        },
        {
          path: 'olvide-password',
          name: 'forgot-password',
          component: () => import('../views/auth/ForgotPasswordView.vue'),
        },
        {
          path: 'olvide-password/:token',
          name: 'new-password',
          component: () => import('../views/auth/NewPasswordView.vue'),
        }
      
      ]
    }
  ],
})

/*
 guard global de navegación que sirve para interceptar y controlar la navegación entre rutas antes de que ocurra el cambio de página.

 ¿Para qué se usa router.beforeEach?
Principalmente para:

Proteger rutas que requieren autenticación.

Redirigir usuarios no autorizados a login o error.

Realizar validaciones antes de cambiar de ruta.

Mostrar loaders mientras se navega.

Registrar navegación (logging/analytics).
*/

router.beforeEach( async (to, from, next) => {
  // `to`   → ruta a la que se quiere ir
  // `from` → ruta desde la que se viene
  // `next` → función que decide si se permite o no la navegación

  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if(requiresAuth) {
    try {
      const {data} = await AuthAPI.auth()
      //console.log(data.admin);
      // identificando que tipo de usuario incia sesion para llevarlo a su panel
      if(data.admin) {
        next({name: 'admin'}) // redireccionar si el usuario es admin
      } else {
        next() // ejecutar el sig middleware
      }
      //return
     
    } catch (error) {
      next({name: 'login'})
      // console.log(error.response.data.msg);
      // console.log(error);
    }
    
  } else {
    next()
  }  

  
} )

// previene el acceso al panel de admin
router.beforeEach( async (to, from, next) => {
  // `to`   → ruta a la que se quiere ir
  // `from` → ruta desde la que se viene
  // `next` → función que decide si se permite o no la navegación

  const requiresAdmin = to.matched.some(url => url.meta.requiresAdmin)
  if(requiresAdmin) {
    try {
      await AuthAPI.admin()
      next()
     
    } catch (error) {
      // si no es admin lo redireccionamos a admin
      next({name: 'login'})
      // eliminar token 
    }
  } else {
    next()
  }  

  
} )

export default router
