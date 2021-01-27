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

        <v-card-title class="justify-center">Login Teste</v-card-title>

        <v-card-text>
            <v-form               
                ref="form"
                v-model="validForm"
            >
                <v-row
                    align="center"
                    class="mx-10"
                >
                    <v-text-field
                    v-model="form.email.value"
                    :rules="form.email.rule"
                    label="E-mail"
                    required
                    ></v-text-field>
                </v-row>

                <v-row
                    align="center"
                    class="mx-10 my-10"
                >
                    <v-text-field
                    v-model="form.password.value"
                    :rules="form.password.rule"
                    :type="'password'"
                    label="Password"
                    required
                    ></v-text-field>
                </v-row>
            </v-form>
        </v-card-text>

        <v-row  class="justify-center">
            <v-btn
            color="primary"
            text
            @click="login"
            >
                Login
            </v-btn>
        </v-row>

        <v-row  class="mt-4 justify-center">
            <v-btn
            color="primary"
            text
            >
                Forgot password?
            </v-btn>
        </v-row>

        <v-row  class="mt-16 justify-center">
            <v-btn
            color="primary"
            text
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
    export default {
        name: 'Form',
        data(){
            return{
                loading: false,
                form: {
                    email: {
                        value: '',
                        rule: [
                            v => !!v || 'E-mail is required',
                            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                        ]
                    },
                    password: {
                        value: '',
                        rule: [
                            v => !!v || 'Password is required',
                        ]
                    }
                },
                snackbar: false,
                timeout: 2000,
                validForm: true
            }
        },
        methods: {
            login() {
                let inputsIsValid = this.$refs.form.validate()
                if (inputsIsValid) {
                    this.$router.push({ name: "Home" });
                } else {
                    this.snackbar = true
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>