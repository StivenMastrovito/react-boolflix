import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const [timer, setTimer] = useState(5);
    const navigate = useNavigate();
    
    useEffect(()=>{
        setTimeout(()=>{
            navigate("/")
        }, 4000)
        setInterval(()=>{
            setTimer((current) => current - 1);
        }, 1500)
    },[])

    return (
        <>
            <div className="wrapper">
                <h1>Error 404, Not Found</h1>
                <h3>Sarai renderizzatto automaticamente alle Home tra: {timer} sec</h3>
            </div>
        </>
    )
}