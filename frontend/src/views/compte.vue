<template>
  <div class="compte">
    <moncompte></moncompte>
    <footbottom></footbottom>
  </div>
</template>

<script>


import moncompte from '../components/moncompte.vue'
import footbottom from '../components/footbottom.vue'


export default{
  name: 'comptes',
  components:{
    
    'moncompte' : moncompte,
    'footbottom' : footbottom
   
  }
}
</script>

<style lang="scss" scoped>

</style>
