'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProyectSchema = Schema({
	Valor_Mercado: Number,
	Tipo: Number,
	Valor_Compra: Number,
	Edad: Number,
	Edad_Maxima: Number
});

module.exports = mongoose.model('Proyect', ProyectSchema);
//proyects --> guarda los documentos en la coleccion en la db