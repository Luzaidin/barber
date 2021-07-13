import firebase from firebase

function registerUserDB(user) {
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
};

function createUserDB(user) {
  firebase
  .auth()
  .signInWithEmailAndPassword(user.email, user.password)
  .then(() => {
    return true
    //this.$router.push({ name: "Home" });
  })
  .catch((error) => {
    return false
    //alert(error.message);
  });
};

export {registerUserDB, createUserDB}
