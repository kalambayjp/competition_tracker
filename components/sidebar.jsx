import React from "react";
import { logOut } from "../helpers/authentication/index"
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';

const SideBar = (props) => {
    const {user} = props;
    const { collapseSidebar } = useProSidebar();

    return(
        <Sidebar className="sidebar">
            <Menu className="sidebar">
                <p>{user ? user.displayName : ""}</p>
                <p>record</p>
                <button onClick={logOut}>Log out</button>
                <main>
                    <button onClick={() => collapseSidebar()}>Collapse</button>
                </main>
                <button onClick={logOut}>logout</button>
            </Menu>
        </Sidebar>
    )
}

export default SideBar