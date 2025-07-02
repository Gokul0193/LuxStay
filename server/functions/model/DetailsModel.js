const {db} =require('../config/firebaseConfig');

exports.userDetails=async (id)=>{

        const userRef=db.collection("users").doc(id);
        const doc= await userRef.get()
        return doc.data()
}