<template>
    <div>
        <v-card :title="todo.title" :text="todo.description" @click="dialog = true" class="my-2"></v-card>
    </div>
    <v-dialog v-model="dialog" width="400px">
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
                <v-btn text @click="handleEditSubmit">
                    <v-icon color="blue">mdi-check</v-icon>&nbsp;Save
                </v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { TOKEN_KEY } from '~/store/constants'

const { todo } = defineProps(['todo'])

// emits
const emit = defineEmits(['fetchAgain'])

// fetchData is a function
// const { fetchData } = defineProps(['fetchData'])

const dialog = ref(false)
const editmode = ref(false)
const loading = ref(false)

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

const handleEditMode = (todos) => {
    editmode.value = true
    state.title = todos.title
    state.description = todos.description
}

const handleEditSubmit = async () => {
    loading.value = true
    v$.value.$touch()
    if (v$.value.$invalid) {
        loading.value = false
        return
    }

    await $fetch(`http://127.0.0.1:8000/api/manage-todo/${todo.id}`,
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
            console.log('todo update success', res)
            loading.value = false
            dialog.value = false
            editmode.value = false
            todo.title = state.title
            todo.description = state.description
        })
        .catch(err => {
            console.log('todo update error', err)
            loading.value = false
        })
}

const handleDeleteSubmit = async () => {
    loading.value = true
    await $fetch(`http://127.0.0.1:8000/api/manage-todo/${todo.id}`,
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
            console.log('todo delete success', res)
            loading.value = false
            dialog.value = false
            getTodos()
        })
        .catch(err => {
            console.log('todo delete error', err)
            loading.value = false
        })



}

const getTodos = async () => {
    console.log("I am gere")
    emit('fetchAgain')
}


</script>

<style scoped></style>