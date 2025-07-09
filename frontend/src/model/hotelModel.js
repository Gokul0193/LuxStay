import axios from "axios";

export const hotelReg = async (hotelData) => {
    return await axios.post(
        'http://localhost:5001/staylux-a71c8/us-central1/api/hotel/hotel-reg',
        hotelData
    );
};

export const roomReg = async (roomData) => {
    return await axios.post(
        'http://localhost:5001/staylux-a71c8/us-central1/api/hotel/room-reg',
        roomData
    );
};


export const roomDetails=async (hotelId)=>{
    return await axios.post(`http://localhost:5001/staylux-a71c8/us-central1/api/hotel/rooms/${hotelId}`)
}

export const roomDetailsUpdate=async (roomId,isAvailable)=>{
    return await axios.post(`http://localhost:5001/staylux-a71c8/us-central1/api/hotel/room-update/${roomId}`,{isAvailable})
}


export const hotelRooms=async()=>{
    return await axios.get("http://localhost:5001/staylux-a71c8/us-central1/api/hotel/hotel-room")
}

export const hotelBookings=async (bookingData)=>{
    return await axios.post("http://localhost:5001/staylux-a71c8/us-central1/api/hotel/room-booking",bookingData)
}
export const bookingDetails =async(userId)=>{
     return await axios.get(`http://localhost:5001/staylux-a71c8/us-central1/api/hotel/bookings/${userId}`)
}
export const roomPayment=async(bookingId)=>{
    return axios.put(`http://localhost:5001/staylux-a71c8/us-central1/api/hotel/bookings/${bookingId}`)
}
export const recentBookingDetails=async(hotelId)=>{
     return axios.get(`http://localhost:5001/staylux-a71c8/us-central1/api/hotel/recent-bookings/${hotelId}`)
}