<template>
<!--Composent "Button Admin"-->
<div class="button">
    <div v-if="data.username == 'admin'" id="toggle" class="btn-group dropleft">
        <button type="button" class="btn btn-light btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span>{{data.username}}</span>
        </button>
        <div class="dropdown-menu col-sm">
            <p class="dropdown-item "><span>{{data.username}}</span></p>
            <div class="dropdown-divider"></div>
             <router-link id="mur" to="/mur">Retour au mur</router-link>
            <div class="dropdown-divider"></div>
            <router-link id="admin" to="/dashadmin">DashBoard</router-link>
            <div class="dropdown-divider"></div>
            <button  @click= "deco" id="deco">Se déconnecter</button>
        </div>
    </div>
</div>
    
</template>

<script>



export default {
    name: 'buttonadmin',
    data(){

    return {
        data:JSON.parse(this.$localStorage.get('user')),
        userId:""
    }
},
methods:{
         deco: function(){
            if(window.confirm('Voulez-vous vraiment vous déconnecter ?')){
              this.$localStorage.remove('user');
              window.location.href = "http://localhost:8080//#/home";
              location.reload(true);
            } 
      },

      togglebutton : function(){

          if(this.data.status !== 'admin'){
              document.getElementById('toggle').style.display = 'none';
          }
      },
}

}

</script>

<style lang="scss" scoped>

span{
    text-transform: uppercase;
}


button{
    margin-bottom: 10px;
}

.btn-group{
  position: absolute;
  left:1160px;
  top: 40px;
  @media screen and  (min-width: 320px) and (max-width:500px) {
      left:40%;
      top: 10%;
      z-index: 10;  
  }
   @media screen and  (min-width: 501px) and (max-width:768px) {
      left:45%;
      top: 7.5%;
      z-index: 10;
      
  }
   @media screen and  (min-width: 769px) and (max-width:992px) {
      left:47%;
      top: 20%;
      z-index: 10;
      
  }

      
  }


#mur,#admin, #deco{
  position: relative;
  left: 15px;
}


</style>
