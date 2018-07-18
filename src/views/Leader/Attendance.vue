<template>
    <h1>{{ 'Hej ' + identityProfiles[0].details.general.givenName + '!' }}</h1>
</template>

<script>
  import { mapState } from 'vuex'
  
  export default {
    computed: mapState(['identityProfiles'])
  }
</script>