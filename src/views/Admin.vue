<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app color="white">
            <v-list two-line>
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <v-avatar id="profile-avatar">
                            <img src="https://cdn.vuetifyjs.com/images/john.jpg">
                        </v-avatar>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>Felix Lennartsson</v-list-tile-title>
                        <v-list-tile-sub-title><v-btn id="profile-button" outline small to="/profile">Min profil<v-icon right>launch</v-icon></v-btn></v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-list subheader>
                <v-divider />
                <v-list-tile v-for="adminView in adminViews" :key="adminView.title" :to="adminView.path">
                    <v-list-tile-action>
                        <v-icon>{{ adminView.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ adminView.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider />
                <v-list-tile v-for="supportView in supportViews" :key="supportView.title" :to="supportView.path">
                    <v-list-tile-action>
                        <v-icon>{{ supportView.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ supportView.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="white">
            <v-toolbar-side-icon class="hidden-lg-and-up" @click.stop="drawer = !drawer" />
            <v-spacer />
            <v-icon x-large>layers</v-icon>
            <v-toolbar-title><span class="hidden-sm-and-down">Administration -&nbsp;</span>Närvaro</v-toolbar-title> <!--Get view title from adminViews (do loop through to find object with name for route, then get that title)-->
            <v-spacer />
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: 'admin',
        data() {
            return {
                drawer: null,
                user: {
                    displayName: '',
                    email: ''
                },
                adminViews: [
                    { title: 'Närvaro', path: '/admin/attendance', name: 'attendance', icon: 'assignment' },
                    { title: 'Meddelanden & utskick', path: '/admin/communication', icon: 'question_answer' },
                    { title: 'Kalender', path: '/admin/calendar', icon: 'today' },
                    { title: 'Hantera avdelning', path: '/admin/manage-groups', icon: 'people' }
                ],
                supportViews: [
                    { title: 'Hjälp', path: '/admin/help', icon: 'help' },
                    { title: 'Om Tamoj', path: '/about', icon: 'info' },
                    { title: 'Logga ut', path: '/sign-out', icon: 'power_settings_new' }
                ]
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
    #profile-button {
        margin: 0;
    }
    #profile-avatar {
        padding-top: 6px;
    }
</style>