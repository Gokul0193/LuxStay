const {db} =require('../config/firebaseConfig');
const { booking } = require('../controller/hotelcontroller');

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
exports.getHotelRooms=async()=>{
    const ownersDocSnap=await db.collection('users').where("role",'==',"Hotel Owner").get()
    
     let Hotelresult=[];

    for(const ownerDoc of ownersDocSnap.docs){
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
                userId:ownerData.userId,
                hotelId:ownerData.hotelId
            },
            hotel:hotelData,
            rooms:roomsData
        })
    }


   
    return [...Hotelresult]


}

exports.hotelBooking =async (userId,roomId,hotelId,bookInput)=>{

    const bookref=db.collection("bookings").doc()

    await bookref.set({
        userId,roomId,hotelId,bookInput
    });
    return bookref.id;
}

exports.getBookings=async(userId)=>{
    const bookingref=await db.collection("bookings").where('userId',"==",userId).get()
   let bookings=[];
   for(const doc of bookingref.docs){
    const bookingData=doc.data();

    let hotelData=[];
    if (bookingData.hotelId) {
        
        const hotelSnap=await db.collection("hotels").doc(bookingData.hotelId).get();
        if (hotelSnap.exists) {
            hotelData={hotelId:hotelSnap.id,...hotelSnap.data()}
        }
    }

    let roomData=[];
    if(bookingData.roomId){
        const roomSnap=await db.collection('rooms').doc(bookingData.roomId).get();

        if(roomSnap.exists){
            roomData={roomId:roomSnap.id,...roomSnap.data()};
        }
    }

    bookings.push({
        bookingId:doc.id,
        ...bookingData,
        hotel:hotelData,
        room:roomData
    })

   }

   return bookings
    
}

exports.Payment=async(bookingId)=>{
    try {
        
         const bookingRef=await db.collection('bookings').doc(bookingId);
         const update=await bookingRef.update({"bookInput.paid":true})

    return { success: true}
    } catch (error) {
         return { success: false}
    }
   
}