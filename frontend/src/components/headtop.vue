<template>
  <!--Header-->
  <div class="home" id="hom">
    <nav id="navv">
      <img
        id="icon"
        alt="logo de l'entreprise"
        src="../assets/icon-left-font-monochrome-white.svg"
      />
      <buttondeco></buttondeco>
    </nav>
  </div>
</template>

<script>
import buttondeco from "./buttondeco.vue";

export default {
  name: "headtop",
  components: {
    buttondeco: buttondeco
  }
};
</script>

<style lang="scss" scoped>
#routhome {
  text-decoration: none;
  font-size: 2.4em;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  right: 60px;
  text-align: center;
  font-weight: 500;
  color: #fff !important;
  @media screen and (max-width: 1024px) {
    font-size: 1.8em;
    right: 20px;
  }
}

#navv {
  height: 70px;
  background-color: #18294c;
}

#droplink {
  text-align: center;
}

#icon {
  width: 20%;
  margin-top: 20px;
}

#navbarDropdown {
  @media screen and (min-width: 1024px) {
    color: #fff;
  }
  position: relative;
}
#navv {
  height: 70px;
}

#ulnav {
  display: flex;
}

#linav {
  margin-left: 950px;
}

#toggleButton {
  background-color: lightblue;
  color: #a2b0be;
}

.dropdown-item:hover {
  background-color: #0f2236;
  color: #fff;
}

@media screen and (min-width: 319px) and (max-width: 1024px) {
  .drop-item {
    background-color: #cedae7;
  }
  #linav {
    color: #000;
    margin-left: 0px;
  }

  .dropdown-item {
    text-align: center;
  }

  .navbarDropdown {
    color: #000;
  }
}
</style>
