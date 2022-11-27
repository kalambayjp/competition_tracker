import React, { useEffect, useState } from "react";
import { logOut } from "../helpers/authentication/index";
import { getRecord } from "../helpers/games/index"
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';

const SideBar = (props) => {
    const {user} = props;
    const [record, setRecord] = useState({wins: 0, losses: 0});
    const { collapseSidebar } = useProSidebar();

    useEffect(() => {
        const fetchData = async () => {
            const gameRecord = await getRecord(user.uid);
            setRecord(gameRecord);
        }
        if(user) {
            fetchData();
        }
    }, [user])

    return(
        <Sidebar className="sidebar">
            <Menu className="sidebar">
                <p>{user ? user.displayName : ""}</p>
                <p>{record ? `Wins: ${record.wins} - Losses: ${record.losses}` : ""}</p>
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