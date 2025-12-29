import { Link, NavLink, useParams } from "react-router-dom"
import style from "../style/Film.module.css"
import { useEffect, useState } from "react";
import axios from "axios";

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

export default function Film(){
    const params = useParams();
    const apiKey = import.meta.env.VITE_API_KEY;
    const [film, setFilm] = useState({});
    const [load, setLoad] = useState(false);
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}`).then((resp) => {
            console.log(resp.data);
            setFilm(resp.data);
            setLoad(true);
        })
    }, [])    
    return(
        <>
        {load && <>
        <section className={style.hero_section}>
                <header className={style.header}>
                    <h1>Booflix</h1>
                    <ul className={style.navbar}>
                        {navbarLinks.map((link, index) => (
                            <li key={index}><NavLink to={link.path}>{link.name}</NavLink></li>
                        ))}
                    </ul>
                </header>
                <div className={style.hero_body}>
                    <h2>{film.title}</h2>
                    <div className={style.film_info}>
                        <span>{film.release_date.substring(0,4)}</span>
                        <span>{Math.trunc(film.runtime / 60)}h {film.runtime - (Math.trunc(film.runtime / 60) * 60)}min</span>
                        <span>{film.genres[0].name}</span>
                    </div>
                    <div className={style.button_hero}>
                        <Link to={film.homepage} className={style.play}><i className="bi bi-play-fill"></i>Play</Link>
                        <Link to={``} className={style.info}>Guarda più tardi</Link>
                    </div>
                </div>
            </section>
        <main className={style.main}>
            <h1>{params.id}</h1>
        </main>
        </>
        }
        </>
    )
}