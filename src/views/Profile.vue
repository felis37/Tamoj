<template>
    <v-app>
        <v-toolbar app tabs color="white">
            <v-spacer />
            <v-avatar>
                <img src="https://www.w3schools.com/w3css/img_avatar3.png">
            </v-avatar>
            <v-toolbar-title>
                <span class="hidden-sm-and-down">Min profil -&nbsp;</span>
                Felix Lennartsson&nbsp;
            </v-toolbar-title>
            <v-btn v-if="profiles.length > 1" small outline round @click.stop="profileSelect = !profileSelect">
                Ändra
            </v-btn>
            <v-spacer />
            <v-tabs slot="extension" fixed-tabs>
                <v-tab v-for="profileView in profileViews" :key="profileView.title" :to="profileView.path">
                    <v-icon large class="hidden-xs-only">{{ profileView.icon }}</v-icon>
                    <span class="hidden-xs-only">&nbsp;&nbsp;{{ profileView.title }}</span>
                    <v-icon class="hidden-sm-and-up" large>{{ profileView.icon }}</v-icon>
                </v-tab>
                
                <v-menu v-if="profileMenuItems.length" bottom right class="v-tabs__div">
                    <a slot="activator" class="v-tabs__item">
                        <v-icon large>more_vert</v-icon>
                    </a>
                    <v-list>
                        <v-list-tile to="/admin">
                            <v-list-tile-action>
                                <v-icon>layers</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Administration&nbsp;&nbsp;<v-icon small>launch</v-icon></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-divider />
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
        <v-bottom-sheet inset v-model="profileSelect">
            <v-list>
                <v-subheader>Välj profil</v-subheader>
                <v-list-tile avatar v-for="profile in profiles" :key="profile.name" @click.stop="profileSelect = false">
                    <v-list-tile-avatar>
                        <v-avatar>
                            <img src="https://www.w3schools.com/w3css/img_avatar3.png">
                        </v-avatar>
                    </v-list-tile-avatar>
                    <v-list-tile-title>
                        {{ profile.name }}
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-bottom-sheet>
    </v-app>
</template>

<script>
    export default {
        name: 'profile',
        data() {
            return {
                profileSelect: null,
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
                    { name: 'Adam Bertilsson', avatar: '' },
                    { name: 'Alice Gustavsson', avatar: '' }
                ]
            }
        },
        methods: {

        }
    }
</script>