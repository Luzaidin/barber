<template>
    <v-card
    :loading="loading"
    class="mx-auto my-12"
    >   
        <template slot="progress">
            <v-progress-linear
            color="deep-blue"
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
</template>

<script>
import Form from '../Form/Form'
import SnackBar from '../SnackBar/SnackBar'
import ButtonCenter from '../Button/ButtonCenter'

    export default {
        name: 'LoginForm',
        components: {
            Form,
            SnackBar,
            ButtonCenter
        },
        data() {
            return  {
                SubmitFormBtnName: 'Login',
                loading: false,
                SnackBar: {
                    value: false
                },
                ButtonMensage: {
                    forgotPassword: 'Forgot password?',
                    signIn: 'Sign In'
                }
            }
        },
        methods: {
            signIn() {
                this.$router.push({name: "SignIn"});
            },
            validateForm(formIsValid) {
                if (formIsValid) {
                    this.$router.push({ name: "Home" });
                } else {
                    this.SnackBar.value = true;
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>