import {UserResponse} from "@/model/UserResponse";
import {HttpResponse} from "@/router/HttpResponse";

/**
 * [HttpRouterI] - interface for implementation http router.
 */
export interface HttpRouterI {
    users(
        size: number,
        dataPattern: Record<string, string>
    ): Promise<HttpResponse<UserResponse[] | null>>
}