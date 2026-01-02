import axios from "axios";
import { useEffect, useState } from "react";
import style from "../style/Cerca.module.css";
import { Link } from "react-router-dom";

export default function Cerca() {
    const keyApi = import.meta.env.VITE_API_KEY;

    const [films, setFilms] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filterName, setFilterName] = useState("");
    const [load, setLoad] = useState(false)
    const [open, setOpen] = useState(false)

    const [filterGenre, setFilterGenre] = useState("")

    const [idOver, setIdOver] = useState(-1);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${keyApi}`).then((resp) => {
            setGenres(resp.data.genres);
        })
    }, [])
    
    function searchFilms(event) {
        setLoad(false)
        event.preventDefault();
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${keyApi}&query=${filterName}`).then((resp) => {
            console.log(resp.data.results[1]);
            let copyArray = resp.data.results;
            if(filterGenre !== ""){
                copyArray = resp.data.results.filter((film) => film.genre_ids.includes(parseInt(filterGenre)))
            }
            setOpen(true);
            setFilms(copyArray);
            setLoad(true);
        })
        
    }

    return (
        <>
            <main className={style.main}>
                <form onSubmit={() => searchFilms(event)} className={style.form}>
                    <input type="text" placeholder="Cerca per nome..." value={filterName} onChange={(event) => setFilterName(event.target.value)} />
                    <select name="genre" id="genre" value={filterGenre} onChange={() => setFilterGenre(event.target.value)}>
                        <option value="" >Scegli un genere</option>
                        <option value="" ></option>
                        {genres.map((genere, index) => (
                            <option key={index} value={genere.id}>{genere.name}</option>
                        ))}
                    </select>
                    <button type="submit">CERCA</button>
                </form>
                {open && (load ? (films.length !== 0 ?
                    <section className={`container ${style.section_film}`}>
                        <div className={style.ricerca}>
                            <h2>Risultati per: {filterName}</h2>
                        </div>
                        <div className={style.grid}>
                            {films.map((film) => (
                                film.backdrop_path !== null &&
                                <Link to={`/film/${film.id}`} key={film.id} className={`relative ${style.card}`} onMouseOver={() => setIdOver(film.id)} onMouseLeave={() => setIdOver(-1)}>
                                    <div className={style.card_img}>
                                        <img src={`https://image.tmdb.org/t/p/w342${film.poster_path}`} alt="" />
                                    </div>
                                    <div className={style.card_body}>
                                        <p>{film.title}</p>
                                    </div>
                                    <div className={`${style.overCard} ${film.id === idOver ? style.overCardOver : ""}`}>
                                        <i className="bi bi-hand-index"></i>
                                        <p>More info</p>
                                    </div>
                                </Link>
                            ))}

                        </div>
                    </section> :
                    <div className={style.notFound}>
                        <h3>Nessun film trovato</h3>
                    </div>
                ) : (
                    <div className={style.notFound}>
                        <span className={style.loading}><i className="bi bi-arrow-repeat"></i></span>
                    </div>
                )
                )
                }
            </main>
        </>
    )
}