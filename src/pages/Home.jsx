import { Link, NavLink } from "react-router-dom"
import style from "../style/Home.module.css"
import { useEffect, useState } from "react"
import axios from "axios"

const navbarLinks = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Guarda più tardi",
        path: "/watchlist",
    },
    {
        name: "Cerca",
        path: "/search",
    },
]

export default function Home() {
    const keyApi = import.meta.env.VITE_API_KEY;
    const [heroFilm, setHeroFilm] = useState({})
    const [popolarFilms, setPopolarFilms] = useState([])
    const [topRatedFilms, setTopRatedFilms] = useState([])
    const [upcomingFilms, setUpcomingFilms] = useState([])
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/784651?api_key=${keyApi}`).then((resp) => {
            setHeroFilm(resp.data);
        })
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${keyApi}`).then((resp) => {
            setPopolarFilms(resp.data.results)
        })
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${keyApi}`).then((resp) => {
            setTopRatedFilms(resp.data.results)
        })
        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${keyApi}`).then((resp) => {
            setUpcomingFilms(resp.data.results)
        })
    }, [])
    return (
        <>
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
                    <h2>{heroFilm.title}</h2>
                    <p>{heroFilm.overview}</p>
                    <div className={style.button_hero}>
                        <Link to={heroFilm.homepage} className={style.play}><i className="bi bi-play-fill"></i>Play</Link>
                        <Link to={`/film/${heroFilm.id}`} className={style.info}>Info</Link>
                    </div>
                </div>
            </section>
            <main className={style.main}>
                <div className="container">
                    <section className={style.list}>
                        <div className={style.title}>
                            <h3>Più popolari</h3>
                            <div>
                                <i className="bi bi-arrow-left"></i>
                                <i className="bi bi-arrow-right"></i>
                            </div>
                        </div>
                        <div className={style.grid}>
                            {popolarFilms.map((film) => (
                                <Link to={`/film/${film.id}`}  key={film.id} className={style.card}>
                                    <div className={style.card_img}>
                                        <img src={`https://image.tmdb.org/t/p/w342${film.poster_path}`} alt="" />
                                    </div>
                                    <div className={style.card_body}>
                                        <p>{film.title}</p>
                                    </div>
                                </Link>
                            ))}

                        </div>
                    </section>
                    <section className={style.list}>
                        <div className={style.title}>
                            <h3>Più votati</h3>
                            <div>
                                <i className="bi bi-arrow-left"></i>
                                <i className="bi bi-arrow-right"></i>
                            </div>
                        </div>
                        <div className={style.grid}>
                            {topRatedFilms.map((film) => (
                                <Link to={`/film/${film.id}`}  key={film.id} className={style.card}>
                                    <div className={style.card_img}>
                                        <img src={`https://image.tmdb.org/t/p/w342${film.poster_path}`} alt="" />
                                    </div>
                                    <div className={style.card_body}>
                                        <p>{film.title}</p>
                                    </div>
                                </Link>
                            ))}

                        </div>
                    </section>
                    <section className={style.list}>
                        <div className={style.title}>
                            <h3>In arrivo...</h3>
                            <div>
                                <i className="bi bi-arrow-left"></i>
                                <i className="bi bi-arrow-right"></i>
                            </div>
                        </div>
                        <div className={style.grid}>
                            {upcomingFilms.map((film) => (
                                <Link to={`/film/${film.id}`} key={film.id} className={style.card}>
                                    <div className={style.card_img}>
                                        <img src={`https://image.tmdb.org/t/p/w342${film.poster_path}`} alt="" />
                                    </div>
                                    <div className={style.card_body}>
                                        <p>{film.title}</p>
                                    </div>
                                </Link>
                            ))}

                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}