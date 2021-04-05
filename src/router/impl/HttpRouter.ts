import {HttpRouterI} from "@/router/HttpRouterI";
import {UserResponse} from "@/model/UserResponse";
import axios from "axios";
import {HttpResponse} from "@/router/HttpResponse";
import config from "@/Constants"

export class HttpRouter implements HttpRouterI {

    async users(size: number, dataPattern: Record<string, string>): Promise<HttpResponse<UserResponse[] | null>> {
        try {
            return (await axios.get<HttpResponse<UserResponse[] | null>>(
                config.START_URL,
                {
                    params: Object.assign(dataPattern, { rows: size }),
                    transformResponse: data => new HttpResponse(JSON.parse(data), null)
                },
            )).data
        } catch (e: any) {
            return new HttpResponse<UserResponse[] | null>(null, e)
        }
    }
}