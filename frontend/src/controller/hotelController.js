import { hotelReg,roomReg,roomDetails,roomDetailsUpdate} from "../model/hotelModel.js"

export const hotelRegistration = async (userId, hotel, phone, address, city) => {
    return await hotelReg({ userId, hotel, phone, address, city });
};


export const roomRegistration = async (userId,roomType,price,amenities,isAvailable) => {
    return await roomReg({ userId, roomType, price, amenities,isAvailable });
};


export const getRoomDetails=async (hotelId)=>{
    return await roomDetails(hotelId)
}

export const updateRoomDetails=async (roomId,isAvailable)=>{
    return await roomDetailsUpdate(roomId,isAvailable)
}