const { register } = require('module');
const favourite = require('../models/favourite');
const Home = require('../models/home');
const path = require('path');
const mongodb = require('mongodb');
const getDb = require('../utils/databaseUtil');


//upper three for hostrouter


const getHomes = (req,res,next)=>{ 
    Home.fetchAll().then(registeredHome=> {
        res.render('store/home-list',{
            registeredHome:registeredHome,
            pageTitle:'Home list',
            currentPage:'home'
        })
});
}

const getBooking = (req,res,next)=>{
    res.render('store/booking',{
        pageTitle:'Booking',
        currentPage:'booking'
    })

}


const getFavourite = (req,res,next)=>{
    favourite.getFavourite(Favourites=>{ 
        Home.fetchAll().then(registeredHome=> { //fir saare home bhi fetch kar liye
            const favouriteHomes =registeredHome.filter(Home=> Favourites.includes(Home._id)); //favouritesHomes ki new list ban gyi jismai id match ho rhi hai vahi rahenge
                res.render('store/favourite-list', {
                    favouriteHomes: favouriteHomes,
                    pageTitle: 'Favourite List',
                    currentPage: 'favourites'
            });
            });
    });
}

    const postAddToFavourite=(req,res,next)=>{
        const newFavourite = new favourite(req.body.id);
        newFavourite.save().then(result=>{
            console.log(result);
        }).catch(err=>{
            console.log(err);
        }).finally(()=>{
            res.redirect('favourite-list');
        })
    };

const getIndex = (req,res,next)=>{ 
    Home.fetchAll().then(registeredHome=> {
        res.render('store/index',{
            registeredHome:registeredHome,
            pageTitle:'Airbnb home',
            currentPage:'index'
        })
});
}

const getHomeDetails = (req,res,next)=>{
    const homeId = req.params.id;
    Home.findById(homeId).then(home=>{ 
        if(!home){
            res.redirect('/homes');
        }
        else{
        res.render('store/home-details',{
            home:home,
            pageTitle:'Home Details',
            currentPage:'homeDetails'
        
        })
    }
    })
}

const deleteHome = (req,res,next)=>{
    
    const homeId = req.params.id;
    favourite.deleteHome(homeId);
    res.redirect('/favourite-list');
}



//upper for userrouter

module.exports = {
    getHomes,
    getBooking,
    getFavourite,
    getIndex,
    getHomeDetails,
    postAddToFavourite,
    deleteHome
}

// exports. postaddHome = postaddHome;
// exports.getaddHome = getaddHome;
// exports.getHomes = getHomes;
// exports.registeredHomes = registeredHomes;
