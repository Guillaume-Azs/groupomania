<template>
<!--Espace personnel utilisateur-->
    <div id="moncompte" >
        <h2>Mon espace</h2>
        <div class="layout">
            <h3>Vos Informations personnelles</h3>
            <h4 id="pseudo">Votre pseudo</h4>
            <div classe=info  v-for="usr in user" :key="usr.userId">
                <p id="myname" class="allp"><span>{{usr.username}}</span></p>
                <h4>Votre identifiant</h4>
                <p class="allp">{{data.userId}}</p>
                <h4>Votre email</h4>
                <p class="allp">{{usr.email}}</p>
                <h4> Votre status</h4>
                <p class="allp" id="last">{{data.status}}</p>
                <button @click= "updateuser" class="btn btn-success suc">Modifer vos information</button>
                <button @click= "deleteUser" class="btn btn-danger sup">Supprimer votre compte</button>
            </div>   
        </div>
    </div>
    
</template>

<script>

import axios from 'axios'


export default {
    name: 'moncompte',
    data(){

    return {
        data:JSON.parse(this.$localStorage.get('user')),
        userId:"",
        user:""
    }
},
mounted(){
    //Appel de l'api pour l'affichafe des informations de l'utilisateur
    let data = JSON.parse(this.$localStorage.get('user'))
     axios.get(`http://localhost:3000/api/getoneuser/${data.userId}`)
        .then(response => {
          console.log(response.data)
          this.user = response.data
        
         
        })
        .catch(error => console.log(error)) 

},
methods:{

    deleteUser : function () {//Fonction qui permet à l'utilisateur de supprimer son compte 
        let token = this.data.token
        if(confirm('Voulez vous vraiment supprimer le compte ?'),confirm('Cette opération est irreversible !')){
             axios.post(`http://localhost:3000/api/deleteUser`, {
                 userId: this.data.userId
        },
        {
          headers: {
            'Content-type': 'application/json',
            'Authorization' : `Bearer ${token}`
              }
        })
       .then (() => { 
                    this.$localStorage.remove('user')
                    document.getElementById('moncompte').style.display = 'none'
                    alert('votre compte a bien été supprimé !')
                    window.location.href = " http://localhost:8080//#/home"
                    
       })
       .catch(() =>{
         console.log('Votre compte n\'a pas pu être supprimé !')
       }) 
        }
    },

         deco: function(){// Fonction qui permet à l'utilisateur de se déconnecter
            if(window.confirm('Voulez-vous vraiment vous déconnecter ?')){
              this.$localStorage.remove('user');
              window.location.href = " http://localhost:8080//#/home";
              location.reload(true);
            } 
      },

      updateuser : function() {//Fonction qui permet à l'utilisateur de modifier ses informations

          let iduser = this.data.userId

         window.location.href = `http://localhost:8080//#/updateuser?id=${iduser}`
         location.reload(true);


      }
}


}

</script>

<style lang="scss" scoped>

h2{
    position: relative;
    top: 5px;
    margin-bottom: 10px;
    @media screen and (max-width: 1024px) {
        font-size: 1.8em;
        bottom:30px;
    }
}

span{
    text-transform: uppercase;
}

.layout{
    border: 1px solid gray;
    border-radius: 5%;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    background-color: rgb(235, 235, 235);
    margin-bottom: 100px;
}

h3{
    font-size: 1.3em;
    position: relative;
    top: 10px;
    @media screen  and (min-width: 300px) and (max-width:600px) {
        font-size: .9em;
    }
}

p{
    font-size: 1.1em;
    position: relative;
    top: 10px;
    @media screen  and (min-width: 300px) and (max-width:600px) {
        font-size: .7em;
    }
    
}

.suc{
    margin-right: 10px;
}

h4{
    font-size: 1.2em;
    position: relative;
    top: 10px;
    margin-top: 0px;
    margin-bottom: 10px;
    @media screen  and (min-width: 300px) and (max-width:600px) {
        font-size: .8em;
    }
}

#pseudo{
position: relative;
top: 30px;
margin-bottom: 10px;
}

#myname{
position: relative;
top: 30px;
margin-bottom: 40px;
}

.allp{
    border: 1px solid black;
    width: 50%;
    border-radius: 10%;
    margin-left: auto;
    margin-right: auto;
    background-color:rgb(66, 3, 107);
    color: #FFF;
}

#last{
    position: relative;
    margin-bottom: 40px;
}
button{
    margin-bottom: 10px;
     @media screen  and (min-width: 300px) and (max-width:600px) {
        font-size: .8em;
    }
}

</style>
