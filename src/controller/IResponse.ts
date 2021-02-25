/**
 * The response interface of our Login System. 
 * It has two main fields:
 *  - code (It is one of: 200, 202, 204, 400, 402, 404)
 *  - message (A textual information about the response)
 */
export default interface IResponse {
    code: number
    message: string
    data?: any
}