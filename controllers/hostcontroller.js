// const path = require('path');
const Home = require('../models/home');

const getaddHome =(req,res,next)=>{ //getaddHome is a controller function
    res.render('host/addhome',{
        pageTitle:'Add Home',
        currentPage:'getaddHome',
        editMode:false,
        isLoggedIn:req.isLoggedIn,
        user:req.session.user,
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
            isLoggedIn:req.isLoggedIn,
            user:req.session.user,
        });
    })

}


const getHostHomes = (req,res,next)=>{ 
    Home.find().then(registeredHome=> //fetch all mai function paas kar rha hu
        res.render('host/host-home-list',{
            registeredHome:registeredHome,
            pageTitle:'Host Home List',
            currentPage:'hostHomes',
            isLoggedIn:req.isLoggedIn,
            user:req.session.user,
        })
    );
}
const postaddHome=(req,res,next)=>{ 
    const {houseName,pricePerNight,location,rating,description}=req.body;
    console.log(req.body);
    console.log(req.file);
    if(!req.file){
        return res.status(422).send("No image provided");
        
    }
    const photo = req.file.path;
    const home =new Home({
        houseName,
        location,
        pricePerNight,
        rating,
        photo,
        description
}); //home ek object ban gya hai jiska data req.body se aayega
    home.save().then(()=>{
        console.log("data saved");
    });
    res.render('host/homeAdded',{pageTitle:'Home Added' , currentPage: 'postaddHome',isLoggedIn:req.isLoggedIn,user:req.session.user});
}
const postEditHome=(req,res,next)=>{ 
    const {houseName,pricePerNight,location,rating,description,id}=req.body;
    Home.findById(id).then(home =>{
        if(!home){
            console.log("Home not found for editing");
            return res.redirect('/host/host-home-list');
        }
        home.houseName = houseName;
        home.location = location;
        home.pricePerNight = pricePerNight;
        home.rating = rating;
        home.description = description;

        if(req.file){
            home.photo = req.file.path;
        }

    home.save().then((result)=>{
        console.log(result);
    }).catch(err=>{
        console.log("Error while updating",err);
    });
        res.redirect('/host/host-home-list');
    }).catch(err=>{
        console.log("Error while finding home",err);
    });
};

const deleteHome = (req,res,next)=>{
    const id = req.params.homeId;
    Home.findByIdAndDelete(id).then(result=>{
        console.log("Home deleted successfully");
    }).catch(err=>{
        console.log("Error while deleting home",err);
    });
    res.redirect('/host/host-home-list');
}


module.exports = {getaddHome,getHostHomes,postaddHome,getEditHome, postEditHome,deleteHome};