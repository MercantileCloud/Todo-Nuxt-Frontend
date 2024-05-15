<template>
    <div>
        <h1>Home</h1>
    </div>
</template>

<script setup>
// const { data } = await useFetch("/api/check?name=Nuxt", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: {
//         age: 30,
//     },
// });

useHead({
    title: 'Home Page',
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Todo Home page' },
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
})
</script>

<style scoped></style>