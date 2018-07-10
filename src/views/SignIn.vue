<template>
  <div class="sign-in">
    <div id="landing-nav">
      <router-link to="/sign-in">Logga in</router-link> | 
      <router-link to="/about">Om</router-link> | 
    </div>
    <h1>Logga in</h1>
    <p>Här ska en användare kunna logga in med olika inloggningsmetoder. Förslag är: Scoutnet (a.k.a lokal medlemsinloggning), Google och Facebook</p>
    <SignInEmailPass @signInSuccess="signInSuccess" />
  </div>
</template>

<script>
import SignInEmailPass from '@/components/SignInEmailPass.vue'

export default {
  name: 'signIn',
  components: {
    SignInEmailPass
  },
  methods: {
    signInSuccess(user) {
      const possibleTargetPath = this.$route.params.target
      if (typeof possibleTargetPath !== 'undefined') {
        this.$router.replace(possibleTargetPath)
      } else {
        this.$router.replace({ name: user.accessModules[0] })
      }
    }
  }
}
</script>