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

        <v-card-title class="justify-center">Login</v-card-title>

        <v-card-text>
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
                :type="'password'"
                label="Password"
                required
                ></v-text-field>
            </v-row>
        </v-card-text>

        <v-row  class="justify-center">
            <v-btn
            color="primary"
            text
            >
                Login
            </v-btn>
        </v-row>

         <v-row  class="justify-center">
            <v-btn
            color="primary"
            text
            >
            Forgot password?
            </v-btn>
        </v-row>
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
                        value: ''
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>