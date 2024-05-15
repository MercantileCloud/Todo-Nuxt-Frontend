<template>
    <form @submit.prevent="handleSubmit">
        <!-- <v-img class="mx-auto my-6" max-width="228"
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img> -->
        <div class="mt-12 pt-12">
            <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
                <div class="text-subtitle-1 text-medium-emphasis">Account</div>

                <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
                    variant="outlined" v-model="state.email" :error-messages="v$.email.$errors.map(e => e.$message)"
                    @blur="v$.email.$touch" @input="v$.email.$touch"></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Password

                    <!-- <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer"
                    target="_blank">
                    Forgot login password?</a> -->
                </div>

                <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
                    prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
                    v-model="state.password" :error-messages="v$.password.$errors.map(e => e.$message)"
                    @blur="v$.password.$touch" @input="v$.password.$touch"></v-text-field>

                <!-- disable when form is being submitted -->
                <v-btn class="mb-8" color="blue" size="large" variant="tonal" block type="submit" :loading="loading"
                    :disabled="loading">
                    Log In
                </v-btn>
            </v-card>
        </div>
    </form>
</template>

<script setup>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators'
import axios from 'axios'
import { useStore } from "~/store"
// make layout none
definePageMeta({
    layout: 'empty',
    title: 'Login',
    description: 'This is a login page'
})

import { ref } from 'vue';

const visible = ref(false);

const loading = ref(false)

const device = useDevice()

const initialState = {
    email: '',
    password: '',
    device: device.userAgent,
}

const state = reactive({
    ...initialState,
})

const rules = {
    email: { required, email },
    password: { required, minLength: minLength(5) },
}

const v$ = useVuelidate(rules, state)

const userstore = useStore()
const router = useRouter()

const config = useRuntimeConfig()

const baseUrl = config.public.baseUrl

const handleSubmit = () => {
    loading.value = true
    if (v$.value.$invalid) {
        // touch
        v$.value.$touch()
        loading.value = false
        return
    }

    // login request
    axios.post(`${baseUrl}/api/auth/login`, state)
        .then(res => {
            console.log('login success', res)
            userstore.login(res.data)
            loading.value = false
            router.push({ name: 'index' })
        })
        .catch(err => {
            console.log('login error', err)
            loading.value = false
        })
}

</script>

<style scoped></style>