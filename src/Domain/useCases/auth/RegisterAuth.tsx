import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository"; 
import { User } from "../../entity/User";

const { register } = new AuthRepositoryImpl();

export const RegisterAuthUseCases = async(user: User) => {
    return await register(user);
}