/**
 * [HttpResponse] - response by returned from axios.
 * @param data
 * @param error
 */
export class HttpResponse<T> {
    data?: T
    error?: any | null | undefined

    get isSuccessful(): boolean {
        return this.data != null && this.error == null
    }

    constructor(data?: T, error?: any | null | undefined) {
        this.data = data
        this.error = error
    }
}