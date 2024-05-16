<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <div class="pb-5 me-auto">
                <h2>Todo</h2>
            </div>
            <div>
                <!-- todo create button and dialog form -->
                <TodoCreate @fetch-again="fetchData()" />
            </div>
        </div>

        <!-- if empty todos -->
        <div v-if="(todos === null || todos.length < 1) && !loading" class="d-flex justify-center align-center"
            style="height: 60vh">
            <div>
                <div class="d-flex justify-content-center align-items-center">
                    <v-icon size="100" color="grey lighten-1">mdi-format-list-checks</v-icon>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                    <p>No todo found</p>
                </div>
            </div>
        </div>

        <!-- when loading -->
        <div v-if="loading" class="d-flex justify-center align-center" style="height: 60vh">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>

        <!-- todo list mapping -->
        <div v-if="!loading">
            <div v-for="p in todos" v-bind:key="p.id" class="todo-item">
                <!-- todo list card -->
                <TodoCard :todo="p" @fetch-again="fetchData()" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { TOKEN_KEY } from '~/store/constants';
import { ref } from 'vue';
import { useStore } from '~/store';
import { useRouter } from 'vue-router';
import axios from 'axios';

// page meta and layout defination
definePageMeta({
    layout: 'default',
    title: 'Todo list',
    description: 'This is a todo list page'
})

// initialization for pagination
const page = ref(1)
const paginate = ref(10)
const lastpage = ref(1)

// initialize loading state
const loading = ref(false)
// initialize todos
const todos = ref(null)

// get store and runtime config
const store = useStore()
const config = useRuntimeConfig()
const router = useRouter()
// get base url
const baseUrl = config.public.baseUrl

// function to fetch data or todo list
const fetchData = async (setTodo = true, page = 1, paginate = 10) => {
    // when loading set to true
    loading.value = true

    // used fetch api to get data

    // await useFetch(`${baseUrl}/api/manage-todo`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_KEY)
    //     },
    //     params: {
    //         paginate: paginate,
    //         page: page,
    //         search: ''
    //     }
    //     // handle unauthorized request
    // }).then((data) => {
    //     if (data.error?.value !== null && data.error?.value !== undefined) {
    //         if (data.error.value.statusCode === 401) {
    //             store.logout()
    //             router.push('/login')
    //             return
    //         }
    //     }
    //     if (setTodo) {
    //         todos.value = data.data.value.data.data
    //         lastpage.value = data.data.value.data.last_page
    //     } else {
    //         console.log('todos', todos.value)
    //         todos.value = [...todos.value, ...data.data.value.data.data]
    //     }
    // }).catch((err) => {
    //     console.log('err', err)
    // })


    // used axios to get data
    await axios.get(`${baseUrl}/api/manage-todo`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_KEY)
        },
        params: {
            paginate: paginate.value,
            page: page.value,
            search: ''
        }
    }).then((response) => {
        // if setTodo is true then set todos value to response data
        if (setTodo) {
            todos.value = response.data.data.data
            lastpage.value = response.data.data.last_page
        } else {
            // if setTodo is false then append response data to todos value
            todos.value = [...todos.value, ...response.data.data.data]
        }
        loading.value = false
    }).catch((err) => {
        // if error then check if status code is 401 then logout and redirect to login page
        if (err.response.status === 401) {
            store.logout()
            router.push('/login')
            return
        }
    })
    loading.value = false
}

// fetch data on page load
fetchData(true, page, paginate)

useHead({
    title: 'Todo List',
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Todo List all' },
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
})

// fetch data on scroll to bottom
window.onscroll = function (ev) {
    if ((window.innerHeight + window.scrollY + 600) >= document.body.offsetHeight) {
        if (page.value < lastpage.value) {
            page.value = page.value + 1
            fetchData(false, page, paginate)
        }
    }
};

</script>

<style lang="scss" scoped></style>