export default class AuthService {
    login(email, password) {
        let ok = false;
        if (email === 'ork@mordor.pl' && password === 'aaa') {
            localStorage.setItem('role', 'ROLE_SERVICE');
            localStorage.setItem('id', 108);
            ok = true;
        }
        else if (email === 'orel.jan@gmail.com' && password === 'aaa') {
            localStorage.setItem('role', 'ROLE_CLIENT');
            localStorage.setItem('id', 4);
            ok = true;
        }

        if (ok) {
            localStorage.setItem('token', 123456);
            localStorage.setItem('email', email);
        }

        return ok;
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

    getRole() {
        return localStorage.getItem('role');
    }

    getEmail() {
        return localStorage.getItem('email');
    }

    getId() {
        return localStorage.getItem('id');
    }
}