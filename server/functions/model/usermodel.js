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
    const userDocSnap= await db.collection('users').where('email','==',email.toLowerCase()).get();
    if (userDocSnap.empty) {
        return null;
    }

    const userData=userDocSnap.docs[0].data();

    if (userData.role==='Hotel Owner') {
        let userResult=[];

        userResult.push({
            user:userData
        })
        return userResult
        
    }

    const hotelOwnersSnap=await db.collection('users'
    ) .where('role','==','Hotel Owner').get();

    let Hotelresult=[];

    for(const ownerDoc of hotelOwnersSnap.docs){
        const ownerData=ownerDoc.data();

        let hotelData={};
        if (ownerData.hotelId) {
            const hotelSnap=await db.collection('hotels'
            ).doc(ownerData.hotelId).get()

            if (hotelSnap.exists) {
                hotelData={hotelId:hotelSnap.id,...hotelSnap.data()}
            }

        }

        const roomsSnap=await db.collection('rooms')
        .where('hotelId','==',ownerData.hotelId).get()

        const roomsData=roomsSnap.docs.map(doc=>({roomId:doc.id,...doc.data()}));

        Hotelresult.push({
            
            owner:{
                name:ownerData.name,
                role:ownerData.role,
                email:ownerData.email,
                userId:ownerData.userId
            },
            hotel:hotelData,
            rooms:roomsData
        })
    }


    let result=[];
    result.push(userData);
    result.push(Hotelresult);
    return result
}


exports.updateUserRegistration=async(userId,name,email,role,isHotelRegistered)=>{
    const userRef=db.collection("users").doc(userId);
    await userRef.update({
       userId, name,email,role,isHotelRegistered
    })
};

