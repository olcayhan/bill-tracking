import React from 'react'
import { useSignOut } from 'react-auth-kit';
import "./header.css"

function Header() {
    const signOut = useSignOut()

    return (
        <nav className="header-navbar" >
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="checkbtn">
                <i className="fa-solid fa-bars"></i>
            </label>
            <ul>
                <li><a href='/login' onClick={() => {
                    signOut()
                }} className="">ÇIKIŞ YAP</a></li>

            </ul>
        </nav >
    );
}

export default Header;