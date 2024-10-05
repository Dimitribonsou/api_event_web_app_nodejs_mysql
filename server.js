const express = require("express");
const app = express(); // creer une instance de l'application express
const cors = require("cors");
const dotenv = require("dotenv");
//configurer les variables d'environnements
dotenv.config();
const bodyParser = require("body-parser");
//ajouter le midelwares cors pour authauriser la receptions des requetes sur des ports differents
app.use(cors());
//ajouter le midelwares bodypaser pour authauriser l'envoie des fichiers au format json
app.use(bodyParser.json());
// importer la route Event pour acceder au route de gestion des evenements
const EventRoute = require("./routes/Event.route");
//ajouter la route event a notre application express
app.use(EventRoute);

//demarer l'application express en definissant un port comme parametre a la methode listen de express
const port = process.env.PORT | 5000;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(
    `serveur demarer avec succes sur l'adresse : http://localhost:${port}`
  );
});
