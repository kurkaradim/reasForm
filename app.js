const express = require("express");
const bp = require('body-parser');
const path = require('path');
const mongoose = require("mongoose");
require('dotenv').config()
const mongoString = process.env.APIKEY;


const port = process.env.PORT || 3000;
const app = express();


app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
mongoose.connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


mongoose.connection.on("connected", ()=> {
    console.log("Mongoose connected!")
})

//Schema
const Schema = mongoose.Schema;
const FormResponseSchema = new Schema({
    estatetype: {type: String, required: true},
    fullname: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    region: {type: String, required: true},
    district: {type: String, required: true},
    date: {type: String, default: Date.now()}
});

const FormResponse = mongoose.model('FormResponse', FormResponseSchema);



//Routes
app.get("/api/regions", (req,res) => {
    res.json({regions: ["Zlínský", "Moravskoslezský", "Jihomoravský", "Olomoucký", "Vysočina", "Pardubický", "Královehradecký", "Jihočeský", "Hlavní město Praha", "Středočeský", "Liberecký", "Plzeňský", "Ústecký", "Karlovarský."]})
});

app.get("/api/districts/:region", (req, res) => {
    console.log(req.params)
    if(req.params["region"] === "all"){
        res.json({districts: ["Hl. m. Praha", "Benešov", "Beroun", "Kladno", "Kolín", "Kutná Hora", "Mělník", "Mladá Boleslav", "Nymburk", "Praha-východ", "Praha-západ", "Příbram", "Rakovník", "České Budějovice", "Český Krumlov", "Jindřichův Hradec", "Písek", "Prachatice", "Strakonice", "Tábor", "Domažlice", "Klatovy", "Plzeň-město", "Plzeň-jih", "Plzeň-sever", "Rokycany", "Tachov", "Cheb", "Karlovy Vary", "Sokolov", "Děčín", "Chomutov", "Litoměřice", "Louny", "Most", "Teplice", "Ústí nad Labem", "Česká Lípa", "Jablonec nad Nisou", "Liberec", "Semily", "Hradec Králové", "Jičín", "Náchod", "Rychnov nad Kněžnou", "Trutnov", "Chrudim", "Pardubice", "Svitavy", "Ústí nad Orlicí", "Havlíčkův Brod", "Jihlava", "Pelhřimov", "Třebíč", "Žďár nad Sázavou", "Blansko", "Brno-město", "Brno-venkov", "Břeclav", "Hodonín", "Vyškov", "Znojmo", "Jeseník", "Olomouc", "Prostějov", "Přerov", "Šumperk", "Kroměříž", "Uherské Hradiště", "Vsetín", "Zlín", "Bruntál", "Frýdek-Místek", "Karviná", "Nový Jičín", "Opava", "Ostrava-město"]})
    } else{
    }
});

if (process.env.NODE_ENV === 'production') {
    console.log("PROCESS NODE PROD")
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }


app.post("/api/lead", (req, res) => {
    const data = req.body;
    console.log(data)
    const newFormResponse = new FormResponse({
        estatetype: data.estatetype, fullname: data.fullname, phone:data.phone, email: data.email, region: data.region, district: data.district
    });
    newFormResponse.save((err) => {
        if(err){
            res.json("SOMETHING WENT WRONG")
        } else {
            res.json("ALL GOOD SAVED")
        }
    })
});

app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`)
});