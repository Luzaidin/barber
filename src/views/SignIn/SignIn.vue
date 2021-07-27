<template>
  <div class="signUpDiv">
    <div class="signupSection">
      <div class="signupForm" name="signupform">
        <Form 
          :SubmitFormBtnName=SubmitFormBtnName 
          @validateForm="validateForm($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Form from '../../components/Form/Form'
// import SnackBar from '../../components/SnackBar/SnackBar'
import { registerUserDB } from '../../firebase/index'

    export default {
        name: 'SignIn',
        components: {
          Form
        },
        data() {
            return {
                SubmitFormBtnName: 'Register',
                SnackBar: {
                    value: false
                },
                user: {
                  email: '',
                  password: '',
                }
            }
        },
        mounted () {
          this.user = this.$store.getters.getUser;
        },
        methods: {
            validateForm(inputsIsValid) {
                if (inputsIsValid) {
                    this.registerUser()
                } else{
                    this.SnackBar.value = true;
                }
            },
            registerUser() {
              let registeredUser = registerUserDB(this.user)
              if (registeredUser) {
                this.$router.push({ name: "Home" });
              } else {
                this.SnackBar.value = true;
              }
            },
        },
    }
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:300);
* {
  font-family: 'Open Sans', sans-serif;
}

.signUpDiv {
  height: 100%;
  background: url('../../assets/barber-shop-welcome.jpg') no-repeat center center fixed;
  background-size: cover;
}

.signupSection {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 450px;
  text-align: center;
  display: flex;
  color: white;
  box-shadow: 3px 10px 20px 5px rgba(0, 0, 0, .5);
}

.signupForm {
  width: 100%;
  padding: 30px 0;
  background: #f4f7f7c7;
  transition: .2s;
}

</style>