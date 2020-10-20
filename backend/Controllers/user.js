const bcrypt = require('bcrypt');//Cryptage du password
const jwt = require('jsonwebtoken');//Créatio
const db = require('../mysqlconfig');
const dotenv = require("dotenv");
dotenv.config({path: './.env'}); 
const TOKEN = process.env.TOKEN;
const sha1 = require('sha1')
let email;



//Création de la base de donnée
exports.createDataBase = (req, res, next) => {
        let sql = 'CREATE DATABASE Groupomnia';
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result)
            res.send('databse created...')
      });
    };

//Création de la table user 
exports.createDataTable = (req, res) => {
        let tbl = 'CREATE TABLE user  ( id int NOT NULL AUTO_INCREMENT, email varchar(100) NOT NULL, username  varchar(100) NOT NULL,password varchar(250) NOT NULL, isAdmin tinyint NOT NULL DEFAULT 0 ,PRIMARY KEY (id),UNIQUE KEY id_UNIQUE (id),UNIQUE KEY email_UNIQUE (email),UNIQUE KEY username_UNIQUE (username))ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8';
        db.query(tbl, (err, result) => {
            if (err) throw err
            console.log(result)
            res.send('table created !')
        });
    };


//Inscription de l'utilisateur
exports.signup = (req, res, next) => {
    const user = req.body
    // email = user.email
    // let emailhash = sha1(email)
    // user.email = emailhash
     bcrypt.hash(user.password, 10) 
    .then((hash) => {
        user.password = hash
        db.query(`INSERT INTO user SET ?`, user, (err, result, field) => {
            if (err) {
                console.log(err)
                return res.status(400).json("erreur")
            }
            return res.status(201).json({message : 'Votre compte a bien été crée !'},)
        });
    });
};  


//Connexion de l'utilisateur
exports.login = (req, res, next) => {
    const username = req.body.username
	  const password = req.body.password
	if (username && password) {
      db.query('SELECT * FROM user WHERE username= ?', username, (error, results, _fields) => {
           if (results.length > 0) {
            bcrypt.compare(password, results[0].password).then((valid) => {
              if (!valid) {
                res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu' })
              } else {
                console.log(username, "s'est connecté")
                let status = ''
                if (results[0].isAdmin === 1) {
                  status = 'admin'
                } else {
                  status = 'membre'
                }
                res.status(200).json({
                  userId: results[0].id,
                  username: results[0].username,
                  status: status,
                  token: jwt.sign({ userId: results[0].id, status: status },TOKEN,{ expiresIn: '24h' })
                })
                
              }
            })
          } 
          else {
            res.status(401).json({ message: 'Utilisateur ou mot de passe inconnu' })
          }
        }
      )
    } else {
      res.status(500).json({ message: "Entrez votre email et votre mot de passe" })
    }
  }

  //Suppression du compte utilisateur
  exports.deleteUser = (req, res, next) => {
    db.query(
      'DELETE FROM user WHERE id= ?', req.body.userId, (error,result,field) => {
        if (error) {
          console.log(error)
          return res.status(400).json(error)
        }
        console.log('Le compte a bien été supprimé !')
        return res.status(200).json({ message: 'Votre compte a bien été supprimé !' })
        
      }
    )
  }

  //Affichage de tous les utilisateurs
  exports.getUsers = (req, res, next) => {
    db.query(
      'SELECT id, username, isAdmin, email FROM user WHERE isAdmin=0',
      function (error, results) {
        if (error) {
          return res.status(400).json(error)
        }
        return res.status(200).json( results )
      }
    )
  }
  

  //Modification des infotmations utilisateurs
  exports.updateUser = (req, res, next) => {
    const email = req.body.email
    const username = req.body.username
   const id = req.params.id
   let passwords = req.body.password
   bcrypt.hash(passwords, 10) 
    .then((hash) => {
        passwords = hash
      db.query(
        `UPDATE user SET email='${email}', username='${username}', password='${passwords}', isAdmin=${0}  WHERE id=${id}`, (error, results, fields) => {
          if (error) {
            return res.status(400).json(error)
          }
          return res.status(200).json({ message: 'Vos information ont bien été modifié !' })
        }
         
      )

    });
  };
  

  //Affichage de l'utilisateur selectionné
  exports.getOneUser = (req, res, next) => {

    db.query(

      'SELECT id, username, email FROM user WHERE id=?', req.params.id, (error, results) => {
        if (error) {
          return res.status(400).json(error)
        }
        return res.status(200).json( results )
      }
    )

  }