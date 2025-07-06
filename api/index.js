const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const Post= require("./models/post.js")
const cors = require("cors");

const bcrypt = require('bcrypt');


const app = express();
const  cookieParser= require('cookie-parser');
//related to file uplode>
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });

const jwt= require('jsonwebtoken');

const secret='ojrmskldndfnvjkdzfmL:Jljsjzsfjvn;osfiwepokwpih';
app.use(cors({ credentials:true,origin:'http://localhost:5174'}));

app.use(cookieParser());

const fs= require('fs');
app.use(express.json());




 mongoose.connect('mongodb+srv://cryptoknight21eth:jWhC8xQfyNKRU8hz@clustermernblog.5s2i6m3.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMernBlog')

app.post("/register",async(req,res)=>{

    const {username,password} =req.body;


 try {
    const userDoc=   await  User.create({
               username,
               password
           });
   // {requestData:{username,password}}
       res.json( userDoc)
 } catch (e) {

    res.status(400).json(e); 
 } 
});


app.post('/login',async (req,res)=>{

 const {username,password}=req.body;

 const userDoc= await User.findOne({username});
 const passOk= bcrypt.compareSync(password,userDoc.password)
if(passOk){
jwt.sign({username,id:userDoc._id}, secret,{},(err,token)=>{
    if(err) throw err;
    // res.json(token);
    res.cookie('token',token).json(

      {  id:userDoc._id,
          username,
      }  
    );

});

}else{
    res.status(400).json('wrong credentials')
}

});


// logout and create new post 
//shown in the page after login not login and register option
app.get('/profile',(req,res)=>{

const{token}=req.cookies;

    jwt.verify(token,secret,{},(err,info)=>{
        if(err) throw err;
        res.json(info);
    })
    
      
   
});


/// token hata do 
app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
})


app.post('/post',uploadMiddleware.single('file'),(req,res)=>{
    const {originalname,path}=req.file;
    const parts= originalname.split('.');
    const ext=parts[parts.length-1];
    const newpath=path+"."+ext;
    fs.renameSync(path,newpath);
    // res.json({ext});
const { title, summary, content } = req.body;
    console.log('TITLE:', title);       // ✅ Should print title
  console.log('SUMMARY:', summary);   // ✅ Should print summary
  console.log('CONTENT:', content);   // ✅ Should print content
//   console.log('FILE:', req.file);
//    const {title,summary,content}=req.body;
//    Post.create({


//    })
    // res.json(req.file);

    res.json({
    title: req.body.title,
    summary: req.body.summary,
    content: req.body.content,
    file: req.file,
  });

})


app.listen(4000);
