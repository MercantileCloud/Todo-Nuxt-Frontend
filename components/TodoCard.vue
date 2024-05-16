<template>
    <div>
        <!-- todo card, when clicked opens dialog with details -->
        <v-card :title="todo.title" :text="todo.description" @click="dialog = true" class="my-2"></v-card>
    </div>
    <v-dialog v-model="dialog" width="400px">
        <!-- todo view dialog -->
        <v-card max-width="400" prepend-icon="mdi-update" :text="todo.description" :title="todo.title" v-if="!editmode">
            <template v-slot:actions>
                <v-btn text @click="handleEditMode(todo)">
                    <v-icon color="blue">mdi-pencil</v-icon>&nbsp;Edit
                </v-btn>
                <v-btn text @click="handleDeleteSubmit">
                    <v-icon color="red">mdi-delete</v-icon>&nbsp;Delete
                </v-btn>
                <v-btn class="ms-auto" text="Close" @click="dialog = false" color="primary" variant="flat"></v-btn>
            </template>
        </v-card>
        <!-- todo edit dialog form -->
        <form @submit.prevent="handleEditSubmit">
            <v-card v-if="editmode" max-width="400">
                <div class="pa-4">
                    <v-text-field v-model="state.title" label="Title" width="350"
                        :error-messages="v$.title.$errors.map(e => e.$message)" @blur="v$.title.$touch"
                        @input="v$.title.$touch"></v-text-field>
                    <v-textarea v-model="state.description" label="Description"
                        :error-messages="v$.description.$errors.map(e => e.$message)" @blur="v$.description.$touch"
                        @input="v$.description.$touch"></v-textarea>
                </div>
                <template v-slot:actions>
                    <v-btn text @click="editmode = false">
                        <v-icon color="red">mdi-close</v-icon>&nbsp;Cancel
                    </v-btn>
                    <v-btn text type="submit">
                        <v-icon color="blue">mdi-check</v-icon>&nbsp;Save
                    </v-btn>
                </template>
            </v-card>
        </form>
    </v-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { TOKEN_KEY } from '~/store/constants'
import { useStore } from '~/store'

const { todo } = defineProps(['todo'])

// emits
const emit = defineEmits(['fetchAgain'])

const dialog = ref(false)
const editmode = ref(false)
const loading = ref(false)

const config = useRuntimeConfig()
const snackbar = useSnackbar();
const store = useStore()

const baseUrl = config.public.baseUrl

const initialState = {
    title: '',
    description: '',
}

const state = reactive({
    ...initialState,
})

const rules = {
    title: { required },
    description: { required },
}

const v$ = useVuelidate(rules, state)

// fetch todos by emitting
const getTodos = async () => {
    emit('fetchAgain')
}

// edit mode handler
const handleEditMode = (todos) => {
    editmode.value = true
    state.title = todos.title
    state.description = todos.description
}

// edit submit handler
const handleEditSubmit = async () => {
    // check if form is invalid
    loading.value = true
    v$.value.$touch()
    if (v$.value.$invalid) {
        loading.value = false
        return
    }

    // update todo fetch api call for edit
    await $fetch(`${baseUrl}/api/manage-todo/${todo.id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_KEY)
            },
            body: {
                title: state.title,
                description: state.description
            }
        }
    )
        .then(res => {
            // error handling
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
                text: 'Todo updated successfully'
            })

            // reset form state
            loading.value = false
            dialog.value = false
            editmode.value = false
            todo.title = state.title
            todo.description = state.description
        })
        .catch(err => {

            // error handling
            loading.value = false
            snackbar.add({
                type: 'error',
                text: 'Todo update failed'
            })
        })
}

const handleDeleteSubmit = async () => {
    // delete todo fetch api call
    loading.value = true
    await $fetch(`${baseUrl}/api/manage-todo/${todo.id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_KEY)
            }
        }
    )
        .then(res => {
            // error handling
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
                text: 'Todo deleted successfully'
            })
            loading.value = false
            dialog.value = false

            // emit fetch again
            getTodos()
        })
        .catch(err => {
            // error handling
            loading.value = false
            snackbar.add({
                type: 'error',
                text: 'Todo delete failed'
            })
        })
}

</script>

<style scoped></style>