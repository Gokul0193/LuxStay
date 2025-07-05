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

exports.roomDetails=async(hotelId)=>{
    const roomRef=db.collection("rooms")
   const room= await roomRef.where("hotelId","==",hotelId).get();

   if (room.empty) {
    
    return[]
   }

   const rooms=[]
    room.forEach((doc)=>{
    rooms.push({
        id:doc.id,
        ...doc.data()
    }) 
   });

   return rooms
}

exports.updatRoomDetils=async(roomId,isAvailable)=>{
    const roomRef= db.collection('rooms').doc(roomId);

   await roomRef.update({
        isAvailable
    })
    const updatedDoc=await roomRef.get();

    return {
        id:updatedDoc.id,
        ...updatedDoc.data()
    }
}