'use strict'

var express = require('express');
var ProyectController = require('../controllers/proyect');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});

router.get('/home', ProyectController.home);
router.post('/test', ProyectController.test);
router.post('/save-proyect', ProyectController.saveProyect);
router.get('/proyect/:id?', ProyectController.getProyect);
router.get('/proyects', ProyectController.getProyects);
router.put('/proyect/:id', ProyectController.updateProyect);
router.delete('/proyect/:id', ProyectController.deleteProyect);
router.post('/upload-image/:id',multipartMiddleware, ProyectController.uploadImage);

module.exports = router;