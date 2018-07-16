<template>
  <v-container fill-height grid-list-xl>
    <v-layout row wrap fill-height align-center justify-center>
      <v-flex md7 offset-md2>
        <v-jumbotron height="auto">
          <h3 class="display-3">Hej!</h3>
          <span class="subheading">Vänligen logga in nedan för att fortsätta.</span>
          <v-divider class="my-3"></v-divider>
        </v-jumbotron>
      </v-flex>
      
      <v-flex xs12 md4>
        <v-layout column justify-center align-center>
          <v-flex xs12>
            <v-btn class="sign-in-button" large color="white">
              <v-avatar>
                <img src="@/assets/google-logo.png">
              </v-avatar>
              &nbsp;&nbsp;&nbsp;Logga in med Google
            </v-btn>
          </v-flex>
          
          <v-flex xs12>
            <div class="subheading font-weight-thin font-italic text-xs-center">eller</div>
          </v-flex>
          
          <v-flex xs12>
            <v-btn 
              class="sign-in-button" 
              large 
              color="white"
              @click="showPhone = true">
              <v-avatar>
                <v-icon large color="primary">phone</v-icon>
              </v-avatar>
              &nbsp;&nbsp;&nbsp;Logga in med SMS
            </v-btn>
            <SignInPhone :phone="showPhone" @abort="showPhone = false" />
          </v-flex>

        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { firebase, auth } from '@/plugins/firebase'
  import SignInPhone from '@/components/SignInPhone.vue'

  export default {
    data() {
      return {
        showPhone: false
      }
    },
    components: {
      SignInPhone
    }
  }
</script>

<style scoped>
  .sign-in-button {
    height: 60px;
  }
</style>