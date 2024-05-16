<!-- main dashboard template starts -->
<template>
    <!--  -->
    <v-app>
        <!-- <v-card> -->
        <!-- <v-layout> -->
        <v-app-bar color="primary" app dense fixed>
            <!-- drawer for sidebar -->
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>Todo App</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-avatar>
                <v-img alt="John"
                    :src="'https://ui-avatars.com/api/?name=' + user.name + '&background=fff&color=000'"></v-img>
            </v-avatar>
            <!-- profile menu with logout -->
            <v-btn variant="text" icon="mdi-dots-vertical">
                <v-icon>mdi-dots-vertical</v-icon>
                <v-menu activator="parent">
                    <v-list style="width: 200px;">
                        <v-list-item class="pb-3">
                            <v-list-item-title>
                                <v-avatar>
                                    <v-img alt="John"
                                        :src="'https://ui-avatars.com/api/?name=' + user.name + '&background=random&color=fff'">
                                    </v-img>
                                </v-avatar>
                                {{ user.name }}
                            </v-list-item-title>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item v-for="(item, index) in profileMenu" :key="index" :value="index"
                            @click="item.function">
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-btn>
        </v-app-bar>

        <!-- navigation drawer or side bar -->
        <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" permanent app>
            <v-divider></v-divider>
            <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" :value="index" :to="item.value"
                    :prepend-icon="item.icon">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!-- main content -->
        <v-main>
            <v-container fluid>
                <div style="padding: 30px">
                    <slot></slot>
                </div>
            </v-container>
        </v-main>
        <!-- </v-layout> -->
        <!-- </v-card> -->
    </v-app>
    <NuxtSnackbar />
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { TOKEN_KEY } from '~/store/constants';
import { useStore } from '~/store';

const drawer = ref(true);
const group = ref(null);
const items = [
    { title: 'Home', value: '/', icon: 'mdi-home' },
    { title: 'Todo', value: '/todo', icon: 'mdi-format-list-checks' }
];

const router = useRouter();
const userstore = useStore();
const config = useRuntimeConfig()
const snackbar = useSnackbar();

const baseUrl = config.public.baseUrl
// get user from store
const user = userstore.$state.user;

const handleLogout = async () => {
    console.log('logout');
    // localStorage.removeItem('token');
    await useFetch(`${baseUrl}/api/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_KEY)
        },
    }).then((data) => {
        // error handling
        if (data.error?.value !== null && data.error?.value !== undefined) {
            if (data.error.value.statusCode === 401) {
                userstore.logout()
                snackbar.add({
                    type: 'error',
                    message: 'Unauthorized'
                })
            }
        }
    });
    localStorage.removeItem(TOKEN_KEY);
    userstore.logout();
    router.push('/login');
};

const profileMenu = [
    { title: 'Logout', function: handleLogout, icon: 'mdi-logout' }
];

// watch for drawer change
watch(group, () => {
    drawer.value = false;
});

</script>

<style scoped></style>