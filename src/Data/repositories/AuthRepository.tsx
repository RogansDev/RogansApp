import { AxiosError } from "axios";
import { User } from "../../Domain/entity/User";
import { AuthRepository } from "../../Domain/repositories/AuthRepositories";
import { ApiRogans } from "../source/remote/api/ApiRogans";
import { ResponseAPIRogans } from "../source/remote/models/ResponseApiRogans";

export class AuthRepositoryImpl implements AuthRepository {

    async register(user: User): Promise<ResponseAPIRogans> {
        try {
            const response = await ApiRogans.post<ResponseAPIRogans>('/users/create', user);
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR', + JSON.stringify(e.response?.data));
            const apiError:ResponseAPIRogans = JSON.parse(JSON.stringify(e.response?.data))
            return Promise.resolve(apiError)
        }
    }
}