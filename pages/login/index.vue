<template>
    <!-- login form start -->
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

                <!-- disable and loading when form is being submitted -->
                <v-btn class="mb-8" color="primary" size="large" block type="submit" :loading="loading"
                    :disabled="loading">
                    Log In
                </v-btn>
            </v-card>
        </div>
    </form>
    <!-- login form end -->
</template>

<script setup>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import { useStore } from "~/store"
import { useRouter } from 'vue-router'
import { useOs } from '~/composables/useOs'
import { ref } from 'vue';

// make layout none
definePageMeta({
    layout: 'empty',
    title: 'Login',
    description: 'This is a login page'
})

// visible used for password visibility toggle
const visible = ref(false);
// loading state
const loading = ref(false)
// auth error state thrown
const authError = ref('')

const device = useOs()
const userstore = useStore()
const router = useRouter()
const snackbar = useSnackbar()
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

snackbar.clear()

// initial state
const initialState = {
    email: '',
    password: '',
    device: device,
}

const state = reactive({
    ...initialState,
})

const rules = {
    email: { required, email },
    password: { required, minLength: minLength(5) },
}

const v$ = useVuelidate(rules, state)

const handleSubmit = async () => {
    // set loading to true
    loading.value = true

    // check if form is invalid
    if (v$.value.$invalid) {
        v$.value.$touch()
        loading.value = false
        return
    }

    // fetch login api
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
        // set user details and token to store
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