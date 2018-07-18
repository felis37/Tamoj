<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app color="white">
            <v-list two-line>
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <v-avatar id="profile-avatar">
                            <img src="https://www.w3schools.com/w3css/img_avatar3.png">
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
                <v-list-tile v-for="leaderView in leaderViews" :key="leaderView.title" :to="leaderView.path">
                    <v-list-tile-action>
                        <v-icon>{{ leaderView.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ leaderView.title }}</v-list-tile-title>
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
        <v-toolbar app color="white" flat class="flat-outline">
            <v-toolbar-side-icon class="hidden-lg-and-up" @click.stop="drawer = !drawer" />
            <v-spacer />
            <v-icon x-large>layers</v-icon>
            <v-toolbar-title><span class="hidden-sm-and-down">Ledarsidorna -&nbsp;</span>Närvaro</v-toolbar-title> <!--Get view title from leaderViews (do loop through to find object with name for route, then get that title)-->
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
        data() {
            return {
                drawer: null,
                user: {
                    displayName: '',
                    email: ''
                },
                leaderViews: [
                    { title: 'Närvaro', path: '/leader/attendance', name: 'attendance', icon: 'assignment' },
                    { title: 'Meddelanden & utskick', path: '/leader/communication', icon: 'question_answer' },
                    { title: 'Kalender', path: '/leader/calendar', icon: 'today' },
                    { title: 'Hantera avdelning', path: '/leader/manage-groups', icon: 'people' }
                ],
                supportViews: [
                    { title: 'Hjälp', path: '/leader/help', icon: 'help' },
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