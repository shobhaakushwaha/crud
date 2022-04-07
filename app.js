const  express=require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const app=express();
const bodyparser = require("body-parser");



// create connection
mongoose.connect("mongodb://localhost:27017/userdb", {
    useNewUrlparser:true,
    useUnifiedTopology:false}
     ).then(()=>{
    console.log("connected  with mongodb");
}).catch((err)=>{
    console.log(err)
})


app.use(bodyparser.urlencoded({extended:false}));

app.use(express.json());
const UserSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true,
      minlength:4,
      manlength:10,
    },
    lastName: {
        type: String,
        required: true,
        minlength:4,
        manlength:15,
      },
      mobileNo:{
          type:Number,
          required:true,
          minlength:10,
          manlength:10,
      },
    
    emailId:{
        type:String,
        required:true,
        
        
    }
  });


  // model  collection 
  const User = new mongoose.model('User',UserSchema);
  
//create  user route
app.post('/user',async(req,res)=>{
const user = await User.create(req.body);
res.status(200).json({
    msg:'user data create successsfully',
    success:true,
    user
})
}); 

//  read user / (get)route
app.get('/user',async(req,res)=>{
const users  = await User.find();

//  
res.status(200).json({
    success:true,
    msg:'successfully',
    users
})
});

//update  route
app.put('/user/:id',async(req,res,next)=>{

    let user = await User.findById(req.params.id)
    user = await User.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        useFindAndModify:false,
        runValidators:true
    })

    if(!user){
        return res.status(500).json({
            success:false,
            msg: "user not  not updated"
        })
    }

    res.status(200).json({
        success:true,
        msg:"user updated success",
        user
    })
})





 //delete route
  app.delete('/user/:id',async(req,res)=>{
const user =  await User.findById(req.params.id);
 if(!user){
     return res.status(500).json({
         success:false,
         msg: "user not found"
     })
 }
 await user.remove();
res.status(200).json({
   msg:"user deleted successfully",
   user  
})
  })


app.listen(8080,()=>{
    console.log("server running on port 8080")
    });







 