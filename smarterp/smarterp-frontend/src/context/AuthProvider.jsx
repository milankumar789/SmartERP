import {

    useCallback,

    useMemo,

    useState

} from "react";

import {

    jwtDecode

} from "jwt-decode";

import AuthContext from "./AuthContext";

import {

    getToken,

    getUser,

    saveToken,

    saveUser,

    clearStorage

} from "../utils/storage";

export default function AuthProvider({

    children

}) {

    const [

        token,

        setToken

    ] = useState(

        getToken()

    );

    const [

        user,

        setUser

    ] = useState(

        getUser()

    );

    const login = useCallback((response) => {

        const jwt = response.token;

        const decoded = jwtDecode(jwt);

        const currentUser = {

            email: decoded.sub

        };

        saveToken(jwt);

        saveUser(currentUser);

        setToken(jwt);

        setUser(currentUser);

    }, []);

    const logout = useCallback(() => {

        clearStorage();

        setToken(null);

        setUser(null);

    }, []);

    const value = useMemo(() => ({

        token,

        user,

        isAuthenticated: !!token,

        login,

        logout

    }), [

        token,

        user,

        login,

        logout

    ]);

    return (

        <AuthContext.Provider

            value={value}

        >

            {children}

        </AuthContext.Provider>

    );

}