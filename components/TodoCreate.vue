<template>
    <div>
        <!-- button that opens the create dialog -->
        <v-btn color="primary" @click="createDialog = true">
            <v-icon>mdi-plus</v-icon>&nbsp;Add Todo
        </v-btn>
        <!-- dialog form for creating todo -->
        <v-dialog v-model="createDialog" width="400px">
            <form @submit.prevent="handleCreateSubmit">
                <v-card max-width="400">
                    <div class="pa-4">
                        <v-text-field v-model="createState.c_title" label="Title"
                            :error-messages="createv$.c_title.$errors.map(e => e.$message)"
                            @blur="createv$.c_title.$touch" @input="createv$.c_title.$touch"></v-text-field>
                        <v-textarea v-model="createState.c_description" label="Description"
                            :error-messages="createv$.c_description.$errors.map(e => e.$message)"
                            @blur="createv$.c_description.$touch" @input="createv$.c_description.$touch"></v-textarea>
                    </div>
                    <template v-slot:actions>
                        <v-btn text @click="createDialog = false">
                            <v-icon color="red">mdi-close</v-icon>&nbsp;Cancel
                        </v-btn>
                        <v-btn text type="submit">
                            <v-icon color="blue">mdi-check</v-icon>&nbsp;Save
                        </v-btn>
                    </template>
                </v-card>
            </form>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive } from 'vue';
import { TOKEN_KEY } from '~/store/constants';
import { useStore } from '~/store';

// emits
const emit = defineEmits(['fetchAgain'])

// dialog state
const createDialog = ref(false)

const store = useStore()
const config = useRuntimeConfig()
const snackbar = useSnackbar()
const baseUrl = config.public.baseUrl


const initialcreateState = {
    c_title: '',
    c_description: '',
}

const createState = reactive({
    ...initialcreateState,
})

const createRules = {
    c_title: { required },
    c_description: { required }
}

const createv$ = useVuelidate(createRules, createState)

const handleCreateSubmit = async () => {
    // check if form is invalid
    createv$.value.$touch()
    if (createv$.value.$invalid) {
        console.log('invalid')
        return
    }

    // create todo fetch api call
    await $fetch(`${baseUrl}/api/manage-todo`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_KEY)
            },
            body: {
                title: createState.c_title,
                description: createState.c_description
            }
        }
    )
        .then(res => {
            // error handling for unauthorized request
            if (res.error?.value !== null && res.error?.value !== undefined) {
                if (res.error.value.statusCode === 401) {
                    store.logout()
                    snackbar.add({
                        type: 'error',
                        text: 'Unauthorized'
                    })
                }
            }
            // success message
            snackbar.add({
                type: 'success',
                text: 'Todo created successfully'
            })
            // reset form state
            createState.c_title = ''
            createState.c_description = ''
            createDialog.value = false
            emit('fetchAgain')
        })
        .catch(err => {
            // error message handling to do
            console.log('todo update error', err)
        })
}
</script>

<style scoped></style>