import { hotelReg,roomReg,roomDetails,roomDetailsUpdate,hotelRooms,hotelBookings,bookingDetails,roomPayment,recentBookingDetails} from "../model/hotelModel.js"

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

export const getHotelRoom=async ()=>{
    return await hotelRooms()
}

export const bookings=async (userId,roomId,hotelId,bookInput)=>{
    return await hotelBookings({userId,roomId,hotelId,bookInput})
}

export const getBookings=async(userId)=>{
    return  await bookingDetails(userId);
}

export const Payment=async(bookingId)=>{

    return await roomPayment(bookingId);
}
export const recentBookings=async(hotelId)=>{

    return await recentBookingDetails(hotelId)
}