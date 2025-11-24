import { createContext, useContext, useEffect, useState } from "react";
import { getMyDetails } from "../Services/auth";

//use for save auth info like token, user details etc.
const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    //On component mount, check if token exists and fetch user details, if token is saved in localstorage, set user details in context otherwise user will be null
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            getMyDetails().then((res) => {
                setUser(res?.data);
            })
            .catch((err) => {
                //if token expire or me api call fail
                setUser(null);
                console.error('Failed to fetch user details:', err);
            })
            .finally(() => {
                setLoading(false);
            });
        } else {
            setUser(null);
            setLoading(false);
        }
    },[]);
    //Use of useEffect is to perform side effects in functional components, here it runs once on mount to check for existing auth state.

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

//{user, setUser}
export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}