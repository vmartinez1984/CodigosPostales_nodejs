#Usa uan imagen base de Node.js
FROM node:20-alpine

#Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos necesarios
COPY package*.json ./

# Instala las dependencia
RUN npm install

# Copia del resto de código
COPY . .

# Expone el puerto en el corre tu app
EXPOSE 3000

#Define el comando de incio
CMD ["node", "src/index.js"]