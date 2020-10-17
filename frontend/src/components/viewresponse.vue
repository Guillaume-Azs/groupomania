<template>
<!--Affichage du fil de discussion-->
    <div id="viewresp">
        <h3>fil de discussion</h3>
        <div  id="resp">
            <div  class="getMessag">
                <div id="messdiv" class="msg"  v-for="mess in msg" :key="mess.idMESSAGES">
                    <p class="nameus">{{mess.username}}</p>  
                    <p class="text">{{mess.message}}</p>
                    <p class="datt">{{moment(mess.created_at).fromNow()}}</p>
                </div>
            </div>
            <h3>Les réponses</h3>
            <div  class="getrespon">
                <div id="resdiv" class="rsp"  v-for="views in view" :key="views.idRESPONSE">
                    <p class="nameus">{{views.username}}</p>  
                    <p class="text">{{views.response}}</p>
                    <p class="datt">{{moment(views.created_at).fromNow()}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

let url = document.location.href;
let idme = url.substring(37, 40);
console.log(idme)

let moment = require('moment')
moment.locale('fr');


export default {
       name:'viewresponse',
    data() {

      return {
        data:JSON.parse(this.$localStorage.getItem('token')),
        message:"",
        msg:"",
        date:"",
        moment: moment,
        view:""

      }
    },
    mounted (){ 
        
        //Appel à l'API du message selectionné 
        axios.get(`http://localhost:3000/api/getonemessage/${idme}`)
        .then(response => {
          console.log(response.data)
          this.msg = response.data
          
        
         
        })
        .catch(error => console.log(error))

        //Appel à l'Api des réponses en rapport au premier message 
        axios.get(`http://localhost:3000/api/getresponse/${idme}`)
        .then(response => {
          console.log(response.data)
          this.view = response.data
          
        
         
        })
        .catch(error => console.log(error))

    },
    methods: {
       
      

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

.rsp{
  border: 1px solid lightgray;
  width: 50%;
  line-height: 15px;
  height:110px;
  position: relative;
  top: 20px;
  margin-right: auto;
  background-color:#21971d;
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
