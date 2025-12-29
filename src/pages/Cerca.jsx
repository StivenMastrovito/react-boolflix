import axios from "axios";
import { useEffect, useState } from "react";
import style from "../style/Cerca.module.css";

export default function Cerca() {
    const keyApi = import.meta.env.VITE_API_KEY;

    const [films, setFilms] = useState([]);
    const [filterName, setFilterName] = useState("");
    const [load, setLoad] = useState(false)
    const [open, setOpen] = useState(false)

    function searchFilms(event) {
        setLoad(false)
        event.preventDefault();
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${keyApi}&query=${filterName}`).then((resp) => {
            setOpen(true);
            setFilms(resp.data.results);
            console.log(resp.data.results);
            setLoad(true);
        })
    }

    return (
        <>
            <main className={style.main}>
                <form onSubmit={() => searchFilms(event)} className={style.form}>
                    <input type="text" placeholder="Cerca per nome..." value={filterName} onChange={(event) => setFilterName(event.target.value)} />
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
                                <div key={film.id} className={style.card}>
                                    <div className={style.card_img}>
                                        <img src={`https://image.tmdb.org/t/p/w342${film.backdrop_path}`} alt="" />
                                    </div>
                                    <div className={style.card_body}>
                                        <p>{film.title}</p>
                                    </div>
                                </div>
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