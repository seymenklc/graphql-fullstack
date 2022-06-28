import create from 'zustand';
import jwtDecode from 'jwt-decode';

let user = null;

(function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('token');
        } else {
            user = decoded;
        }
    }
    return null;
})();

export const useStore = create(set => ({
    user: user,

    setUser: (userData) => set(state => {
        localStorage.setItem('token', userData.token);
        return ({ user });
    }),
    removeUser: () => set(state => {
        localStorage.removeItem('token');
    })
}));