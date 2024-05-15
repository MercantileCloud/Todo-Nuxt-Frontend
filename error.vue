<template>
    <div>
        <p>{{ error.statusCode }}</p>
        <p>{{ error.message }}</p>
        <button @click="handleClearError">Go Home ...</button>
    </div>
    <!-- <v-empty-state headline="Whoops, 404" title="Page not found" text="The page you were looking for does not exist"
        image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"></v-empty-state> -->

</template>

<script setup>
defineProps(['error'])
const handleClearError = () => {
    clearError(
        {
            redirect: '/'
        }
    )
}
</script>

<style lang="scss" scoped></style>