<template>
<!--Modification du message-->
    <div  id="mur">
      <div  class="getMessag">
        <h3 id="mess">message à modifier</h3>
        <div id="messdiv" class="msg"  v-for="mess in msg" :key="mess.idMESSAGES">
          <p class="nameus">{{mess.username}}</p>  
          <p class="text">{{mess.message}}</p>
          <p class="datt">{{moment(mess.created_at).fromNow()}}</p>
        </div>
      </div>
      <h5>modifier votre message</h5>
      <form id="form" method="POST" class="from-group" @submit.prevent= "updatemessage" >
        <div class="form-group">
          <label for="message">
            <textarea  class="form-control" name="message" id="message" cols="50" rows="5" v-model= "message"></textarea>
          </label>
        </div>
        <input type="file" name="image" id="image" @change="onFileChange">
        <button  type="submit" id="envoi" class="btn btn-primary">Envoyer</button>
      </form> 
    </div> 

</template>

<script>


import axios from 'axios'


let url = document.location.href;
let idme = url.substring(32, 35);
console.log(idme)

let moment = require('moment')
moment.locale('fr');


export default {
    name:'mur',
    data() {

      return {
        data:JSON.parse(this.$localStorage.get('user')),
        message:"",
        msg:"",
        date:"",
        moment: moment,
        idme: idme
        
      }
    },

    mounted (){ 
        
        //Appel à l'Api pour l'affichage du message à modifier 
        axios.get(`http://localhost:3000/api/getonemessage/${idme}`)
        .then(response => {
          console.log(response.data)
          this.msg = response.data
          
        
         
        })
        .catch(error => console.log(error))
    },
    methods: {
      
      updatemessage : function(){//Fonction qui envoi la modification du message au serveur
        let token = this.data.token
        let imess = idme
        if (this.message === ""){
          alert('Vous n\'avez rien écris vous ne pouvez pas envoyé un message vide !')
        } else{
           axios.post('http://localhost:3000/api/updatemessage',
        {
          message: this.message,
          token: this.data.token,
          id: imess

        },{
          headers: {
            'Content-type': 'application/json',
            'Authorization' : `Bearer ${token}`
              }
        })
        .then (() => { 
                    console.log('message modifié')
                    this.message ==="";
                    alert('votre message a bien été modifié !')
                    window.location.href = "http://localhost:8080/#/mur"

                    
       })
       .catch(() =>{
         console.log('le message n\'a pas été modifié')
       }) 
        }
       
      },

      deco: function(){//Déconnection
            if(window.confirm('Voulez-vous vraiment vous déconnecter ?')){
              this.$session.remove('user');
              window.location.href = "http://localhost:8080//#/home";
            } 
      }
    }
}
</script>

<style lang="scss" scoped>

@media screen and (min-width: 300px) and (max-width: 992px){
    .btn-group{
      position: relative;
      margin-left: auto;
      margin-right: auto;
    }
  }

span{
  text-transform: uppercase;
}

.text, .datt{
  color: #FFF;
}

.msg{
  border: 1px solid lightgray;
  width: 50%;
  line-height: 15px;
  height:110px;
  position: relative;
  top: 20px;
  margin-right: auto;
  background-color:#6902ad;
  border-radius: 5px;
  margin-left: auto;
  margin-top: 10px;
  margin-bottom: 80px;
  @media screen and (min-width: 320px) and (max-width: 830px){

  }
}

#mess{
  position: relative;
  top: 20px;
}

.nameus{
  font-size: .8em;
  text-transform: uppercase;
  font-weight: bolder;
  margin-top: 10px;
  color: rgb(240, 210, 136)
}

.datt{
  font-size: 0.7em;
  position: relative;
   text-transform: lowercase;
}

.text{
  position: relative;
  font-size: .9em;
  font-weight: 700;
}



h4{
  position: relative;
  top: 30px;
}

h5{
  margin-top: 40px;
  position: relative;
  bottom: 70px;
  margin-bottom: 50px;
}

#message{
  position: relative;
  bottom: 100px;
}

#envoi{
  position: relative;
  top: 30px;
}

.form-group{
  position: relative;
  top: 150px;
}

#deco{
  text-decoration: none;
}

.btn-circle {
    font-weight: bold;
    font-size: 12px;
    border-radius:10px;
    height:30%;
    margin-right: 10px;
    position: relative;
    margin-bottom: 20px;
    top: 20px;

}
.btn-circle span { padding-right: 0px; }
.embed-responsive { margin-bottom: 10px; }


h5{
  margin-top: 100px;
}

.sup{
  position: absolute;
  left: 570px;
  bottom: 10px;
}

#form{
  position: relative;
  bottom: 150px;
}


</style>