const {db} =require('../config/firebaseConfig');

exports.hotelRegister=async(userId,hotel,phone,address,city)=>{
    const hotelRef=db.collection("hotels").doc();
    await hotelRef.set({
            userId,hotel,phone,address,city
    });
    return hotelRef.id
}