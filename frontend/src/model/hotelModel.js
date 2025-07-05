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


