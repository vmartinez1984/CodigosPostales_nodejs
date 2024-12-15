const mongoose = require("mongoose");

zipCodeModel = {
  Id:Number,
  CodigoPostal: String,
  Estado: String,
  EstadoId: Number,
  Alcaldia: String,
  AlcaldiaId: Number,
  TipoDeAsentamiento: String,
  Asentamiento: String,
};

zipCodeSchema = new mongoose.Schema(zipCodeModel);

const zipCodeRepository = mongoose.model(
  "CodigosPostales",
  zipCodeSchema,
  "CodigosPostales" //Nombre de la collecion
);

module.exports = zipCodeRepository;
