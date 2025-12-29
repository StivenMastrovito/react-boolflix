import { NavLink } from "react-router-dom"
import style from "../style/Header.module.css"
const navbarLinks = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Cerca",
        path: "/search",
    },
]

export default function Header() {
    return (
        <>
            <header className={style.header}>
                <h1>Booflix</h1>
                <ul className={style.navbar}>
                    {navbarLinks.map((link, index) => (
                        <li key={index}><NavLink to={link.path}>{link.name}</NavLink></li>
                    ))}
                </ul>
            </header>
        </>
    )
}