import { defineStore } from 'pinia'
import { TOKEN_KEY, USER_DETAILS } from '../store/constants'
import axios from 'axios'

const loggedin = localStorage.getItem(TOKEN_KEY) ? true : false
const user = localStorage.getItem(USER_DETAILS) ? JSON.parse(localStorage.getItem(USER_DETAILS) as string) : null
export const useStore = defineStore('user', {
    state: () => ({
        user: user,
        isLoggedIn: loggedin,
    }),

    getters: {
        isLoggedInUser: state => state.isLoggedIn,
        userDetails: state => state.user,
    },

    actions: {
        async login(data: any ) {
            console.log(data)
            // const { data } = await axios.post(process.env.BASE_URL+'/login', { email, password })
            localStorage.setItem(TOKEN_KEY, data.user.token)
            localStorage.setItem(USER_DETAILS, JSON.stringify(data.user))
            // change state
            this.isLoggedIn = true
            this.user = data.user
        },

        setData({ commit }:any, data:any) {
            localStorage.setItem(TOKEN_KEY, data.token)
            localStorage.setItem(USER_DETAILS, JSON.stringify(data.user))
            commit('setData', data)
        },

        async logout() {
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem(USER_DETAILS)
            this.isLoggedIn = false
            this.user = null
        }
    },
})
