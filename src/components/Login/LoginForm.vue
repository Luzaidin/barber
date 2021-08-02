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
            :text="AlertMensage.errorMensage"
            />
        </div>
    </div>
</template>

<script>
import Form from '../Form/Form'
import SnackBar from '../SnackBar/SnackBar'
import ButtonCenter from '../Button/ButtonCenter'
import { resetPasswordDB } from '../../firebase/index'
import ErrorAlert from '../Alerts/ErrorAlert.vue'

    export default {
        name: 'LoginForm',
        components: {
            Form,
            SnackBar,
            ButtonCenter,
            ErrorAlert
        },
        data() {
            return  {
                SubmitFormBtnName: 'Login',
                loading: false,
                SnackBar: {
                    value: false
                },
                ErrorAlert: {
                    value: false
                },
                ButtonMensage: {
                    forgotPassword: 'Forgot password?',
                    signIn: 'Sign In'
                },
                user: {
                  email: '',
                  password: '',
                },
                AlertMensage: {
                    errorMensage: "Error! Failed to login."
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
                    this.ErrorAlert.value = true;
                }
            },
            sendPassword(){
                let emailSent = resetPasswordDB(this.user)
                if (emailSent) {
                    alert('E-mail enviado.')
                } else {
                    alert('Erro! Ao enviar e-mail.')
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>