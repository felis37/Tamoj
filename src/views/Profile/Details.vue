<template>
  <div class="details">
    <h1 v-if="currentLoginProfileLoaded">Välkommen! {{ currentLoginProfile }}</h1>
    <button @click="addOneMoreProfile">Klicka här för mer profil!</button>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { firestore, auth } from '@/plugins/firebase'

  export default {
    computed: mapState(['login', 'loginProfiles', 'loginProfilesLoaded', 'currentLoginProfile', 'currentLoginProfileLoaded']),
    created() {
      const primaryLoginProfileId = (this.login.is) ? this.login.is : Object.keys(this.login.profiles)[0]
      const primaryLoginProfile = firestore.collection('profiles').doc(primaryLoginProfileId)

      store.dispatch('setCurrentLoginProfileRef', primaryLoginProfile)
    },
    destroyed() {
      store.commit('setLoginProfilesLoaded', 0)
    },
    methods: {
      addOneMoreProfile() {
        const secLoginProfile = firestore.collection('profiles').doc(Object.keys(this.login.profiles)[0])
        store.dispatch('setLoginProfileRef', secLoginProfile)
      }
    }
  }
</script>