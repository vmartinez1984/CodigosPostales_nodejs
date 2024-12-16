const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const zipCodeRepository = require("../repositories/zipCodeRepository");

router.get("/api/Tests/HolaMundo", (req, res) => {
  console.log("Hola mundo, Códigos postales");
  if(req.query.saludo == undefined)
    mensaje = "Hola mundo, Códigos postales";
  else
    mensaje = req.query.saludo
  res.status(200).json({ mensaje: mensaje, "fecha": new Date() });  
});

/**
 * Código postal Aleatorio
 */
router.get("/api/CodigosPostales/Aleatorio", async (req, res) => {
  try {
    //console.log("Código postal Aleatorio");
    const total = await zipCodeRepository.count();
    //console.log(total);
    var random = Math.floor(Math.random() * total);
    //console.log(random);
    var codigosPostales = await zipCodeRepository.find({ Id: random });

    delete codigosPostales[0]["_id"]
    res.status(200).json(codigosPostales[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error");
  }
});

/**
 * Aleatorio de un estado
 */
router.get(
  "/api/codigosPostales/estados/:estado/Aleatorio",
  async (req, res) => {
    try {
      let codigoPostal;
      const total = await zipCodeRepository.count();
      do {
        var random = Math.floor(Math.random() * total);
        var codigosPostales = await zipCodeRepository.find({ Id: random });
        if (codigosPostales[0].EstadoId != req.params.estado)
          codigoPostal = null
        else codigoPostal = codigosPostales[0]
      } while (codigoPostal == null)

      res.status(200).json(codigoPostal);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error");
    }
  }
);

/**
 * Estados
 */
router.get("/api/CodigosPostales/Estados", async (req, res) => {
  try {
    estados = new Array();
    list = await zipCodeRepository.distinct("Estado");
    //console.log(list);
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      //console.log(element);
      const limit = 1;
      codigoPostal = await zipCodeRepository.findOne({ Estado: element });
      //console.log(codigoPostal)
      estados.push({ id: codigoPostal.EstadoId, nombre: codigoPostal.Estado });
    }

    res.status(200).json(estados);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error");
  }
});

/**
 * Alcaldias de un estado
 */
router.get(
  "/api/codigosPostales/estados/:estado/alcaldias",
  async (req, res) => {
    try {
      alcaldias = new Array();
      list = await zipCodeRepository
        .find({ EstadoId: req.params.estado })
        .distinct("Alcaldia");
      //console.log(list);
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        codigoPostal = await zipCodeRepository.findOne({ Alcaldia: element });
        alcaldias.push({
          Id: codigoPostal.AlcaldiaId,
          Nombre: codigoPostal.Alcaldia,
        });
      }
      res.status(200).json(alcaldias);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error");
    }
  }
);

/**
 * Codigos postales de por estado y alcaldia
 */
router.get(
  "/api/codigosPostales/estados/:estado/alcaldias/:alcaldia",
  async (req, res) => {
    try {
      list = await zipCodeRepository.find({
        EstadoId: req.params.estado,
        AlcaldiaId: req.params.alcaldia,
      });
      //console.log(list);
      res.status(200).json(list);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error");
    }
  }
);

/**
 * Obtener los registro de un codigo postal
 */
router.get("/api/codigosPostales/:codigoPostal", async (req, res) => {
  try {
    const codigoPostal = req.params.codigoPostal;
    console.log(codigoPostal);
    list = await zipCodeRepository.find({ CodigoPostal: codigoPostal });
    console.log(list);
    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error");
  }
});

/**
 * Buscar por colonia
 */
router.get("/api/CodigosPostales/:colonia/Buscar", async (req, res) => {
  try {
    const colonia = req.params.colonia;
    list = await zipCodeRepository.find({ Asentamiento: colonia });
    //console.log(list);
    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ocurrio un error");
  }
});

/**
 * Buscar una colonia en estado y alcaldia
 */
router.get(
  "/api/codigosPostales/estados/:estado/alcaldias/:alcaldia/:colonia/Buscar",
  async (req, res) => {
    try {
      const colonia = req.params.colonia;
      const query = {
        Asentamiento: { $regex: colonia, $options: "i" },
        EstadoId: req.params.estado,
        AlcaldiaId: req.params.alcaldia,
      };
      list = await zipCodeRepository.find(query);
      //console.log(list);
      res.status(200).json(list);
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocurrio un error");
    }
  }
);

module.exports = router;