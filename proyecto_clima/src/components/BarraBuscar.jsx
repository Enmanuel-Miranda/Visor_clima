import React,{useState}from "react";
// el hook (funcionalidad) de useState nos almacenar valores del componentes


export default function BarraBuscar({onBuscar}){ 
/* onbuscar es algo que resume la asignacion
 Sin desestructuración
const onBuscar = props.onBuscar;

 Con desestructuración
const { onBuscar } = props;
*/

//hook es una funcion

    const estadoBuscar = useState(''); // Inicia el estado de useState, y useState devuelve un Array
    const inputCiudad = estadoBuscar[0]; //el primer valor del array de useState es para almacenar
    const setInputCiudad = estadoBuscar[1]; //el segundo valor del useState es para actualizar


    //actualiza el estado del useState
    const handleInputChange = (e) =>{
        setInputCiudad(e.target.value)
    }
    const handleSubmit = (e) =>{
        e.preventDefault(); //evita que se recargue la pagina
        onBuscar(inputCiudad);// Llama a la función onBuscar del padre, con el valor del input
    };

    return (
        <form onSubmit={handleSubmit}>

            <input
            type="text"
            placeholder = "Ingrese una ciudad"
            value = {inputCiudad}
            onChange={handleInputChange} />

            <button type ="submit">Buscar</button>

        </form>
    )
}
