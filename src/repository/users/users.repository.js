import { UserDTO } from "../../dtos/index.js";

export default class UsersRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getUsers(findUsers) {
        const result = await this.dao.get(findUsers);
        return result.map((user) => new UserDTO(user));
    }

    async getUser(user) {
        return await this.dao.getOne(user);
    }

    async updateUserWithCart(user, userId){
        return await this.dao.update(user, userId)
    }

    async createUser(user){
        return this.dao.create(user)
    }
}
