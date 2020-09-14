<template>
    <div class="mur">
        <mur></mur>
        <buttonadmin></buttonadmin>
        <footbottom></footbottom>
    </div>
</template>

<script>



import mur from '../components/mur'
import buttonadmin from '../components/buttonadmin.vue'
import footbottom from '../components/footbottom.vue'


export default {
    name: 'murs',
  components:{
    'mur' : mur,
    'buttonadmin': buttonadmin,
    'footbottom' : footbottom
  }
}




</script>

<style lang="scss" scoped>


</style>
