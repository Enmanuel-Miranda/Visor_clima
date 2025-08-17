import React from "react";

export default function InformacionAdicional({datos}){
    if(!datos){
        return null
    }
    return(
        <>
        <div>
            <h3>Informacion Adicional</h3>
            <p>Humedad: {datos.main.humidity}%</p>
            <p>Viento: {datos.wind.speed} m/s</p>
            <p>Sensacion Termica: {Math.round(datos.main.feels_like)}ºC</p>
        </div></>
    )
}