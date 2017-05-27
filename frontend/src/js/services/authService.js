export default class AuthService {
    providerLogin(email, password) {
        if(email === 'provider@email.com' && password === 'provider') {
            localStorage.setItem('token', 123456);
            return true;
        }
        return false;
    }

    logout() {
        localStorage.clear();
        console.log(localStorage.getItem('token'));
        return true;
    }

    isSignedIn() {
        const token = localStorage.getItem('token');
        console.log(token ? true : false);
        return token ? true : false;
    }
}