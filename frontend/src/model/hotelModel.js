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



