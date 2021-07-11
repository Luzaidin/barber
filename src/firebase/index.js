import firebase from firebase

function registerUser(user){
    firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((res) => {
        return true
      //this.$router.push({ name: "Home" });
    })
    .catch((error) => {
        return false
      //alert(error.message);
    });
}