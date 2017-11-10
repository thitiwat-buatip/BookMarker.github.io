<template>
    <div>
        <nav class="navbar">
        <div class="container-fluid">
            <ul class="nav navbar-nav">
            <li role="presentation"><router-link to="/home">Profile</router-link></li>
            <li role="presentation"><router-link to="/bookmarker">Bookmarks</router-link></li>
            <li role="presentation"><router-link to="/about">About</router-link></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
            <li role="presentation" ><button type="button" class="btn btn-danger" @click="logout">Sign Out</button></li>
            </ul>
        </div>
        </nav>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Header",
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    }
  }
};
</script>
