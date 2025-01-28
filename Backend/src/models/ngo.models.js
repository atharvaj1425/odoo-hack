import mongoose from "mongoose"
import { Schema } from "mongoose"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ngoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        unique: true,     
    },
    pincode: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
}) 

//mongoose middleware hooks
ngoSchema.pre( //pre middleware-event to write a function before saving the document -plugins
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

ngoSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

ngoSchema.methods.generateAccessToken = function() {
    return jwt.sign({   //payload
        _id: this._id,
        email: this.email,
        // ngoname: this.ngoname,
        // fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
)
}

export const Ngo = mongoose.model("Ngo", ngoSchema)
