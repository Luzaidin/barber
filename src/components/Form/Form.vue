<template>
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

        <v-row  
        class="justify-center">
            <v-btn
            color="primary"
            text
            @click="validateInputs"
            >
            {{SubmitFormBtnName}}</v-btn>
        </v-row>
    </v-form>
</template>

<script>
    export default {
        name: 'Form',
        props: {
            SubmitFormBtnName: {
                type: String,
                default:  '' 
            },
        },
        data(){
            return{
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
                validForm: false
            }
        },
        methods: {
            validateInputs() {
                let inputsIsValid = this.$refs.form.validate()
                this.$emit('validateForm', inputsIsValid);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>