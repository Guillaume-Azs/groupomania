<template>
  <div class="about">
    <inscription></inscription>
    <footbottom></footbottom>
  </div>
</template>

<script>


import inscription from '../components/inscription.vue'
import footbottom from '../components/footbottom.vue'

export default{
  name: 'inscriptions',
  components:{
    'inscription' : inscription,
    'footbottom' : footbottom
  }
}
</script>

<style lang="scss" scoped>
  
</style>
