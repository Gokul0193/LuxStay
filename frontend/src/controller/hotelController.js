import { hotelReg,roomReg } from "../model/hotelModel.js"

export const hotelRegistration = async (userId, hotel, phone, address, city) => {
    return await hotelReg({ userId, hotel, phone, address, city });
};


export const roomRegistration = async (userId,roomType,price,amenities,isAvailable) => {
    return await roomReg({ userId, roomType, price, amenities,isAvailable });
};
