const mongoose=require('mongoose')

const connectDatabase=async()=>{
    try{
   
       await  mongoose.connect(process.env.DB_URI,{useNewUrlParser:true});
        console.log(`Mongodb connected with server: ${mongoose.connection.host}`.yellow)

    }
    catch(error){ 
    console.error("Error connecting to MongoDB:", error);
    }
 
}

module.exports = connectDatabase;



 