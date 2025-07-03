const {db}=require('../config/firebaseConfig.js');
const userDetails=db.collection("rooms")

exports.createUser=async (uid,email,name,role,isHotelRegistered)=>{
    const userRef=db.collection('users').doc(uid);
    await userRef.set({
        email:email.toLowerCase(),name,role,isHotelRegistered
    })
};

exports.getUserByUID=async (uid)=>{
    const userDoc=await db.collection('users').doc(uid).get();
    return userDoc.exists ? userDoc.data() : null ;
}

exports.getUserByEmail=async(email)=>{
    const userDoc= await db.collection('users').where('email','==',email.toLowerCase()).get();
    return  ! userDoc.empty ?  userDoc.docs[0].data() : null;
}

exports.updateUserRegistration=async(userId,name,email,role,isHotelRegistered)=>{
    const userRef=db.collection("users").doc(userId);
    await userRef.update({
       userId, name,email,role,isHotelRegistered
    })
};

