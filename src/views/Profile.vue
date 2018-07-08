<template>
    <v-app>
        <v-toolbar app tabs color="white">
            <v-spacer />
            <div id="profile-title-elems">
                <v-icon x-large>account_circle</v-icon>
                <v-toolbar-title>Min profil - Felix Lennartsson</v-toolbar-title>
            </div>
            <v-spacer />
            <v-btn outline to='/admin'>
                Tillbaka till administration<v-icon right>launch</v-icon>
            </v-btn>

            <v-tabs slot="extension" centered>
                <v-tab v-for="profileView in profileViews" :key="profileView.title" :to="profileView.path"><v-icon large class="inline-icon-left">{{ profileView.icon }}</v-icon>{{ profileView.title }}</v-tab>
                
                <v-menu v-if="profileMenuItems.length" bottom right class="v-tabs__div">
                    <a slot="activator" class="v-tabs__item">
                        <v-icon large>more_vert</v-icon>
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
                    { title: 'Hjälp', path: '/profile/help', icon: 'help'},
                    { title: 'Om Tamoj', path: '/about', icon: 'info'},
                    { title: 'Logga ut', path: '/sign-out', icon: 'power_settings_new' }
                ]
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
    #profile-title-elems {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    #profile-title-elems * {
        display: inline-block;
    }
</style>