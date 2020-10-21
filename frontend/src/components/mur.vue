<template>
  <!--Mur-->
  <div id="mur">
    <div class="bienvenu" v-for="usr in user" :key="usr.userId">
      <h2>
        Bienvenue
        <span>{{ usr.username }}</span
        >!
      </h2>
    </div>
    <div class="getMessag">
      <h3 id="mess">Les messages</h3>
      <div id="messdiv" class="msg" v-for="mess in msg" :key="mess.idMESSAGES">
        <p class="nameus">{{ mess.username }}</p>
        <p class="text">{{ mess.message }}</p>
        <img :src="'http://localhost:3000/tmp/' + mess.image" alt="image">
        <p class="datt">{{ moment(mess.created_at).fromNow() }}</p>
        <div class="buttoon">
          <button @click= "updatemess(mess.idMESSAGES)" v-if="data.username == mess.username || data.status =='admin'" type="button" class="btn btn-success btn-sm mod">modifier</button>
        <button
          @click="deletemess(mess.idMESSAGES)"
          v-if="data.username == mess.username || data.status == 'admin'"
          type="button"
          class="btn btn-danger btn-sm sup"
          id="icon"
        >
          <font-awesome-icon icon="trash"/>
        </button>
        <button
          @click="response(mess.idMESSAGES)"
          class="btn btn-danger btn-circle text-uppercase bt"
          id="reply"
        >
          <span class="glyphicon glyphicon-share-alt"></span>Repondre
        </button>
        <button
          @click="view(mess.idMESSAGES)"
          class="btn btn-warning btn-circle text-uppercase bt"
          id="voir"
          data-toggle="collapse"
          href="#/viewresponse"
        >
          <span class="glyphicon glyphicon-comment"></span>
          Voir les réponses
        </button>
        </div>
      </div>
    </div>
    <form
      id="formtog"
      method="POST"
      class="from-group"
      @submit.prevent="sendMessage"
      enctype="multipart/form-data"
    >
      <div class="form-group">
        <label class="messa" for="message">
          
        </label>
        <textarea
          class="form-control"
          name="message"
          id="message"
          cols="30"
          rows="5"
          v-model="message"
        >
        </textarea>
      </div> 
      <div class="button">
        <input type="file" @change="onFileChange" id="image" name="image" accept="image/png, image/jpeg, image/gif"/>
        <button type="submit" id="envoi" class="btn btn-danger">
          Envoyer
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

let moment = require("moment");
moment.locale("fr"); //Appel du module moment.js pour affichage à quel moment le message a été écris

