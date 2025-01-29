import mongoose,{Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
    }
}, { timestamps:true })

volunteerSchema.pre( //pre middleware-event to write a function before saving the document -plugins
    "save",  //type of document middleware , querry middleware - findOne etc.
    async function(next){
        if(this.isModified("password")){
            try{
                this.password = await bcrypt.hash(this.password, 10);
                next();
            }
            catch(err){
                console.log(err);
                next(err);
            }
        } else {
                next();
            }
    }
);

volunteerSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

volunteerSchema.methods.generateAccessToken = function() {
    return jwt.sign({   //payload
        _id: this._id,
        email: this.email,
        // username: this.username,
        // fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
)
}

export const Volunteer = mongoose.model("Volunteer", volunteerSchema)
