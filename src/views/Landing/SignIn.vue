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
            <v-btn id="google-sign-in-button" large color="white">
              <v-avatar>
                <img src="http://diylogodesigns.com/blog/wp-content/uploads/2016/04/google-logo-icon-PNG-Transparent-Background.png">
              </v-avatar>
              &nbsp;&nbsp;&nbsp;Logga in med Google
            </v-btn>
          </v-flex>
          
          <v-flex xs12>
            <div class="subheading font-weight-thin font-italic text-xs-center">eller</div>
          </v-flex>
          
          <v-flex xs12>
            <v-form @submit.prevent id="mobile-form">
              <v-text-field style="display: inline-block"
                id="mobile-form-input"
                v-model.trim="mobile"
                solo
                clearable
                prepend-inner-icon="phone"
                persistent-hint
                hint="Ange ett kopplat nummer ovan för att logga in" 
                placeholder="Logga in med SMS"
                @input="mobileInput" />
              <v-btn type="submit" id="mobile-form-submit" icon style="display: inline-block; margin-bottom: 22px" v-show="mobileSendButton">
                <v-icon color="primary">send</v-icon>
              </v-btn>
            </v-form>
            
            <v-dialog v-model="dialog" max-width="290" persistent>
              <v-card>
                <v-card-title class="headline">
                  Ange bekräftelsekoden från SMS
                </v-card-title>
                <v-card-text>
                  <div class="caption pb-3">Du bör inom kort få en bekräftelsekod skickad till dig på <strong>{{ mobile }}</strong> som du anger nedan</div>
                  <form @submit.prevent="confirmationCodeSubmit">
                    <v-text-field 
                      v-model.trim="confirmationCode"
                      autofocus
                      clearable
                      label="Bekräftelsekod" />
                  </form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn flat color="red" @click="confirmationCodeAbort">
                    Avbryt
                  </v-btn>
                  <v-btn flat color="green" @click="confirmationCodeSubmit">
                    Fortsätt
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { firebase, auth } from '@/plugins/firebase'
  
  export default {
    data() {
      return {
        mobileSendButton: false,
        mobile: '',
        dialog: false,
        confirmationCode: ''
      }
    },
    methods: {
      mobileInput() {
        (this.mobile != null && this.mobile.length > 0) ? this.mobileSendButton = true : this.mobileSendButton = false
      },
      mobileSubmit() {
        console.log('here1')
        let phoneNumber = this.mobile
        let appVerifier = window.recaptchaVerifier
        auth.signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(confirmationResult => {
            console.log('here2')
            window.confirmationResult = confirmationResult
            this.dialog = true
            console.log('here3')
          }).catch(error => {
            console.log('Error in sign in with phone number')
            console.log(error.code)
            console.log(error.message)
        })
      },
      confirmationCodeAbort() {
        grecaptcha.reset(window.recaptchaWidgetId);
        this.confirmationCode = ''
        this.mobile = ''
        this.mobileInput()
        this.dialog = false
      },
      confirmationCodeSubmit() {
        this.dialog = false
        this.mobile = ''
        this.mobileInput()
        let code = this.confirmationCode
        confirmationResult.confirm(code)
          .then(result => {
            let user = result.user
            alert('User successful sign in. UID is ' + user.uid)
        })
        this.confirmationCode = ''
      }
    },
    mounted() {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('mobile-form-submit', {
        size: 'invisible',
        callback: response => {
          this.mobileSubmit()
        }
      })

      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId
        document.getElementById('mobile-form').children[1].setAttribute('style', 'display: none !important;')
      })
    }
  }
</script>

<style scoped>
  .rounded-outline-card {
    border: 1px solid rgba(0,0,0,0.12);
    border-radius: 45px;
  }
  #google-sign-in-button {
    height: 60px;
  }
  #mobile-form {
    display: inline-block;
  }
</style>





























<!--<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Logga in</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="handle">
              <v-text-field v-model.trim="user.email" prepend-icon="person" label="E-post" type="email" />
              <v-text-field v-model.trim="user.password" prepend-icon="lock" label="Lösenord" type="password" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary">Logga in</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


-->

<!--<template>
  <div class="sign-in">
    <div id="landing-nav">
      <router-link to="/sign-in">Logga in</router-link> | 
      <router-link to="/about">Om</router-link> | 
    </div>
    <h1>Logga in</h1>
    <p>Här ska en användare kunna logga in med olika inloggningsmetoder. Förslag är: SMS-inloggning och Google</p>
    <SignInEmailPass @signInSuccess="signInSuccess" />
  </div>
</template>

<script>
//import SignInEmailPass from '@/components/SignInEmailPass.vue'

export default {
  /*components: {
    SignInEmailPass
  },*/
  data() {
    return {
      user: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    signInSuccess(user) {
      const possibleTargetPath = this.$route.params.target
      if (typeof possibleTargetPath !== 'undefined') {
        this.$router.replace(possibleTargetPath)
      } else {
        this.$router.replace({ name: user.accessModules[0] })
      }
    },
    handle() {
      alert('Yay, sign in!')
    }
  }
}
</script>-->