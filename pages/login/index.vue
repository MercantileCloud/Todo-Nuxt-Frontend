<template>
    <form @submit.prevent="handleSubmit">
        <div class="mt-12 pt-12">

            <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">

                <p class="text-h6 text-error" v-if="authError">{{ authError }}</p>
                <div class="text-subtitle-1 text-medium-emphasis">Account</div>

                <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
                    variant="outlined" v-model="state.email" :error-messages="v$.email.$errors.map(e => e.$message)"
                    @blur="v$.email.$touch" @input="v$.email.$touch"></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Password
                </div>

                <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
                    prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
                    v-model="state.password" :error-messages="v$.password.$errors.map(e => e.$message)"
                    @blur="v$.password.$touch" @input="v$.password.$touch"></v-text-field>

                <!-- disable when form is being submitted -->
                <v-btn class="mb-8" color="primary" size="large" block type="submit" :loading="loading"
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

const authError = ref('')

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

const snackbar = useSnackbar()

const config = useRuntimeConfig()

const baseUrl = config.public.baseUrl
snackbar.clear()
const handleSubmit = async () => {
    loading.value = true
    if (v$.value.$invalid) {
        v$.value.$touch()
        loading.value = false
        return
    }

    await $fetch(`${baseUrl}/api/auth/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(state)
        }
    ).then(res => {
        userstore.login(res)
        loading.value = false
        router.push({ name: 'index' })
    })
        .catch(err => {
            authError.value = 'Invalid email or password'
            loading.value = false
        })
}

</script>

<style scoped></style>