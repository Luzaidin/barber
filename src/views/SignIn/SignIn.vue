<template>
  <div class="signUpDiv">
    <div class="signupSection">
      <div class="info">
      </div>
      <form class="signupForm" name="signupform">
      </form>
    </div>
  </div>


    <!-- <v-container 6
    fill-height>   
        <v-card
        class="mx-auto my-12"
        max-width="600"
        >
            <v-card-title 
            class="justify-center"
            >
            Sign Up
            </v-card-title>

            <v-card-text>
                <Form 
                :SubmitFormBtnName=SubmitFormBtnName 
                @validateForm="validateForm($event)"
                />
            </v-card-text>

            <SnackBar
            v-model="SnackBar.value"
            />
        </v-card>
    </v-container> -->
</template>

<script>
// import Form from '../../components/Form/Form'
// import SnackBar from '../../components/SnackBar/SnackBar'

    export default {
        name: 'SignIn',
        data() {
            return {
                SubmitFormBtnName: 'Register',
                SnackBar: {
                    value: false
                }
            }
        },
        methods: {
            validateForm(formIsValid) {
                if (formIsValid) {
                    this.$router.push({ name: "Home" });
                } else{
                    this.SnackBar.value = true;
                }
            }
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
  width: 100%;
  background: url('../../assets/Login/barber_home.jpg');
  background-repeat: round;
}

.signupSection {
  background: url(https://source.unsplash.com/TV2gg2kZD1o/1600x800);
  background-repeat: no-repeat;
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

.info {
  background: rgba(20, 20, 20, .8);
  padding: 30px 0;
  border-right: 5px solid rgba(30, 30, 30, .8);
  h2 {
    padding-top: 30px;
    font-weight: 300;
  }
  p {
    font-size: 18px;
  }
  .icon {
    font-size: 8em;
    padding: 20px 0;
    color: rgba(10, 180, 180, 1);
  }
}

.signupForm {
  width: 70%;
  padding: 30px 0;
  background: rgba(20, 40, 40, .8);
  transition: .2s;
  h2 {
    font-weight: 300;
  }
}

.inputFields {
  margin: 15px 0;
  font-size: 16px;
  padding: 10px;
  width: 250px;
  border: 1px solid rgba(10, 180, 180, 1);
  border-top: none;
  border-left: none;
  border-right: none;
  background: rgba(20, 20, 20, .2);
  color: white;
  outline: none;
}

.noBullet {
  list-style-type: none;
  padding: 0;
}

#join-btn {
  border: 1px solid rgba(10, 180, 180, 1);
  background: rgba(20, 20, 20, .6);
  font-size: 18px;
  color: white;
  margin-top: 20px;
  padding: 10px 50px;
  cursor: pointer;
  transition: .4s;
  &:hover {
    background: rgba(20, 20, 20, .8);
    padding: 10px 80px;
  }
}

</style>