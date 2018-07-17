<template />

<script>
import { auth } from '@/plugins/firebase'

export default {
    name: 'signOut',
    methods: {
        async signOut() {
            try {
                await auth.signOut()
                this.$router.replace({ name: 'SignIn' })
            } catch(err) {
                alert('Ett fel inträffade! Felmeddelande: ' + err.message)
            }
        }
    },
    mounted() {
        this.signOut()
    }
}
</script>