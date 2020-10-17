export class User {
    constructor(readonly email: string, readonly id: string, private _token: string, private _tokenExpirationDate: Date) { }

    get token(): string {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        } else {
            return this._token;
        }

    }
}