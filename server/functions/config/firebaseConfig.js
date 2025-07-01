const admin =require('firebase-admin');
admin.initializeApp()

const auth=admin.auth();
const db=admin.firestore();


module.exports={admin,auth,db}