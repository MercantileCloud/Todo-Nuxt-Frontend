// store import

import { useStore } from "~/store"

export default defineNuxtRouteMiddleware(async (to, from) => {
    // const isLoggedIn = store.getters['isLoggedIn']
    const userstore = useStore()
    const isLoggedInUser = userstore.isLoggedInUser
    // const isLoggedIn = localStorage.getItem('isLoggedIn')
    console.log(isLoggedInUser)
    console.log(to.path)
    if (!isLoggedInUser) {
        // return redirect('/login')
        if (to.path === '/login') return
        return navigateTo('/login')
    }

    if (isLoggedInUser && to.path === '/login') {
        return navigateTo('/')
    }
})