import { ResponseAPIRogans } from "../../Data/source/remote/models/ResponseApiRogans";
import { User } from "../entity/User";

export interface AuthRepository {

    register(user: User): Promise<ResponseAPIRogans>
}