//external module
const express = require('express');
const flash = require('connect-flash');

//coremoudle
const path = require('path');

//local module
const {hostRouter,} = require('./routes/hostRouter');
const rootDir = require('./utils/pathutil');

const {get404} = require('./controllers/error');
const storeRouter = require('./routes/storeRouter');
const { default: mongoose } = require('mongoose');
const authRouter = require('./routes/authrouter');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const db_path ="mongodb+srv://rahuljangir7834:rahuljan7834@airproject.ihjzqg3.mongodb.net/airbnb?retryWrites=true&w=majority&appName=airproject ";
const multer=require('multer');



const app = express();
// to use ejs
app.set('view engine', 'ejs');
app.set('views','views');
 
const store = new MongoDBStore({
    uri: db_path,
    databaseName: 'airbnb',
    collection: 'sessions'
});

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    store: store
}));

app.use(flash());

app.use( (req,res,next)=>{
    req.isLoggedIn=req.session.isLoggedIn;
    next();
})

// use wale saare middleware ki tarah act karte hai 
app.use((req,res,next)=>{
    console.log(req.url,req.method);
    next();
})
app.use(express.json()); // Add middleware to parse JSON requests

//this defined where uploaded files will be stored and how they will be named 
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images');//files will be saved in images directory

    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+ '-' + file.originalname);
    }
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}

const multerOptions={
    storage: storage,
    fileFilter
}
app.use(express.urlencoded({extended: true})); //yeh middleware hai jo msgs ko parse karega jo form se aya hai
app.use(multer(multerOptions).single('photo'));
app.use(express.static(path.join(rootDir,'public'))); 
app.use('/images',express.static(path.join(rootDir,'images')));
app.use('/host/images',express.static(path.join(rootDir,'images')));
app.use('/homes/images',express.static(path.join(rootDir,'images')));

app.use(storeRouter);
app.use(authRouter);
app.use("/host",(req,res,next)=>{
    if(req.isLoggedIn){
        next();
    }
    else{
        res.redirect('/login');
    }
});
app.use("/host", hostRouter); // agar router se pehle koi path denge toh voh usmai pehle se prepond ho jayega


app.use(get404);

const port = 3100;

mongoose.connect(db_path).then(()=>{
    console.log('connected to mongoose');
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    });
}).catch((err)=>{
    console.log('error while connecting to mongoose',err)
})