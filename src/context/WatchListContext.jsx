import { createContext, useContext, useState } from "react";

const WatchListContext = createContext();

function WatchListProvider({children}){
    const [watchList, setWatchList] = useState([]);

    function addWatchList(film){
        setWatchList([...watchList, film]);
        console.log([...watchList, film]);
    }

    function inWatchList(id){
        const elem = watchList.find((film) => (film.id === id));
        if(elem !== undefined){
            return true;
        }else{
            return false;
        }
    }

    function removeWatchList(id){
        const index = watchList.findIndex((film) => film.id === id);
        const copyArray = watchList.toSpliced(index, 1);
        setWatchList(copyArray);        
    }

    

    const valueWatchListContext = {
        watchList,
        addWatchList,
        inWatchList,
        removeWatchList,
    }

    return(
        <WatchListContext value={valueWatchListContext}>
            {children}
        </WatchListContext>
    )
}

function useWatchList(){
    const value = useContext(WatchListContext);
    return value;
}

export {useWatchList, WatchListProvider}