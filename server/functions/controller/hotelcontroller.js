const {hotelRegister,roomRegister,roomDetails,updatRoomDetils,getHotelRooms} =require('../model/hotelmodel.js');
const {userDetails}=require('../model/DetailsModel.js')


const hotelRegistration= async (req,res)=>{
    const {userId,hotel,phone,address,city}=req.body;

    try {
      await hotelRegister(userId,hotel,phone,address,city);
        res.status(200).send({message:"Registerd Sucessfully"});

    } catch (error) {
        res.status(500).send({error:"Registration Failed"})
    }
}

const roomRegistration = async (req, res) => {
    console.log("ROOM-REG BODY:", req.body);

    const { userId, roomType, price, amenities,isAvailable } = req.body;

    try {
        const data = await userDetails(userId);
        console.log("USER DATA:", data);

        if (!data || !data.hotelId) {
            throw new Error(`Hotel ID not found for user ${userId}`);
        }

        await roomRegister(data.hotelId, roomType, price, amenities,isAvailable);
        res.status(200).send({ message: "Room Added Successfully" });
    } catch (error) {
        console.error("Room Registration Error:", error);
        res.status(500).send({ error: "Room Add Unsuccessfully" });
    }
};

const getRoomDetails=async(req,res)=>{

    const {hotelId}=req.params;
    try {
        
       const room= await roomDetails(hotelId);
        res.status(200).json(room)
    } catch (error) {
         res.status(500).send({ error: "no Room  Get" });
    }
    

}

const roomDetailsUpdate=async(req,res)=>{
    const {roomId}=req.params;
    const {isAvailable}=req.body
    try {
     const updateDoc=  await updatRoomDetils(roomId,isAvailable)
        res.status(200).json(updateDoc);
        
    } catch (error) {
         res.status(500).send({ error: "no update" });
        
    }
}

const hotelRoom=async(req,res)=>{
    try {
        const result=await getHotelRooms()
        res.status(200).json(result)
    } catch (error) {
         res.status(500).send({ error: "not get data" });
    }
}



module.exports={hotelRegistration,roomRegistration,getRoomDetails,roomDetailsUpdate,hotelRoom};