<template>
  <div class="details">
    <h1>Välkommen</h1>
    <p>Detta är huvudprofilsidan. Här ska en användare kunna hantera alla sina personuppgifter</p>
    <button @click="getFunctionData">Klicka här för funktionsdata!</button>
  </div>
</template>

<script>
  import { functions } from '@/plugins/firebase'
   
  export default {
    name: 'unique_details',
    methods: {
      async getFunctionData() {
        let helloWorld = functions.httpsCallable('helloWorld')
        let result = await helloWorld()
        console.log(result)
      }
    }
  }
</script>