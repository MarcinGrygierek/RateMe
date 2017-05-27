export default class AuthService {
    login(email, password) {
        let ok = false;
        if (email === 'p' && password === 'p') {
            localStorage.setItem('role', 'ROLE_SERVICE');
            ok = true;
        }
        else if (email === 'c' && password === 'c') {
            localStorage.setItem('role', 'ROLE_CLIENT');
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
}