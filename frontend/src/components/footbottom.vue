<template>
  <!--Footer-->
  <div class="containerfooter">
    <footer class="page-footer font-small special-color-dark pt-4">
      <div class="container">
        <div id="foot" class="footer-copyright text-center py-3">
          © 2020 Copyright:
          <a href="https://groupomania.com/">Groupomania</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "footbottom"
};
</script>

<style lang="scss" scoped>
.containerfooter {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
}

footer {
  background-color: #18294c;

  @media screen and (min-width: 320px) and (max-width: 830px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}

a {
  color: #fff;
}

a:hover {
  color: #fff;
}

#foot {
  position: relative;
  bottom: 10px;
  color: #fff;
}
</style>
