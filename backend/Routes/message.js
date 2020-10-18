const express = require('express');
const router = express.Router();
const messageCtlr = require('../Controllers/message');
const auth = require('../middelware/auth');
const multer = require('../middelware/multer-config');

//Routes pour les messages

router.get('/createtable', messageCtlr.createmessageTable)
router.get('/createreponse', messageCtlr.createresponsetable)
router.post('/postmessage', multer, messageCtlr.postmessage);
router.get('/getmessages', multer, messageCtlr.getMessages);
router.get('/getonemessage/:id', messageCtlr.getoneMessage);
router.post('/deletemessage',auth, messageCtlr.deleteMessage);
router.post('/updatemessage',auth, messageCtlr.updateMessage);
router.post('/responsemessage', messageCtlr.responseMessage);
router.get('/getresponse/:id', messageCtlr.getResponse);
router.get('/getallresponses', messageCtlr.getAllResponses);
router.post('/deleteresponse', messageCtlr.deleteResponse);

module.exports = router;