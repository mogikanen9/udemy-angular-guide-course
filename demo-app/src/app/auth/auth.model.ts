export interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

export interface AuthRequest {

    email: string;
    password: string;
    returnSecureToken: boolean;
}