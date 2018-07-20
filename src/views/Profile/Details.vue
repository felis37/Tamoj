<template>
  <div class="details">
    <h1 v-if="primaryLoginProfileLoaded">Välkommen {{ primaryLoginProfile.details.general.givenName }}!</h1>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { firestore, auth } from '@/plugins/firebase'
  import firestoreRefs from '@/modules/firestoreRefs'

  export default {
    computed: mapState(['auth', 'login', 'loginProfiles', 'loginProfilesLoaded', 'currentLoginProfileOfLoginProfiles', 'primaryLoginProfile', 'primaryLoginProfileLoaded']),
    created() {
      store.dispatch('setPrimaryLoginProfileRef', firestoreRefs.getRef('primaryLoginProfile'))
      //store.dispatch('setLoginProfilesRefs', firestoreRefs.getRef('loginProfiles')) //Todo when sevprofload
    },
    destroyed() {
      store.commit('setPrimaryLoginProfileLoaded', false)
    },
    methods: {
    }
  }
</script>