import React from "react";

export default function ContenedorClima({datos}){
    if (!datos){
        return null
    }
    return(
        <>
        <div>
            <h2>{datos.name}</h2>
            <p>Temperature: {Math.round(datos.main.temp)}ºC</p>
            <p>Description:{datos.weather[0].description}</p>
        </div>
        </>
    )

}