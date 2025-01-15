import { ReactNode, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AuthWrapper = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        const token = cookies.token;
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    return <>{children}</>;
};

export default AuthWrapper;