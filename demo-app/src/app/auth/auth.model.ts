export interface AuthSignUpResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

export interface AuthSignUpRequest {

    email: string;
    password: string;
    returnSecureToken: boolean;
}