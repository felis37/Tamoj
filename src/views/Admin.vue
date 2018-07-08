<template>
    <v-app>
        <v-navigation-drawer app permanent>
            <v-list>
                <v-list-tile v-for="adminView in adminViews" :key="adminView.title" :to="adminView.path">
                    <v-list-tile-action>
                        <v-icon>{{ adminView.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ adminView.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app></v-toolbar>
        <v-content>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-content>
        <v-footer app></v-footer>
    </v-app>
</template>

<script>
    export default {
        name: 'admin',
        data() {
            return {
                user: {
                    displayName: '',
                    email: ''
                },
                adminViews: [
                    { title: 'Min profil', path: '/profile', icon: 'x'},
                    { title: 'Närvaro', path: '/admin/attendance', icon: 'x' },
                    { title: 'Kalender', path: '/admin/calendar', icon: 'x'}
                    //Add more here
                ]
            }
        },
        methods: {

        }
    }
</script>