import { Link, NavLink, useNavigate, useParams } from "react-router-dom"
import style from "../style/Film.module.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { useWatchList } from "../context/WatchListContext";

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

export default function Film() {
    const params = useParams();
    const navigation = useNavigate();
    const apiKey = import.meta.env.VITE_API_KEY;
    const [film, setFilm] = useState({});
    const [load, setLoad] = useState(false);
    const [stars, setStars] = useState([]);

    const { addWatchList, inWatchList, removeWatchList } = useWatchList();



    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}`).then((resp) => {
            console.log(resp.data);
            let voto = resp.data.vote_average / 2;

            setStars(calcStars(voto));
            setFilm(resp.data);
            setLoad(true);
        }).catch((err) => {
            navigation("*")
        })
    }, [])

    function calcStars(voto) {
        let prova = [];
        for (let i = 0; i < Math.trunc(voto); i++) {
            prova.push(<i className="bi bi-star-fill"></i>)
        }
        if (voto - Math.trunc(voto) >= 0.5) {
            prova.push(<i className="bi bi-star-half"></i>)
            voto += 1;
        }
        for (let i = 0; i < (5 - Math.trunc(voto)); i++) {
            prova.push(<i className="bi bi-star"></i>)
        }
        return prova
    }

    return (
        <>
            {load && <>
                <section className={`relative ${style.hero_section}`}>
                    <img className={style.img_hero} src={`https://image.tmdb.org/t/p/w342${film.backdrop_path}`} alt="" />
                    <div className={style.hero_body}>
                        <h2>{film.title}</h2>
                        <div className={style.film_info}>
                            <span>{film.release_date.substring(0, 4)}</span>
                            <span>{Math.trunc(film.runtime / 60)}h {film.runtime - (Math.trunc(film.runtime / 60) * 60)}min</span>
                            <span>{film.genres[0].name}</span>
                        </div>
                        <div className={style.film_genres}>
                            {film.genres.map((genere) => (
                                <p>{genere.name}</p>
                            ))}
                        </div>
                        <div className={style.button_hero}>
                            <Link to={film.homepage} className={style.play}><i className="bi bi-play-fill"></i>Play</Link>
                            {inWatchList(film.id) ?
                                <button onClick={() => removeWatchList(film.id)} className={style.remove}>Rimuovi guarda più tardi</button>
                                :
                                <button onClick={() => addWatchList(film)} className={style.add}>Guarda più tardi</button>
                            }
                        </div>
                    </div>
                </section>
                <main className={style.main}>
                    <div className="container">
                        <section className={style.list}>
                            <div className={style.title}>
                                <h3>Descrizione</h3>
                                <div className={style.voto}>
                                    <span>{(film.vote_average / 2).toFixed(1)}</span>
                                    <span>
                                        {stars}
                                    </span>
                                </div>

                            </div>
                            <h4 className={style.overview}>{film.overview}</h4>
                        </section>
                        <section className={style.list}>
                            <div className={style.title}>
                                <h3>Compagnie di produzione</h3>
                                <div>
                                    <i className="bi bi-arrow-left"></i>
                                    <i className="bi bi-arrow-right"></i>
                                </div>
                            </div>
                            <div className={style.grid}>
                                {film.production_companies.map((company) => (
                                    <div key={company.id} className={style.card}>
                                        <div className={style.card_img}>
                                            {company.logo_path === null ?
                                                <img className={style.emptyImg} src={`https://semantic-ui.com/images/wireframe/image.png`} alt="" />
                                                :
                                                <img src={`https://image.tmdb.org/t/p/original${company.logo_path}`} alt="" />
                                            }
                                        </div>
                                        <div className={style.card_body}>
                                            <p>{company.name}</p>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </section>
                    </div>
                </main>
            </>
            }
        </>
    )
}