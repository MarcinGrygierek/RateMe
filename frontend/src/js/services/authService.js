export default class AuthService {
    providerLogin(email, password) {
        if(email === 'provider@email.com' && password === 'provider') {
            sessionStorage.setItem('token', 123456);
            return true;
        }
        return false;
    }

    logout() {
        sessionStorage.clear();
        console.log(sessionStorage.getItem('token'));
        return true;
    }

    isSignedIn() {
        const token = sessionStorage.getItem('token');
        console.log(token ? true : false);
        return token ? true : false;
    }
}