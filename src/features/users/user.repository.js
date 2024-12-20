import mongoose from "mongoose";
import userSchema from "./user.schema.js";

const UserModel =  mongoose.model("User",userSchema)

export default class UserRepository{
    constructor(){}

    async signUp(userDetails){
        try {
            const addedUser = new UserModel(userDetails)
            await addedUser.save()
            return addedUser
        } catch (error) {
            throw new error("something went wrong")
        }
    }

    async signIn(email){
        try {
            const userFound = await UserModel.findOne({email})
            if(userFound){
                return userFound
            } else {
                throw new error("no such user")
            }
        } catch (error) {
            throw new error("something went wrong")
        }
    }
}