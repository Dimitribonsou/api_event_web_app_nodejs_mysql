const mysql =require('mysql')
const dotenv=require('dotenv')
//configurer les variables d'environnements
dotenv.config()

//configurer la connection a la base de donnee
const db = mysql.createConnection({
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME
})

//lancer la connection a la base de donnee
 async function ConnectDb()
{
  return  db.connect()
}

ConnectDb()
.then(()=> console.log("connection reussit a la base de donnee"))
.catch((err)=> {
    console.log("erreur de connection a la base de donnee : "+err)
    ConnectDb();
});

module.exports=db
