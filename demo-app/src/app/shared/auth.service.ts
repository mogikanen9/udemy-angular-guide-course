/**
 * Fake Auth Service
 */
export class AuthService {
    private isLoggedIn = false;

    isAuthenticated(): boolean {
        return this.isLoggedIn;
    }

    signIn(): void {
        this.isLoggedIn = true;
    }

    signOut(): void {
        this.isLoggedIn = false;
    }
}