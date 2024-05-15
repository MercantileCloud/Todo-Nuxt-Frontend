<template>
    <div>
        <!-- <h2 class="pb-5">Todo list</h2> -->
        <!-- flex with title and btn -->
        <div class="d-flex justify-content-between align-items-center">
            <div class="pb-5 me-auto">
                <h2>Todo</h2>
            </div>
            <div>
                <TodoCreate @fetch-again="fetchData()" />
            </div>
        </div>
        <div v-for="p in todos" v-bind:key="p.id" class="todo-item">
            <TodoCard :todo="p" @fetch-again="fetchData()" />
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { TOKEN_KEY } from '~/store/constants';

import { ref } from 'vue';

import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive } from 'vue';

definePageMeta({
    layout: 'default',
    title: 'Todo list',
    description: 'This is a todo list page'
})

// initialize page and paginate
const page = ref(1)
const paginate = ref(10)
const lastpage = ref(1)

const config = useRuntimeConfig()

const baseUrl = config.public.baseUrl


const todos = ref(null)

console.log('baseUrl', baseUrl);
// make a function to fetch data
const fetchData = async (setTodo = true, page = 1, paginate = 10) => {
    await useFetch(`${baseUrl}/api/manage-todo`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_KEY)
        },
        params: {
            paginate: paginate,
            page: page,
            search: ''
        }
    }).then((data) => {
        if (setTodo) {
            todos.value = data.data.value.data.data
            lastpage.value = data.data.value.data.last_page
        } else {
            console.log('todos', todos.value)
            todos.value = [...todos.value, ...data.data.value.data.data]
        }
    })
}

// fetch data

// fetchData(false, page, paginate).then((data) => {
//     console.log('data', data.data)
//     todos.value = data.data.data
//     lastpage.value = data.data.last_page
// })
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

// onscroll event to load more data

window.onscroll = function (ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (page.value < lastpage.value) {
            page.value = page.value + 1
            fetchData(false, page, paginate)
        }
    }
};

</script>

<style lang="scss" scoped></style>