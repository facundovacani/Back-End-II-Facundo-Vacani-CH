import { UserDTO } from "../../dtos/index.js";
import { userModel } from "../../models/index.js";

export default class UsersDao {
    constructor() {}
    get = async (userFind) => {
        try {
            return await userModel.find(userFind, {
                first_name: 1,
                last_name: 1,
                age: 1,
                role: 1,
            });
        } catch (err) {
            console.error("Error:", err);
            throw new Error("Error in get users - ", err);
        }
    };

    getOne = async (user) => {
        return await userModel.findOne({ email: user });
    };

    update = async (user, userId) => {
        const updateUser = {
            $set: {
                ...user,
            },
        };
        try {
            return await userModel.updateOne({ _id: userId }, updateUser);
        } catch (err) {
            console.error("Error:", err);
            throw new Error("Error in update user - ", err);
        }
    };

    create = async (user) => {
        try {
            await userModel.create(user);
        } catch (err) {
            console.log(err);
            throw new Error("Problema al crear usuario -", err.message);
        }
    };
}
