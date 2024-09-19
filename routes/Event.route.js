
const express=require('express') 
//creer un router avec la methode Router de express
const router=express.Router()
// importer le fichier controller
const Eventcontroller=require('./../Controllers/Event.controller')
const multer=require('multer') // importer le midelwares pour gerer les fichiers
//configurer les options de stockages du fichier
const storage =multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/EventImages");
    },
    filename: function (err, file, cb) {
      cb(null, Date.now().toLocaleString() + '-' + file.originalname);
    },
})
// Créez un objet "multer" avec les options de stockage
const upload = multer({ storage: storage });

//message de la page d'acceuil de l'api
router.get("/",Eventcontroller.homeApi)
//route permettant d'ajouter un Evenement
router.post("/NewEvent",upload.single("EventImage"),Eventcontroller.addEvent)
//route permettant de modifier un Evenement
router.put("/UpdateEvent/:id",upload.single("EventImage"),Eventcontroller.UpdateEvent)
//route permettant de supprimer un Evenement
router.delete("/DeleteEvent/:id",Eventcontroller.DeleteEvent)
//route permettant d'ajouter un Evenement
router.get("/ShowAllEvent",Eventcontroller.ShowAllEvent)

module.exports=router