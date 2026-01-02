import { Link } from "react-router-dom";
import { useWatchList } from "../context/WatchListContext"
import style from "../style/WatchList.module.css"

export default function WatchList() {

    const { watchList, removeWatchList } = useWatchList();
    console.log(watchList);

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
            <main className={style.main}>
                <div className="container">
                    {watchList.length > 0 ?
                        <section className={style.list}>
                            <div className={style.title}>
                                <h3>Guarda più tardi</h3>
                            </div>
                            <div className={style.grid}>
                                {watchList.map((film) => (
                                    <div to={`/film/${film.id}`} key={film.id} className={style.card}>
                                        <div className={style.card_img}>
                                            <img src={`https://image.tmdb.org/t/p/w342${film.poster_path}`} alt="" />
                                        </div>
                                        <div className={style.card_body}>
                                            <div className={style.body_header}>
                                                <p className={style.film_title}>{film.title}</p>
                                                <div className={style.valutation}>
                                                    <span>{(film.vote_average / 2).toFixed(1)}</span>
                                                    <div>
                                                    {calcStars(film.vote_average / 2)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={style.film_info}>
                                                <span>{film.release_date.substring(0, 4)}</span>
                                                <span>{Math.trunc(film.runtime / 60)}h {film.runtime - (Math.trunc(film.runtime / 60) * 60)}min</span>
                                            </div>
                                            <div className={style.genres}>
                                                {film.genres.map((genere) => {
                                                    return genere.name
                                                }).join(" - ")}
                                            </div>
                                            <div className={style.overview}>
                                                {film.overview}
                                            </div>
                                            
                                            <div className={style.body_footer}>
                                                <Link className={style.play} to={film.homepage}><i className="bi bi-play-fill"></i>PLAY</Link>
                                                <p onClick={() => removeWatchList(film.id)} className={style.remove_watchList}>Rimuovi</p>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        :
                        <section className={style.list}>
                            <div className={style.title_empty}>
                                <h3>Ancora nessun film nei guarda più tardi</h3>
                            </div>
                        </section>
                    }
                </div>
            </main>
        </>
    )
}