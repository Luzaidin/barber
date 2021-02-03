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

        <v-row  
        class="mt-4 justify-center">
            <v-btn
            color="primary"
            text
            >
                Forgot password?
            </v-btn>
        </v-row>

        <v-row  
        class="mt-16 justify-center">
            <v-btn
            color="primary"
            text
            @click="signIn"
            >
                Sign Up
            </v-btn>
        </v-row>

        <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        color="error"
        >
        Error! E-mail or Password are not valid
        </v-snackbar>
    </v-card>
</template>

<script>
import Form from '../Form/Form'
    export default {
        name: 'LoginForm',
        components: {
            Form,
        },
        data() {
            return  {
                SubmitFormBtnName: 'Login',
                loading: false,
                snackbar: false,
                timeout: 2000,
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
                    this.snackbar = true;
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>