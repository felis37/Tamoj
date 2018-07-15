<template>
    <v-app>
        <v-content>
            <v-container fluid>
                <router-view />
            </v-container>
        </v-content>
        <v-footer app height="auto" color="primary lighten-1">
            <v-layout justify-center row wrap>
                <v-btn color="white" flat round :to="{ name: 'SignIn' }">
                    Logga in
                </v-btn>
                <v-btn color="white" flat round :to="{ name: 'About' }">
                    Om Tamoj
                </v-btn>
                <v-flex primary lighten-2 py-3 text-xs-center white--text xs12>
                    &copy; 2018 - <strong>Tamoj</strong>
                </v-flex>
            </v-layout>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        name: 'landing'
    }
</script>