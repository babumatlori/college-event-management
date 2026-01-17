import { useContext } from "react"
import AuthContext from "./AuthContextPage"

const useAuthGuard = (requiredRole = null) => {
    const { currentUser, token,loading } = useContext(AuthContext);

    if(loading) {
        return {status: 'LAODING'}
    }

    if(!token || !currentUser) {
        return {status: 'UNAUTHENTICATED'}
    }

    if(requiredRole && currentUser.role !== requiredRole) {
        return {status: 'UNAUTHORIZED'}
    }

    return { status: "AUTHORIZED", user: currentUser};

};

export default useAuthGuard;
