<template />

<script>
    import { firebase, auth } from '@/plugins/firebase'

    export default {
        data() {
            return {
                provider: null
            }
        },
        props: ['google'],
        watch: {
            google: function(value) {
                if (value) {
                    this.googleSignIn()
                }
            }
        },
        methods: {
            googleSignIn() {
                if (this.$vuetify.breakpoint.mdAndDown) {
                    auth.signInWithRedirect(this.provider)
                } else {
                    auth.signInWithPopup(this.provider)
                        .then(result => {
                            this.$emit('signInSuccess', result.user)
                        }).catch(error => {
                            alert('Error!')
                            console.log(error.code)
                            console.log(error.message)
                    })
                }
            }
        },
        mounted() {
            this.provider = new firebase.auth.GoogleAuthProvider()
        }
    }
</script>