export default {
  name: "mur",
  data() {
    return {
      data: JSON.parse(this.$localStorage.get("user")),
      message: "",
      msg: "",
      date: "",
      moment: moment,
      imess: "",
      update: "",
      user: "",
      gifFile: "",
    };
  },
  mounted() {
    //Appel à l'api pour l'affichage de tous les messages
    axios
      .get("http://localhost:3000/api/getmessages")
      .then(response => {
        this.msg = response.data;
      })
      .catch(error => console.log(error));

    let data = JSON.parse(this.$localStorage.get("user"));
    //Appel à l'Api pour l'affichage des informations utilisateurs
    axios
      .get(`http://localhost:3000/api/getoneuser/${data.userId}`)
      .then(response => {
        this.user = response.data;
      })
      .catch(error => console.log(error));
  },
  methods: {
    sendMessage: function() {
      //Fonction qui permet d'envoyer un message
      let token = this.data.token;
      let idUSERS = this.data.userId;
      let userName = this.data.username;
      if (this.message.length === 0) {
        alert(
          "Vous n'avez rien écris vous ne pouvez pas envoyé un message vide !"
        );
      } else {
        axios
          .post(
            "http://localhost:3000/api/postmessage",
            {
              message: this.message,
              token,
              idUSERS,
              username: userName,
              image: this.gifFile,
            },
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(() => {
            this.message === "";
            alert("votre message a bien été envoyé !");
            location.reload(true);
          })
          .catch(() => {
            console.log("le message n'a pas été envoyé");
          });
      }
    },
  onFileChange: function(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (files.length === 0) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.gifFile = reader.result
      }
    },
    deco: function() {
      //Déconnection
        this.$session.remove("user");
        window.location.href = "http://localhost:8080/#/home";
    },

    deletemess: function(delid) {
      //Fonction qui permet à l'utilisateur de supprimer un message
      let token = this.data.token;
      let idmess = delid;

      if (
        confirm("êtes vous sûr de vouloir supprimer ce message ?") &&
        confirm("cela effacera définitivement le message")
      ) {
        axios
          .post(
            "http://localhost:3000/api/deletemessage",
            {
              id: idmess
            },
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(() => {
            alert("votre message a bien été supprimé");
            location.reload(true);
          })
          .catch(() => {
            console.log("le message n'a pas été supprimé !");
          });
      }
    },
    updatemess: function (idmess) {//Fonction qui permet à l'utilisateur de modifié un message
         
         let imess = idmess
         window.location.href = `http://localhost:8080/#/res?id=${imess}`
         location.reload(true);
       },

    response: function(idmess) {
      //Fonction qui permet à l'utilisateur de répondre à un message posté

      let irep = idmess;

      window.location.href = `http://localhost:8080/#/reponses?id=${irep}`;
      location.reload(true);
    },

    view: function(idmess) {
      let iview = idmess;

      window.location.href = `http://localhost:8080/#/viewresp?id=${iview}`;
      location.reload(true);
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 300px) and (max-width: 992px) {
  .btn-group {
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }
}

h2 {
  position: relative;
  top: 30px;
  display: inline;
  background-color: #18294c;
  color: white;
  border-radius: 2%;
  border: 2px solid #a34259;
}
h5 {
  margin-top: 10px;
}

span {
  text-transform: uppercase;
}
img {
  height: 80px;
}
.form-control {
  width: 50%;
  margin: 0 auto;
  margin-top: 100px;
}
.form-group {
  height: 170px;
  margin-top: 40px;
}

.text,
.datt {
  color: #fff;
}
.messa {
  margin-top: 10px;
}
.bienvuenu {
  position: relative;
}

.msg {
  border: 1px solid lightgray;
  width: 70%;
  line-height: 15px;
  height: 200px;
  position: relative;
  top: 70px;
  margin-right: auto;
  background-color: #392546;
  border-radius: 5px;
  margin-left: auto;
  margin-top: 10px;
  margin-bottom: 80px;
  @media screen and (min-width: 600px) and (max-width: 830px) {
    width: 100%;
    height: 250px;
  }
  @media screen and (min-width: 300px) and (max-width: 600px) {
    width: 100%;
    height: 250px;
  }
}

#mess {
  position: relative;
  top: 50px;
}

.nameus {
  font-size: 0.8em;
  text-transform: uppercase;
  font-weight: bolder;
  margin-top: 10px;
  color: rgb(240, 210, 136);
}

.datt {
  font-size: 0.7em;
  position: relative;
  text-transform: lowercase;
}

.text {
  position: relative;
  font-size: 0.9em;
  font-weight: 700;
}

h4 {
  position: relative;
  top: 30px;
}

h5 {
  margin-top: 40px;
  position: relative;
  top: 70px;
  margin-bottom: 50px;
}

#message {
  position: relative;
  bottom: 100px;
  margin-bottom: 70px;
}

#envoi {
  position: relative;
  height: 50px;
  margin-top: 20px;
}

#deco {
  text-decoration: none;
}

.btn-circle {
  font-weight: bold;
  font-size: 12px;
  border-radius: 10px;
  height: 30%;
  margin-right: 10px;
  position: relative;
  margin-bottom: 0px;
  top: 5px;
}
.btn-circle span {
  padding-right: 0px;
}
.embed-responsive {
  margin-bottom: 10px;
}

h5 {
  margin-top: 100px;
}
#modif {
  margin-right: 0;
}


.sup {
  position: absolute;
  left: 570px;
  bottom: 10px;
  @media screen and (min-width: 500px) and (max-width: 600px) {
    position: relative;
    left: 305px;
    bottom: 40px;
  }
  @media screen and (min-width: 300px) and (max-width: 500px) {
    position: relative;
    left: 155px;
    bottom: 40px;
  }
}

.mod {
  position: relative;
  bottom: 50px;
  right: 0px;
  @media screen and (min-width: 320px) and (max-width: 600px) {
    position: relative;
    right: 0px;
    bottom: 50px;
  }
}
.button {
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
}
.getMessag {
  margin-bottom: 180px;
}
#image {
  margin-top: 30px;
  margin-left: 20px;
}
@media screen and (min-width: 450px) and (max-width: 500px) {
  #reply {
    height: 40px;
    margin-bottom: 50px;
  }

  #voir {
    font-size: 10px;
    margin-bottom: 50px;
    width: 20%;
    height: 40px
  }
  #icon {
    margin-left: 100px;
    margin-bottom: 50px;
    margin-top: 40px;
  }
  .buttoon {
    display: flex;
    height: 45px;
  }
  .sup {
    left: 250px;
    height: 30px;
  }
  .msg {
    width: 100%;
  }
  template {
    width: 100%;
  }
  .button {
    display: block;
  }
}
@media screen and (min-width: 0px) and (max-width: 300px) {
  .sup {
    left: 210px;
  }
  .msg {
    width: 100%;
  }
  .button {
    display: block;
  }
}
</style>