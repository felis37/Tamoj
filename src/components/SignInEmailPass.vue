<template>
    <div class="sign-in-email-pass">
        <h3>Logga in med e-post och lösenord (endast för test mot Firebase)</h3>
        <form @submit.prevent="login">
            <input type="text" placeholder="E-post" v-model="user.email"><br>
            <input type="password" placeholder="Lösenord" v-model="user.password"><br>
            <button type="submit">Logga in</button>
        </form>
    </div>
</template>

<script>
    import { auth } from '@/plugins/firebase'
    
    export default {
        name: 'signInEmailPass',
        data() {
            return {
                user: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            async login() {
                try {
                    await auth.signInWithEmailAndPassword(this.user.email, this.user.password)
                    this.$router.replace('admin')
                } catch(err) {
                    alert('Ett fel inträffade! Felmeddelande: ' + err.message)
                }
            }
        }
    }
</script>

<style scoped>
</style>