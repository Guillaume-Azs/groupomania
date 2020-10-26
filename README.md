:computer: # groupomania
Création réseau social

Les fonctionnalités importantes :

- mis en ligne d'un gif + un message
- répondre / modifier / supprimer le message
- modifier / supprimer un compte
- identifier / créer un compte
- création d'un compte admin pour gérer les utilisateurs (gestion avec mysql pour le changement)

cloner le repository : https://github.com/Guillaume-Azs/groupomania.git
 

Ensuite rendez-vous dans le dossier Groupomania à l'aide du terminal ou de l'invite de commande :

cd Groupomania


______________________________________________


* Backend: 

Connectez vous à mysql avec vos identifiants et mot de passe habituels, une fois connecté il faut créer la base de donnée Groupomania :

commande sql : CREATE DATABASE Groupomania;

COMMANDE SQL POUR CREATION TABLE user :

CREATE TABLE user  ( id int NOT NULL AUTO_INCREMENT, 
email varchar(100) NOT NULL, 
username  varchar(100) NOT NULL,
password varchar(250) NOT NULL, 
isAdmin tinyint NOT NULL DEFAULT 0 ,
PRIMARY KEY (id),UNIQUE KEY id_UNIQUE (id),
UNIQUE KEY email_UNIQUE (email),
UNIQUE KEY username_UNIQUE (username))ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

______________________________________________

COMMANDE SQL POUR CREATION TABLE messages :

CREATE TABLE messages (idMESSAGES int AUTO_INCREMENT,
`idUSERS` int NOT NULL,
 message text NOT NULL,
`username` varchar(100) NOT NULL,
`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, 
 PRIMARY KEY (idMESSAGES),
 FOREIGN KEY (`idUSERS`) REFERENCES `user` (`id`) ON DELETE CASCADE)ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8;
 
______________________________________________

 
COMMANDE SQL POUR CREATION TABLE responses :
 
 CREATE TABLE responses (idRESPONSE int AUTO_INCREMENT,
 idMESSAGES int NOT NULL,
 `idUSERS` int NOT NULL, 
 response text NOT NULL,
 `username` varchar(100) NOT NULL,
 `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (idRESPONSE), 
 FOREIGN KEY (`idUSERS`) REFERENCES `user` (`id`) ON DELETE CASCADE)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
 
 
 #########################################
 

dans le terminal (ou l'invite de commande )
lancer la commande : cd backend

Puis lancer la commande suivante :
     
    1)npm install 
   
    
 Création d'un fichier .env :
 
   NAME = 'Mysql username'

   PASS = 'Mysql password'

   HOST = 'localhost'

  TOKEN = 'créer votre propre token  '
  
  
  Installer ensuite nodemon : 

       2)npm install -g nodemon


une fois toute ces étapes réalisés lancer la commande :
    
    3)nodemon server
    
   
   
Le serveur backend est à present fonctionnel 
    
    
#########################################



* Frontend:

 se rendre dans le dossier frontend : cd frontend

et lancer la commande suivante :

    npm install
     
 une fois l'installation terminé lancer la commande :    
     
    npm run serve
    
 ##########################
 
 Pour créer un compte admin :
 
 Créer un compte normal en vous inscrivant sur l'application 
 
 ensuite dans la base de données sql taper la commande sql suivante :
 
 
 UPDATE user
 SET isAdmin = ‘1’
 WHERE id = ‘(l’id du compte à transformer en admin)’;


Par défaut le serveur client est accessible en local via le port 8080: http://localhost:8080/

Bonne navigation !
