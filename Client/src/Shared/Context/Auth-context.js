import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    chefId : null,
    login:() => {},
    logout:() =>{}
});
