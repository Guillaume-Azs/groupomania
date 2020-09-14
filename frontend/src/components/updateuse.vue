<template>
<!--Modification des informations utilisateurs-->
    <div id="updateuse">
        <h2>Modifier mes information</h2>
        <h3>Important ! : Pour les champs que vous ne voulez pas modifier veuillez entrer les informations déjà enregistrées</h3>
        <form method="POST" @submit.prevent = "changeuser">
            <div class="form-group col-lg-3 col-sm-6">
            <label for="email">Votre email</label>
            <input type="email" class="form-control" name=""  value="" id="email" pattern="[a-zâäàéèùêëîïôöçñA-Z0-9.-_]+[@]{1}[a-zA_Z0-9.-_]+[.]{1}[a-z]{2,4}" v-model="email" :placeholder="data.email">
            <small id="emailHelp" class="form-text text-muted"></small>
            </div>
            <div class="form-group col-lg-3 col-sm-6">
            <label for="username"> Nouveau pseudo</label>
            <input type="text" class="form-control" name="" value="" id="username" pattern="[a-zâäàéèùêëîïôöçñA-Z-0-9\s]{3,25}" v-model="username" :placeholder="data.username">
            <small id="pseudo" class="form-text text-muted"></small>
            </div>
            <div class="form-group col-lg-3 col-sm-6">
            <label for="password">Nouveau Mot de passe</label>
            <input type="password" v-on:focus="showdiv" v-on:blur="maskdiv" class="form-control" name="" value="" id="password"  pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})" v-model="password">
            </div>
            <div class="form-group col-lg-3 col-sm-6">
            <label for="password2"> Confirmez le nouveau mot de passe</label>
            <input type="password" v-on:blur="verif" class="form-control" name="" value="" id="password2"  pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})" v-model="password2">
            <small id="confirm" class="text-danger"></small>
            </div>
            <button  type="submit" class="btn btn-primary">Modifier</button>
        </form>
        <div id="showfocus">
        <h4>Votre mot de passe doit contenir:</h4>
        <ul>
          <li>de 8 à 15 caractères</li>
          <li>au moins une lettre minuscule</li>
          <li>au moins une lettre majuscule</li>
          <li>au moins un chiffre</li>
          <li>au moins un de ces caractères spéciaux: $ @ % * + - _ !</li>
          <li>aucun autre caractère possible: pas de & ni de { par exemple)</li>
        </ul>
      </div>
    </div>
    
</template>

<script>

let url = document.location.href;
let id = url.substring(39, 42);



import axios from 'axios'

export default {
    name: 'updateuse',
    data(){
      return{
        data:JSON.parse(this.$localStorage.get('user')),
        userId:"",
        email:"",
        username:"",
        password:"",
        password2:"",
        id: id   
       }
    },
    methods:{
      changeuser : function () {//Fonction qui envoi les changements de l'utilisateur au serveur
        let token = this.data.token
        if (this.email == "" || this.username == "" || this.password == ""  ){
          alert('Veuillez remplir tous les champs avant d\'envoyer le formulaire !')
        }else if (this.password != this.password2){
          alert('Les deux mots de passe ne sont pas identiques !')
        }else {
        axios.post(`http://localhost:3000/api/updateuser/${id}`, {
          email: this.email,
          username: this.username,
          password: this.password,
        },
        {
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer${token}`
              }
        })
       .then (() => {
         console.log('vos informations ont bien été modifiées !')
         alert('vos informations ont bien été modifiées !')
         window.location.href = "http://localhost:8080//#/compte"
         })
       .catch(() => console.log('Les informations n\'ont pas été modifées une erreur est survenue')) 
        }
        
        
      },
       deco: function(){//Déconnection
            if(window.confirm('Voulez-vous vraiment vous déconnecter ?')){
              this.$localStorage.remove('user');
              window.location.href = " http://localhost:8080//#/home";
            }
    },
     showdiv: function() {//Affichage de l'encadré qui aide l'utilisateur à choisir son password
        document.getElementById('showfocus').style.display = 'block';
      },

      maskdiv: function() {//Masquage de l'encadré précédent
        document.getElementById('showfocus').style.display = 'none';
      },
      verif: function() {//Vérification du mot de passe
        if (this.password != this.password2){
          document.getElementById('confirm').innerHTML = 'Veuillez entrer le même mot de passe'
        } else {
          document.getElementById('confirm').innerHTML = ''
        }
      } 
    }

}
</script>



<style lang="scss" scoped>

h2{
    position: relative;
    top: 5px;
    margin-bottom: 40px;
    @media screen and (max-width: 1024px) {
        font-size: 1.8em;
        bottom:30px;
    }
}

h3{
    color: red;
    font-size: 1.1em;
}

#from{
  height: 100%;
  margin-bottom: 200px;
  padding-bottom: 100px;
  margin-left:auto;
  margin-right:auto;
}

form{
  padding-bottom: 50px;
  position: relative;
  top: 240px;

}


#showfocus{
  display: none;
  border: 1px solid black;
  position: relative;
  bottom: 300px;
  left: 800px;
  width:35%;
  @media screen and (max-width: 1024px) {
  bottom: 170px;
  left: 20px;
  width:85%;
  }
}

.form-group{
  position: relative;
  bottom: 195px;
  margin-right: auto;
  margin-left: auto;
}

button{
  position: relative;
  bottom: 200px;
  
}

</style>
