// const { register } = require('module');
const Home = require('../models/home');
const User = require('../models/user');




//upper three for hostrouter


const getHomes = (req,res,next)=>{ 
    Home.find().then(registeredHome=> {
        res.render('store/home-list',{
            registeredHome:registeredHome,
            pageTitle:'Home list',
            currentPage:'home',
            isLoggedIn:req.isLoggedIn,
            user:req.session.user,
        })
});
}

const getBooking = (req,res,next)=>{
    res.render('store/booking',{
        pageTitle:'Booking',
        currentPage:'booking',
        isLoggedIn:req.isLoggedIn,
        user:req.session.user,
    })

}


const getFavourite = async (req,res,next)=>{
    const userId=req.session.user._id;
    const Founduser = await User.findById(userId).populate('favourite');       
    res.render('store/favourite-list', {
        favouriteHomes: Founduser.favourite,
        pageTitle: 'Favourite List',
        currentPage: 'favourites',
        isLoggedIn:req.isLoggedIn,
        user:req.session.user,
    });
}

    const postAddToFavourite=async(req,res,next)=>{
        const homeId=req.body.id;
        const userId = req.session.user._id;
        const user = await User.findById(userId);
        if(!user.favourite.includes(homeId)){
        user.favourite.push(homeId);
        await user.save();
        }
        res.redirect("/favourite-list");
       
    };

const getIndex = (req,res,next)=>{ 
    Home.find().then(registeredHome=> {
        res.render('store/index',{
            registeredHome:registeredHome,
            pageTitle:'Airbnb home',
            currentPage:'index',
            isLoggedIn:req.isLoggedIn,
            user:req.session.user,
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
            currentPage:'homeDetails',
            isLoggedIn:req.isLoggedIn,
            user:req.session.user,
        
        })
    }
    })
}

const deleteHome = async (req, res, next) => {
    const homeId=req.params.id;
    const userId=req.session.user._id;
    const user=await User.findById(userId);
    if(user.favourite.includes(homeId)){
        user.favourite=user.favourite.filter(fav=>fav!=homeId);
        await user.save();
    }
    res.redirect('/favourite-list');
};



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