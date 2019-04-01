'use strict'

var Proyect = require('../models/proyect');
var fs = require('fs');

var controller = {
	home: function(req, res){
		return res.status(200).send({
			message: 'Home'
		});

	},

	test: function(req, res){
		return res.status(200).send({
			message: 'controlador proyecto'
		});

	},

	saveProyect: function(req, res){
		var proyect = new Proyect();

		var params = req.body;
		proyect.Valor_Mercado = params.Valor_Mercado;
		proyect.Tipo = params.Tipo;
		proyect.Valor_Compra = params.Valor_Compra;
		proyect.Edad = params.Edad;
		proyect.Edad_Maxima = params.Edad_Maxima;

		proyect.save((err, proyectStored) => {
			if(err) return res.status(500).send({message: 'error a guardar los datos'});

			if(!proyectStored) return res.status(404).send({message: 'no se ha podido guardar los datos'});

			return res.status(200).send({proyect: proyectStored});

		});

	},

	getProyect: function(req, res){
		var proyectId = req.params.id;

		if(proyectId == null) return res.status(404).send({message: 'el proyecto no existe'});

		Proyect.findById(proyectId, (err, proyect) =>{
			if(err) return res.status(500).send({message: 'error al  devolver los datos'});
			if(!proyect) return res.status(404).send({message: 'el proyecto no existe'});

			return res.status(200).send({
				proyect 
			});

		});
	},

	//este metodo es para obtener un listado de los objetos alojados en la database
	getProyects: function (req, res) {
		Proyect.find({}).sort().exec((err, proyects) =>{

			if(err) return res.status(500).send({message: 'error al devolver los datos'});
			if(!proyects) res.status(404).send({message: 'no hay proyectos para mostar'});

			return res.status(200).send({proyects});


		});
		
	},

	updateProyect: function(req, res){

		var proyectId = req.params.id;
		var update = req.body;

		Proyect.findByIdAndUpdate(proyectId, update,{new:true},(err, proyectUpdated) => {

			if(err) return res.status(500).send({message:'error al actualizar'});
			if(!proyectUpdated) return res.status(404).send({message:'no se existe el proyecto para actualizar'});

			return res.status(200).send({
				proyect: proyectUpdated
			});

		});
	},

	deleteProyect: function(req, res){
		var proyectId = req.params.id;

		Proyect.findByIdAndRemove(proyectId, (err, proyectRemoved)=>{
			if(err) return res.status(500).send({message:' no se ha podido borrar el proyecto'});
			if(!proyectRemoved) return res.status(404).send({message: 'no se puede eliminar ese proyecto'});

			return res.status(200).send({
				proyects: proyectRemoved
			});

		});
	},

	uploadImage: function(req, res){

		var proyectId = req.params.id;
		var fileName = 'Imagen no subida...';

		if(req.files){
			var filePath = req.files.image.path;
			var fileSplit = filePath.split('\\');
			var fileName = fileSplit[1];
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];

			if(fileExt =='png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
				Proyect.findByIdAndUpdate(proyectId,{image: fileName}, {new:true},(err, proyectUpdated)=>{

				if(err) return res.status(500).send({message:'la imagen no se ha subido'});
				if(!proyectUpdated) return res.status(404).send({message: 'el proyecto no existe'});

				return res.status(200).send({
					proyect:proyectUpdated
				});

			});

			}else{
				fs.unlink(filePath,(err)=>{
					return res.status(500).send({message:'la extencion no es valida'});
				});
			}

		}else{
			return res.status(200).send({
				message: fileName
			});
		}
	}
};

module.exports = controller;
