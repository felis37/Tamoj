<template>
    <h1 v-if="identityProfilesLoaded">Hej {{identityProfiles[0].details.general.givenName}}!</h1>
</template>

<script>
  import { mapState } from 'vuex'
  import { firestore } from '@/plugins/firebase' //ABS
  //Should be abstracted!
  const identityProfilesRef = firestore.collection('profiles').where(`permissions.rw.PmCKk8xK6fZvp2X4u8XQraZMFZS2`, '==', true)


  export default {
    computed: mapState(['identityProfiles', 'identityProfilesLoaded']),
    created() {
      this.$store.dispatch('setIdentityProfilesRef', identityProfilesRef)
    },
    destroyed() {
      this.$store.commit('setIdentityProfilesLoaded', false)
    }
  }
</script>
