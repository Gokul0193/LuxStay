const {db} =require('../config/firebaseConfig');

exports.hotelRegister=async(userId,hotel,phone,address,city)=>{
    const hotelRef=db.collection("hotels").doc();
    const userRef=db.collection('users').doc(userId)
    await hotelRef.set({
            userId,hotel,phone,address,city
    });
    await userRef.set({
        hotelId: hotelRef.id
    }, { merge: true });
    return hotelRef.id
}

exports.roomRegister=async(hotelId,roomType,price,amenities,isAvailable)=>{
    const roomRef=db.collection("rooms").doc();
    await roomRef.set({
        hotelId,roomType,price,amenities,isAvailable
    })
    return roomRef.id
}