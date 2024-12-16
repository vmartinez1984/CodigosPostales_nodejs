const mongoose = require("mongoose")
require('dotenv').config({path: "variables.env"})

const conectarDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI, {          
          useNewUrlParser: true,
          useUnifiedTopology: true,          
          authSource: "admin", // Si se requiere una base de datos de autenticación específica
        });
        console.log("base de datos conectada")
    }catch(error){
        console.log(error);        
    }
}

module.exports = conectarDB;