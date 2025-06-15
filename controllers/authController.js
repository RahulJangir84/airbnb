import { check, validationResult } from 'express-validator';
import user from '../models/user.js';
import bcrypt from 'bcryptjs';


const getLogin =(req,res,next)=>{ //getaddHome is a controller function
    res.render('auth/login',{
        pageTitle:'Login',
        currentPage:'getLogin',
        editMode:false,
        isLoggedIn:false,
        oldInput:{email:""},
        errors:[],
        user:{},
    });
}
const postLogin =async(req,res,next)=>{
    const {email,password}=req.body;
    const User = await user.findOne({email});
    if(!User){
        return res.status(422).render('auth/login',{
            pageTitle:'login',
            currentPage:'login',
            isLoggedIn:false,
            errors:["user does not exist"],
            oldInput:{email},
            user:{},
        });
    }
    const doMatch =await bcrypt.compare(password,User.password);
    if(!doMatch){
        return res.status(422).render('auth/login',{
            pageTitle:'login',
            currentPage:'login',
            isLoggedIn:false,
            errors:["Invalid password"],
            oldInput:{email},
            user:{},
        });
    }
    req.session.isLoggedIn = true;
    req.session.user = User;
    await req.session.save();
    res.redirect('/index');
}
const postSignup =[
    check('firstname')
     .notEmpty()
     .withMessage('Firstname cannot be empty')
     .trim()
     .isLength({min:2})
     .withMessage('First name must be atleast 2 characters long')
     .matches(/^[a-zA-Z\s]+$/)
     .withMessage('First name can only contain letters'),

    check('lastname')
     .notEmpty()
     .withMessage('Lastname cannot be empty')
     .trim()
     .isLength({min:2})
     .withMessage('Last name must be atleast 2 characters long')
     .matches(/^[a-zA-Z\s]+$/)
     .withMessage('Last name can only contain letters'),


    check('email')
     .isEmail()
     .withMessage('Please enter a valid email')
     .normalizeEmail(),

    check('password')
     .isLength({min:8})
     .withMessage('Password must be at least 8 characters long')
     .matches(/[a-z]/)
     .withMessage('Password must contain altleast one lowercase letter')
     .matches(/[A-Z]/)
     .withMessage('Password must contain atleast one uppercase letter')
     .matches(/[0-9]/)
     .withMessage('Password must contain atleast one number')
     .matches(/[!@#$%^&*()<>?,.":{}|]/)
     .withMessage('Password must contain atleast one special character')
     .trim(),


    check('confirm-password')
     .trim()
     .custom((value,{req})=>{
        if(value !== req.body.password){
            throw new Error('Passwords do not match');
        }
        return true;
     }),

    check('usertype')
     .notEmpty()
     .withMessage('User type is required')
     .isIn(['guest','host'])
     .withMessage('invalid user type'),

    check('terms')
     .notEmpty()
     .withMessage('You must accept the terms and conditions')
     .custom((value)=>{
        if(value !=='on'){
            throw new Error('You must accept the terms and conditions');
        }
        return true;
     }),
         

     //final handler middleware
    (req,res,next)=>{
    console.log(req.body);
    const {firstname,lastname,email,password,usertype} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).render('auth/signup',{
            pageTitle:'Signup',
            currentPage:'getSignup',
            isLoggedIn:false,
            errors:errors.array().map((err)=>{
                return err.msg; //saare error show karo user ko jo usne galat bhare hai
            }),
            oldInput:{
                firstname,
                lastname,
                email,
                usertype,
                password,
            },
            user:{},
        });
    };

    bcrypt.hash(password,12)
    .then((hashedpassword)=>{
        const newuser = new user({
                firstname,
                lastname,
                email,
                password:hashedpassword,
                usertype,
            });
             return newuser.save()
            .then(()=>{
                res.redirect('/login');
            })
            .catch((err)=>{
                console.log(err);
                return res.status(422).render('auth/signup',{
                    pageTitle:'Signup',
                    currentPage:'getSignup',
                    isLoggedIn:false,
                    errors:[err.message],
                    oldInput:{
                        firstname,
                        lastname,
                        email,
                        usertype,
                        password,
                    },
                    user:{},
                });
            })
        })
    }
]

const postLogout =(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/login');
    })
}

const getSignup = (req,res,next)=>{
    res.render('auth/signup',{
        pageTitle:'Signup',
        currentPage:'getSignup',
        editMode:false,
        isLoggedIn:false,
        errors: [], // Provide an empty array
        oldInput: { // Provide fallback fields
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            usertype: ''
        },
        user:{},
    });
}




export {getLogin,postLogin,postLogout,getSignup,postSignup};

