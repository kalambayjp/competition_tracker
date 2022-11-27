import React, { useEffect } from "react";
import { auth } from "../../helpers/authentication/index"
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { ProSidebarProvider } from 'react-pro-sidebar';
import SideBar from "../../components/sidebar";
import NewGame from "../../components/newGame";



const homePage = () => {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    
    useEffect(() => {
        if(!user) {
            router.push("/");
        }
    }, [user])

    return (
        <ProSidebarProvider>
            <div className="main">
                <SideBar user={user}/>
                <div>
                    <NewGame user={user} />
                </div>
            </div>

        </ProSidebarProvider>
    )
}

export default homePage;