const {db}=require('../config/firebaseConfig.js');
const userDetails=db.collection("rooms")

exports.createUser=async (uid,email,name,role,isHotelRegistered)=>{
    const userRef=db.collection('users').doc(uid);
    const userData={
            email: email.toLowerCase(),
    name,
    role,
    }

    if (!role==="User") {
        userData.isHotelRegistered=isHotelRegistered
    }
   await userRef.set(userData);

};

exports.getUserByUID=async (uid)=>{
    const userDoc=await db.collection('users').doc(uid).get();
    return userDoc.exists ? userDoc.data() : null ;
}

exports.getUserByEmail=async(email)=>{
    const userDocSnap= await db.collection('users').where('email','==',email.toLowerCase()).get();
    if (userDocSnap.empty) {
        return null;
    }

    const userData=userDocSnap.docs[0].data();

    
        let userResult=[];

        userResult.push({
            user:userData
        })
        return userResult
        

}


exports.updateUserRegistration=async(userId,name,email,role,isHotelRegistered)=>{
    const userRef=db.collection("users").doc(userId);
    await userRef.update({
       userId, name,email,role,isHotelRegistered
    })
};

