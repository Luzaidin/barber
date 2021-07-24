import firebase from "firebase"

function registerUserDB(user) {
  firebase
  .auth()
  .createUserWithEmailAndPassword(user.email, user.password)
  .then(() => {
    return true
    //this.$router.push({ name: "Home" });
  })
  .catch(() => {
    return false
    //alert(error.message);
  });
}

function authenticUserDB(user) {
  firebase
  .auth()
  .signInWithEmailAndPassword(user.email, user.password)
  .then(() => {
    return true
    //this.$router.push({ name: "Home" });
  })
  .catch(() => {
    return false
    //alert(error.message);
  });
}

function resetPasswordDB(user) {
  firebase
  .auth()
  .sendPasswordResetEmail(user.email)
  .then(() => {
    return true
      //alert('Check your registered email to reset the password!')
      //this.user = {   
      //email: ''
      //}
  })
  .catch(() => {
    return false
      //alert(error)
  })
}

export {registerUserDB, authenticUserDB, resetPasswordDB}
