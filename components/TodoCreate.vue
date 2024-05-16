<template>
    <div>
        <v-btn color="primary" @click="createDialog = true">
            <v-icon>mdi-plus</v-icon>&nbsp;Add Todo
        </v-btn>
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

const store = useStore()

const createDialog = ref(false)

const emit = defineEmits(['fetchAgain'])

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

const config = useRuntimeConfig()

const snackbar = useSnackbar()

const baseUrl = config.public.baseUrl

const handleCreateSubmit = async () => {
    console.log('create todo', createState.c_title, createState.c_description)
    createv$.value.$touch()
    console.log('create todo', createv$.value.$errors)
    if (createv$.value.$invalid) {
        console.log('invalid')
        return
    }
    console.log('create todo', createState.c_title, createState.c_description)

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
            if (res.error?.value !== null && res.error?.value !== undefined) {
                if (res.error.value.statusCode === 401) {
                    store.logout()
                    snackbar.add({
                        type: 'error',
                        text: 'Unauthorized'
                    })
                }
            }
            snackbar.add({
                type: 'success',
                text: 'Todo created successfully'
            })
            createDialog.value = false
            emit('fetchAgain')
        })
        .catch(err => {
            console.log('todo update error', err)
        })
}
</script>

<style scoped></style>