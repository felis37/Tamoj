<template>
    <v-app>
        <v-toolbar app tabs color="white">
            <v-icon x-large class="hidden-sm-and-up">account_circle</v-icon>
            <v-toolbar-title class="hidden-sm-and-up">Felix</v-toolbar-title>
            <v-spacer />
            <div id="profile-title-elems" class="hidden-xs-only">
                <v-icon x-large>account_circle</v-icon>
                <v-toolbar-title><span class="hidden-sm-and-down">Min profil -&nbsp;</span>Felix Lennartsson</v-toolbar-title>
            </div>
            <v-spacer />
            <v-btn outline to='/admin'>
                <span class="hidden-md-and-down">Tillbaka till&nbsp;</span>
                <span class="hidden-xs-only">admin</span>
                <span class="hidden-sm-and-down">istration</span>
                <v-icon class="hidden-xs-only" right>launch</v-icon>
                <v-icon class="hidden-sm-and-up">layers</v-icon>
            </v-btn>

            <v-tabs slot="extension" fixed-tabs>
                <v-tab v-for="profileView in profileViews" :key="profileView.title" :to="profileView.path">
                    <v-icon large class="inline-icon-left hidden-xs-only">{{ profileView.icon }}</v-icon>
                    <span class="hidden-xs-only">{{ profileView.title }}</span>
                    <v-icon class="hidden-sm-and-up" large>{{ profileView.icon }}</v-icon>
                </v-tab>
                
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
                ],
                profiles: [
                    { text: 'Adam Bertilsson', avatar: '' },
                    { text: 'Alice Gustavsson', avatar: '' }
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
        white-space: nowrap;
    }
    #profile-title-elems * {
        display: inline-block;
    }
</style>