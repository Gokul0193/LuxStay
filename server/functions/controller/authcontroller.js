
const {createUser,getUserByUID,getUserByEmail, updateUserRegistration} =require('../model/usermodel.js');

const register =async (req,res)=>{
    const {uid,name,email,role,isHotelRegistered}=req.body;

    try {

        await createUser(uid,email,name,role,isHotelRegistered);
        res.status(200).send({message:"Registerd Sucessfully"});
        
    } catch (error) {
        res.status(500).send({error:error})
    }
}

const login=async (req,res)=>{
    const {uid}=req.body;
    try {
      const user=  await getUserByUID(uid);
      if(user){
        res.status(200).json(user)
      }else{
        res.status(404).send({message:"No Such Account"})
      }
    } catch (error) {
        res.status(500).send({ error: "Login failed" });
    }
}

const googleLogin=async (req,res)=>{
    const {email}=req.body;
   
    
    try {
        const user =await getUserByEmail(email.toLowerCase());
       if(user){
        res.status(200).json(user);
      }else{
        res.status(404).send({message:"No Such Account Please Signup First"})
      }
    } catch (error) {
        res.status(500).send({ error: "Login failed" });
    }
}

const updateReg=async (req,res)=>{
  const {userId,name,email,role,isHotelRegistered}=req.body;
  console.log("update usedat",req.body);
  
  try{
         await updateUserRegistration(userId,name,email,role,isHotelRegistered)
          res.status(200).send({message:"Update Sucessfully"});
  }catch (error) {
        res.status(500).send({error:"updated Failed"})
    }
 

}

module.exports={register,login,googleLogin,updateReg};