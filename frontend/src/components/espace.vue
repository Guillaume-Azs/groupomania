<template>
  <!--Barre latérales de navigation-->
  <nav id="navv" class="navbar navbar-expand-lg navbar-light bg-primary">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto flex-column vertical-nav">
        <li class="nav-item">
          <router-link class="dropdown-item" to="/home">Accueil</router-link>
        </li>
        <div id="change">
          <router-link class="dropdown-item" to="/inscription"
            >Inscription</router-link
          >
          <router-link class="dropdown-item" to="/connexion"
            >Connexion</router-link
          >
        </div>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "espaces",
  data() {
    return {
      data: JSON.parse(this.$localStorage.get("user")), //Information utilisateur dans le localStorage
      toggle: ""
    };
  },
  mounted() {
    //Masquage des menus "Inscription" et "Connexion" lorsque l'utilisateur est connecté
    let user = JSON.parse(this.$localStorage.get("user"));
    let change = document.getElementById("change");
    if (user !== null) {
      change.style.display = "none";
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.dropdown-item {
  color: #fff;
}

@media (min-width: 810px) {
  .vertical-nav {
    position: fixed;
    top: 45px;
    left: 0;
    width: 155px;
    height: 100%;
    background-color: #a34259;
    overflow-y: auto;
    padding-top: 100px;
  }
}
@media screen and (min-width: 810px) and (max-width: 840px) {
  .navbar-toggler {
    position: relative;
    right: 10px;
  }
}
</style>
