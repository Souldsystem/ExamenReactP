
##instalaciones

#Creacion del Proyecto
Comando con el cual se creo el proyecto: npx create-react-app gestion-productos

#instalar validador 
npm install simple-react-validator –sabe

#instalar axios
npm install axios

#Instalar firebase
npm install firebase
#se agrega archivo de cinfiguracion de firebase
#firebaseConfig.js

#Instalar firebase tools
npm install -g firebase-tools

#login para firebase
firebase login

#verificar proyectos
firebase projects:list

#generar funciones
firebase init functions

#asignar proyecto firebase directamente
firebase use dynamic-radar-443104-u0

#se instala un miltiple compilador 
npm install concurrently --save-dev

#se configura archivo remplazando seccion scripts
#package.json  
  "scripts": {
  "start": "concurrently \"npm run start-react\" \"npm run start-firebase\"",
   "start-react": "react-scripts start",
   "start-firebase": "firebase emulators:start",
   "build": "react-scripts build",
    "test": "react-scripts test",
   "eject": "react-scripts eject"
 ##},

#comando para debuguear solo el servicio
firebase emulators:start --only functions

#comando para debuguear el proyecto
npm start

#ruta del servicio (function firebase)
http://127.0.0.1:5001/dynamic-radar-443104-u0/us-central1/deleteProducto

#Instalar Bootstrap como una dependencia de npm:
npm install bootstrap

#se agrega codigo a index.js
import "bootstrap/dist/css/bootstrap.min.css"

#se generan los siguientes componentes
##Login.js
##MenuPrincipal.js
##CrudProductos.js
##FormularioProducto.js
##Carrito.js
##ProductoItem.js

#para generar dependencias privadas
npm install --save-dev @babel/plugin-proposal-private-property-in-object

#Integrar react-bootstrap en un proyecto React para usar componentes Bootstrap de manera nativa:

npm install react-bootstrap

#se genera repositorio para el proyecto
https://github.com/Souldsystem/ExamenReactP

#se genera proyecto para produccion 
npm run build

#se instala cordova
npm install -g cordova