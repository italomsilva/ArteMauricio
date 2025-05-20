export interface AuthTokenGateway{
    signIn(payload:Payload):Promise<string>;
    verify(token:string):Promise<Payload>;
}

export type Payload = {
    login:string,
    password:string
}