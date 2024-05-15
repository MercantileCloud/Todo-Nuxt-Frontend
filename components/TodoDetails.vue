<template>
    <div>
        <p>Todo</p>
        <p>id: {{ todo.id }}</p>
        <p>Product: {{ todo.title }}</p>
        <p>Price: {{ todo.price }}</p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure aut pariatur quas, labore quasi corrupti et nostrum cupiditate recusandae expedita?
        <div>
            <NuxtLink to="/todo">Back to Todo</NuxtLink>
        </div>
    </div>
</template>

<script setup>
    const { todo } = defineProps(['todo'])
</script>

<style scoped>

</style>