<template>
    <div class="login">
        <form @submit.prevent="validateBeforeSubmit">
            <h3>Sign In</h3>
            <div>
                <input name="email" v-model="user.email" type="email" placeholder="Email" style="margin-bottom: 20px"
                    v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('user.email') }">
                <br>
                <span v-show="errors.has('email')" class="alert alert-danger">{{ errors.first('email') }}</span>
            </div>

            <div>
                <input name="password" v-model="user.password" type="password" placeholder="Password" style="margin-bottom: 20px"
                    v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('user.password') }">
                <br>
                <span v-show="errors.has('password')" class="alert alert-danger">{{ errors.first('password') }}</span>
            </div>

            <div>
                <button style="margin-bottom: 20px" class="btn btn-primary">Log in</button> 
            </div>
            <h4>You don't have an account? <router-link to="/signup">Sign Up</router-link><br></h4>
            <hr>
            <div id="firebaseui-auth-container"></div>
        </form>
    </div >
  
</template>

<script>
import firebase from "firebase";
import firebaseui from "firebaseui";

export default {
  name: "login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.login();
        }
      });
    },
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(
          user => {
            alert("User authentication successful");
            this.$router.push({ name: "Home" });
          },
          err => {
            if (err.code === "auth/wrong-password") {
              alert("Wrong password.");
            } else if (err.code === "auth/user-not-found") {
              alert("User not found!");
            } else if (err.code === "auth/invalid-email") {
              alert("Invalid email");
            } else {
              alert("Oops. " + err.message);
            }
          }
        )
        .catch(error => {
          if (error.code === "auth/wrong-password") {
            alert("Wrong password");
          } else {
            alert(error.message);
          }
        });
    },
    loginGoogle() {
      console.log("Google login");
      // Using a popup.
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(
          result => {
            if (result) {
              // This gives you a Google Access Token.
              var token = result.credential.accessToken;
              // The signed-in user info.
              var user = result.user;

              console.log("token: " + token);
              console.log(user);

              this.$router.push("/home");
            }
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
    },
    loginFacebook() {
      console.log("Facebook login");
      var provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope("public_profile");
      provider.setCustomParameters({
        display: "popup"
      });

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(
          result => {
            if (result) {
              // This gives you a Google Access Token.
              var token = result.credential.accessToken;
              // The signed-in user info.
              var user = result.user;

              console.log("token: " + token);
              console.log(user);

              this.$router.push("/home");
            }
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
    }
  },
  mounted() {
    var uiConfig = {
      signInSuccessUrl: "/home",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };

    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>

<style scoped>
.login {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 40%;
  padding: 15px;
}
button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
p {
  margin-top: 20px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>

<style src="firebaseui/dist/firebaseui.css" />

</style>