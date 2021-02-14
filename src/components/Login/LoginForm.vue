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

        <SnackBar
        v-model="SnackBar.value"
        />
    </v-card>
</template>

<script>
import Form from '../Form/Form'
import SnackBar from '../SnackBar/SnackBar'
    export default {
        name: 'LoginForm',
        components: {
            Form,
            SnackBar
        },
        data() {
            return  {
                SubmitFormBtnName: 'Login',
                loading: false,
                SnackBar: {
                    value: false
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