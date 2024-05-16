<template>
    <div>
        <h2>Welcome back !!</h2>
    </div>
</template>

<script setup>

// change the title of the page, and meta tags
useHead({
    title: 'Dashboard',
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Todo Home page' },
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '~/favicon.ico' },
    ],
})
</script>

<style scoped></style>