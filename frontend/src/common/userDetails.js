export const userData =()=>{
    const userData=localStorage.getItem('Users');
    if(userData){
        return JSON.parse(userData);
    }
}


export const userId =()=>{
    const userData=localStorage.getItem('UserId');
    if(userData){
        return JSON.parse(userData);
    }
}
