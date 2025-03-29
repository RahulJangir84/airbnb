const path = require('path');
const Home = require('../models/home');
const { get } = require('http');
const favourite = require('../models/favourite');

const getaddHome =(req,res,next)=>{ //getaddHome is a controller function
    // res.sendFile(path.join(rootDir, 'views','addhome.html'));
    res.render('host/addhome',{
        pageTitle:'Add Home',
        currentPage:'getaddHome',
        editMode:false,
    });
}
const getEditHome =(req,res,next)=>{
    const homeId = req.params.homeId;
    const editMode = req.query.edit === 'true'; //to convert string to boolea
    Home.findById(homeId).then(home =>{
        if(!home){
           return res.redirect('/host/host-home-list');
        }
        console.log(home);
        res.render('host/addhome',{ //home ki details addhome ko pass kardi
            home:home,
            pageTitle:'Edit Home',
            currentPage:'hostHomes',
            editMode:true,
        });
    })

}


const getHostHomes = (req,res,next)=>{ 
    Home.fetchAll().then(registeredHome=> //fetch all mai function paas kar rha hu
        res.render('host/host-home-list',{
            registeredHome:registeredHome,
            pageTitle:'Host Home List',
            currentPage:'hostHomes'
        })
    );
}
const postaddHome=(req,res,next)=>{ 
    const home =new Home(
        req.body.houseName,
        req.body.location,
        req.body.pricePerNight,
        req.body.rating,
        req.body.photoUrl,
        req.body.description); //home ek object ban gya hai jiska data req.body se aayega
    home.save().then(()=>{
        console.log("data saved");
    });
    res.render('host/homeAdded',{pageTitle:'Home Added' , currentPage: 'postaddHome'});
}
const postEditHome=(req,res,next)=>{ 
    const home =new Home(
        req.body.houseName,
        req.body.location,
        req.body.pricePerNight,
        req.body.rating,
        req.body.photoUrl,
        req.body.description); //home ek object ban gya hai jiska data req.body se aayega
        home.id = req.body.id;

    home.save().then((result)=>{
        console.log(result);
        res.redirect('/host/host-home-list');
    });
}

const deleteHome = (req,res,next)=>{
    const id = req.params.homeId;
    Home.deleteById(id);
    res.redirect('/host/host-home-list');
}


module.exports = {getaddHome,getHostHomes,postaddHome,getEditHome, postEditHome,deleteHome};