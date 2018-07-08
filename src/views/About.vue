<template>
  <div class="about">
    <div id="landing-nav">
      <router-link to="/sign-in">Logga in</router-link> | 
      <router-link to="/about">Om</router-link> | 
    </div>
    <h1>Välkommen till utvecklingsmiljön för Tamoj</h1>
    <p>Tamoj är framtidens administrationssystem för föreningar. Med Tamoj kan medlemmar lätt hantera sina medlemskap i föreningar, och anmäla sig till händelser. Ledare i föreningen har på andra sidan kraftfulla och lättanvända administrationsverktyg för att hantera medlemmar, avdelningar, händelser och utskick. Allt för att göra föreningars IT så smidig som möjligt :)</p>
  </div>
</template>

<script>
  export default {
    name: 'about'
  }
</script>