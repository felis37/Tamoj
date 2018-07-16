<template>
    <div id="sign-in-phone">
        <v-dialog v-model="mobileDialog" max-width="290" persistent>
            <v-card>
                <v-card-title class="headline">
                    Ange telefonnummer
                </v-card-title>
                <v-card-text>
                    <div class="caption pb-3">
                        Ange ditt telefonnummer som du har kopplat för att logga in.
                    </div>
                    <form @submit.prevent id="mobile-form">
                        <v-text-field
                            type="tel"
                            v-model.trim="mobile"
                            ref="mobileInput"
                            clearable
                            label="Telefonnummer"
                            prepend-icon="phone" />
                    </form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn
                        flat
                        color="red"
                        @click="abort">
                        Avbryt
                    </v-btn>
                    <v-btn
                        form="mobile-form"
                        id="mobile-submit"
                        type="submit"
                        flat
                        color="green">
                        Fortsätt
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="confirmationCodeDialog" max-width="290" persistent>
            <v-card>
                <v-card-title class="headline">
                    Ange bekräftelsekod
                </v-card-title>
                <v-card-text>
                    <div class="caption pb-3">
                        Du bör inom kort få en bekräftelsekod till ditt nummer <strong>{{ mobile }}</strong>. Ange koden för att fortsätta.
                    </div>
                    <form @submit.prevent="confirmationCodeSubmit" id="confirmation-code-form">
                        <v-text-field
                            prepend-icon="confirmation_number"
                            type="tel"
                            :loading="confirmationCode.length > 0 && (confirmationCode.length <= 5 || confirmationCodeStatus.status == null)"
                            v-model.trim="confirmationCode"
                            ref="confirmationCodeInput"
                            label="Bekräftelsekod"
                            @input="(confirmationCode.length === 6) ? confirmationCodeSubmit() : null" />
                    </form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn
                        flat
                        color="red"
                        @click="abort">
                        Avbryt
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { firebase, auth } from '@/plugins/firebase'

    export default {
        data() {
            return {
                mobileDialog: false,
                mobile: '',
                confirmationCodeDialog: false,
                confirmationCode: '',
                confirmationCodeStatus: {
                    status: null
                }
            }
        },
        props: ['phone'],
        watch: {
            phone: function(value) {
                if (value) {
                    document.getElementsByClassName('grecaptcha-badge')[0].setAttribute('style', 'display: none !important')
                    this.$nextTick(this.$refs.mobileInput.focus)
                }
                this.mobileDialog = value
            }
        },
        methods: {
            mobileSubmit() {
                auth.signInWithPhoneNumber(this.mobile, window.recaptchaVerifier)
                    .then(confirmationResult => {
                        window.confirmationResult = confirmationResult
                        grecaptcha.reset(window.recaptchaWidgetId);
                        this.mobileDialog = false
                        this.$nextTick(this.$refs.confirmationCodeInput.focus)
                        this.confirmationCodeDialog = true
                    }).catch(error => {
                        alert('Error in sign in with phone number')
                        console.log(error.code)
                        console.log(error.message)
                })
            },
            confirmationCodeSubmit() {
                confirmationResult.confirm(this.confirmationCode)
                    .then(result => {
                        this.confirmationCodeStatus.status = 'success'
                        let user = result.user
                        this.mobile = ''
                        this.confirmationCode = ''
                        this.confirmationCodeDialog = false
                        this.$emit('signInSuccess', user)
                    }).catch(error => {
                        this.confirmationCodeStatus.status = 'error'
                        alert('Error in confirmation of otp')
                        console.log(error.code)
                        console.log(error.message)
                    })
            },
            abort() {
                grecaptcha.reset(window.recaptchaWidgetId);
                this.mobile = ''
                this.confirmationCode = ''
                this.mobileDialog = false
                this.confirmationCodeDialog = false
            }
        },
        mounted() {
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('mobile-submit', {
                size: 'invisible',
                callback: response => {
                    this.mobileSubmit()
                }
            })
            window.recaptchaVerifier.render().then((widgetId) => {
                window.recaptchaWidgetId = widgetId
            })
        }
    }
</script>

<style scoped>
    .grecaptcha-badge,
    .grecaptcha-logo 
    {
        display: none !important;
    }
</style>