<template>
    <div>
        <v-card
        :loading="loading"
        class="mx-auto my-12"
        >   
            <template slot="progress">
                <v-progress-linear
                color="blue darken-4"
                height="10"
                indeterminate
                ></v-progress-linear>
            </template>

            <v-card-title 
            class="justify-center"
            >
            Login Teste
            </v-card-title>

            <v-card-text>
                <Form 
                :SubmitFormBtnName=SubmitFormBtnName 
                @validateForm="validateForm($event)"
                />
            </v-card-text>

            <ButtonCenter
            class="mt-4"
            :mensage="ButtonMensage.forgotPassword"
            :clickMethod="sendPassword"
            />

            <ButtonCenter
            class="mt-16"
            :mensage="ButtonMensage.signIn"
            :clickMethod="signIn"
            />

            <SnackBar
            v-model="SnackBar.value"
            />
        </v-card>
        <div style="position: absolute;bottom: 0;">
            <ErrorAlert
            v-model="ErrorAlert.value"
            :text="ErrorAlert.mensage.default"
            />
        </div>
        <div style="position: absolute;bottom: 0;">
            <SuccessAlert
            v-model="SuccessAlert.value"
            :text="SuccessAlert.mensage.default"
            />
        </div>
    </div>
</template>

<script>
import Form from '../Form/Form'
import SnackBar from '../SnackBar/SnackBar'
import ButtonCenter from '../Button/ButtonCenter'
import { authenticUserDB, resetPasswordDB } from '../../firebase/index'
import ErrorAlert from '../Alerts/ErrorAlert.vue'
import SuccessAlert from '../Alerts/SuccessAlert.vue'

    export default {
        name: 'LoginForm',
        components: {
            Form,
            SnackBar,
            ButtonCenter,
            ErrorAlert,
            SuccessAlert
        },
        data() {
            return  {
                SubmitFormBtnName: 'Login',
                loading: false,
                SnackBar: {
                    value: false
                },
                ErrorAlert: {
                    value: false,
                    mensage: {
                        default: '',
                        login: "Error! Failed to login.",
                        resetPassword: "Erro! Failed to send e-mail.",
                    }
                },
                ButtonMensage: {
                    forgotPassword: 'Forgot password?',
                    signIn: 'Sign In'
                },
                user: {
                  email: '',
                  password: '',
                },
                SuccessAlert: {
                    value: false,
                    mensage: {
                        default: '',
                        resetPassword: "Success! An email has been sent.",
                    }
                }
            }
        },
        mounted() {
          this.user = this.$store.getters.getUser;
        },
        methods: {
            signIn() {
                this.$router.push({name: "SignIn"});
            },
            validateForm(inputsIsValid) {
                if (inputsIsValid) {
                    this.login();
                } else {
                    this.SnackBar.value = true;
                }
            },
            login() {
                let authenticatedUser  = authenticUserDB(this.user)
                if (authenticatedUser) {
                    this.$router.push({ name: "Home" });
                } else {
                    this.ErrorAlert.mensage.default = this.ErrorAlert.mensage.login;
                    this.ErrorAlert.value = true;
                }
            },
            sendPassword(){
                let emailSent = resetPasswordDB(this.user)
                if (emailSent) {
                    this.SuccessAlert.mensage.default = this.SuccessAlert.mensage.resetPassword;
                    this.SuccessAlert.value = true;
                    //alert('E-mail enviado.')
                } else {
                    this.ErrorAlert.mensage.default = this.ErrorAlert.mensage.resetPassword;
                    this.ErrorAlert.value = true;
                    //alert('Erro! Ao enviar e-mail.')
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>