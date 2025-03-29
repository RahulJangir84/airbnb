//external module
const express = require('express');
const {mongoconnect} = require('./utils/databaseUtil');

//coremoudle
const path = require('path');

//local module
const {hostRouter,} = require('./routes/hostRouter');
const rootDir = require('./utils/pathutil');

const {get404} = require('./controllers/error');
const storeRouter = require('./routes/storeRouter');


const app = express();
// to use ejs
app.set('view engine', 'ejs');
app.set('views','views');
// use wale saare middleware ki tarah act karte hai 
app.use((req,res,next)=>{
    console.log(req.url,req.method);
    next();
})

app.use(express.urlencoded()); //yeh middleware hai jo msgs ko parse karega jo form se aya hai 
app.use(storeRouter);
app.use("/host", hostRouter); // agar router se pehle koi path denge toh voh usmai pehle se prepond ho jayega

app.use(express.static(path.join(rootDir,'public'))); 

app.use(get404);

const port = 3100;
mongoconnect(()=>{ //callback mai client pass karega
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    });
})