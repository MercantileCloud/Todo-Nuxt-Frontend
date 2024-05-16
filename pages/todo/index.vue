<template>
    <div>
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
import { TOKEN_KEY } from '~/store/constants';
import { ref } from 'vue';
import { useStore } from '~/store';
import { useRouter } from 'vue-router';

definePageMeta({
    layout: 'default',
    title: 'Todo list',
    description: 'This is a todo list page'
})

// initialize page and paginate
const page = ref(1)
const paginate = ref(10)
const lastpage = ref(1)

const store = useStore()

const config = useRuntimeConfig()

const baseUrl = config.public.baseUrl

const router = useRouter()

const todos = ref(null)

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
        // handle unauthorized request
    }).then((data) => {
        if (data.error?.value !== null && data.error?.value !== undefined) {
            if (data.error.value.statusCode === 401) {
                store.logout()
                router.push('/login')
                return
            }
        }
        if (setTodo) {
            todos.value = data.data.value.data.data
            lastpage.value = data.data.value.data.last_page
        } else {
            console.log('todos', todos.value)
            todos.value = [...todos.value, ...data.data.value.data.data]
        }
    }).catch((err) => {
        console.log('err', err)
    })
}

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