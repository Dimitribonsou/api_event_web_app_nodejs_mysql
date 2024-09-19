const con = require("./../connection");

// fonction permettant d'afficher le message de bienvenue sur la page d'acceuil de l'api
const homeApi = (req, res) => {
  res.send({
    message: "Bienvenue sur l'api de gestion des evenements de Datnek",
  });
};
//fonction permettant d'ajouter un nouvel evenement
const addEvent = (req, res) => {
  try {
    let Image = "event.jpg";
    if(!!req.file)
    {
      Image=req.file.filename;
    }
    // //ecriture de la requete d'insertion d'un evenement
    const reqnewEvent =
      "INSERT INTO `event`( `nom_evenement`, `nom_auteur`, `lien_evenement`, `adresse`, `date_debut`, `date_fin`, `heure_debut`, `heure_fin`,`image`, `description`) VALUES (?,?,?,?,?,?,?,?,?,?)";
    //creer un objet contenant les parametres de 'insertion envoyer depuis le front-end avec la methode post
    const EventData = [
      req.body.nom_evenement,
      req.body.nom_auteur,
      req.body.lien_evenement,
      req.body.adresse,
      req.body.date_debut,
      req.body.date_fin,
      req.body.heure_debut,
      req.body.heure_fin,
      Image,
      req.body.description,
    ];
    //execution de la requete pour effectuer l'insertion
    con.query(reqnewEvent, EventData, (err) => {
      if (err) throw err;
      res.status(200).send("insertion effectuer avec success !");
    });
  } catch (error) {
    res
      .status(404)
      .send("une erreur est survenue lors de l'insertion : " + error.message);
  }
};
//fonction permettant de modifier un  evenement
const UpdateEvent = (req, res) => {
  try {
    //recuperer l'id de l'evenement passer en parametre
    const id = req.params.id;
    let Image = "event.jpg";
    //verifier si l'image a ete envoyer
    if (!!req.file) {
      Image = req.file.filename;
    }
    //ecriture de la requete de mise a jour d'un evenement
    const reqUpdateEvent =
      "UPDATE `event` SET `nom_evenement`=?,`nom_auteur`=?,`lien_evenement`=?,`adresse`=?,`date_debut`=?,`date_fin`=?,`heure_debut`=?,`heure_fin`=?,`image`=?,`description`=? WHERE  `id_event`=?";
    //creer un objet contenant les parametres de 'insertion envoyer depuis le front-end avec la methode put
    const EventData = [
      req.body.nom_evenement,
      req.body.nom_auteur,
      req.body.lien_evenement,
      req.body.adresse,
      req.body.date_debut,
      req.body.date_fin,
      req.body.heure_debut,
      req.body.heure_fin,
      Image,
      req.body.description,
      id,
    ];
    //execution de la requete pour effectuer la mise a jour
    con.query(reqUpdateEvent, EventData, (err) => {
      if (err) throw err;
      res.status(200).send("mise a jour effectuer avec success !");
    });
  } catch (error) {
    res
      .status(404)
      .send("une erreur est survenue lors de la mise a jour : " + error);
  }
};
//fonction permettant de suprimer un  evenement
const DeleteEvent = (req, res) => {
  try {
    //recuperer l'id de l'evenement passer en parametre
    const id = req.params.id;
    //requete permettant de supprimer un evenement
    const reqDeleteEvent = "DELETE FROM `event` WHERE `id_event`=?";
    //execution de la requete pour effectuer la suppression
    con.query(reqDeleteEvent, [id], (err) => {
      if (err) throw err;
      res.status(200).send("Suppression effectuer avec success !");
    });
  } catch (error) {
    res
      .status(404)
      .send("une erreur est survenue lors de la suppression : " + error);
  }
};
//fonction permettant d'afficher la liste des evenements
const ShowAllEvent = (req, res) => {
  try {
    //requete permettant d'afficher la liste des evenements
    const reqSelectEvents = "SELECT * FROM `event` ";
    //execution de la requete pour l'affichage de la liste des evenements
    con.query(reqSelectEvents, (err, results) => {
      if (err) throw err;
      res.status(200).send(results);
    });
  } catch (error) {
    res
      .status(404)
      .send(
        "une erreur est survenue lors de l'affichage des evenements : " + error
      );
  }
};

//exporter les differentes fonction callback
module.exports = {
  homeApi,
  addEvent,
  UpdateEvent,
  DeleteEvent,
  ShowAllEvent,
};
