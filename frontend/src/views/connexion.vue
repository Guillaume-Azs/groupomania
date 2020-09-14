<template>
  <div class="connexion">
    <connexion></connexion>
    <footbotoom></footbotoom>
  </div>
</template>

<script>


import connexion from '../components/connexion.vue'
import footbottom from '../components/footbottom.vue'

export default{
  name: 'connexions',
  components:{
    'connexion' : connexion,
    'footbotoom' : footbottom
  }
}
</script>

<style lang="scss" scoped>
  
</style>
