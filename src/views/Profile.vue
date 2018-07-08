<template>
    <v-app>
        <v-toolbar app tabs>
            <v-toolbar-title>Felix Lennartsson</v-toolbar-title>
            <v-spacer />
            <v-btn icon to='/admin'>
                <v-icon>dashboard</v-icon>
            </v-btn>

            <v-tabs slot="extension" centered>
                <v-tab v-for="profileView in profileViews" :key="profileView.title" :to="profileView.path"><v-icon class="inline-icon-left">{{ profileView.icon }}</v-icon>{{ profileView.title }}</v-tab>
                
                <v-menu v-if="profileMenuItems.length" bottom left class="v-tabs__div">
                    <a slot="activator" class="v-tabs__item">
                        <v-icon>more_vert</v-icon>
                    </a>
                    <v-list>
                        <v-list-tile v-for="profileMenuItem in profileMenuItems" :key="profileMenuItem.title" :to="profileMenuItem.path">
                            <v-list-tile-action>
                                <v-icon>{{ profileMenuItem.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ profileMenuItem.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-tabs>
        </v-toolbar>
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
        name: 'profile',
        data() {
            return {
                user: {
                    displayName: '',
                    email: ''
                },
                profileViews: [
                    { title: 'Medlemskap', path: '/profile/memberships', icon: 'how_to_reg'},
                    { title: 'Personuppgifter', path: '/profile/details', icon: 'person'},
                    { title: 'Händelser', path: '/profile/events', icon: 'event'}
                ],
                profileMenuItems: [
                    { title: 'Logga ut', path: '/sign-out', icon: 'power_settings_new' }
                ]
            }
        },
        methods: {

        }
    }
</script>