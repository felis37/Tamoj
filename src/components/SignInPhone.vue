<template>
    <div class="sign-in-phone">
        <h3>Logga in med SMS-kod</h3>
        <form @submit.prevent="login">
            <input type="tel" placeholder="Mobilnummer" v-model="user.mobile"><br>
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
                    password: '',
                    accessModules: ['admin', 'profile'] //Should be moved!
                }
            }
        },
        methods: {
            async login() {
                try {
                    await auth.signInWithEmailAndPassword(this.user.email, this.user.password)
                    this.$emit('signInSuccess', this.user)
                } catch(err) {
                    alert('Ett fel inträffade! Felmeddelande: ' + err.message)
                }
            }
        }
    }
</script>