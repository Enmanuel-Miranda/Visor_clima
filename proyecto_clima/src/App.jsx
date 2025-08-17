import  {useEffect, useState} from 'react';
import axios from "axios";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//importamos los componentes
import BarraBuscar from './components/BarraBuscar';
import ContenedorClima from './components/ContenedorClima';
import InformacionAdicional from './components/InformacionAdicional';

const API_KEY = "Tu ClaveApi";



function App() {
  const [ciudad, setCiudad] = useState(''); //guarda la ciudad que el usuario esta buscando
  const [datosClima, setDatosClima] = useState(null); //almacena los datos de la API
  const [loading, setLoading] = useState(false);  //evitar mostrar el mensaje de carga
  const [error, setError] = useState(null); // guarda el mensaje de errorsi la busqueda falla

  //UseEffect se encarga de renderizar componenetes cuando se actualiza el estado
  useEffect(()  =>{
    if (!ciudad){setDatosClima(null); return;} //si no hay ciudad, no se hace nada
    setLoading(true); //inicia el estado de carga
    setError(null); //reinicia el error

    //LLamamos a la API
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${API_KEY}&lang=es`)
      .then((respuesta) => {
        setDatosClima(respuesta.data); //guardamos losdatos de la api
      })
      .catch(err => {
        setError('Ciudad no encontrada');//si hay un error, muestra el siguiente mensaje
        setDatosClima(null); //reinicia los datos del clima
      })
      .finally(() => {
        setLoading(false); //desactivamos el estado de carga
      });
  } , [ciudad]); 
  
  const handleBuscar = (nuevaCiudad) => {
    setCiudad(nuevaCiudad); //actualiza el estado de nueva ciudad
  };

  return (
    <>
    <h1>Visor de Clima</h1>
    <BarraBuscar onBuscar={handleBuscar} />
    {loading && <p>Cargando...</p>} {/*muestra el mensaje de carga si loading es true*/}
    {error && <p className="error">{error}</p>} {/*muestra el mensaje de error si hay un error*/}
    {datosClima && (
      <>
        <ContenedorClima datos = {datosClima} />
        <InformacionAdicional datos = {datosClima} />
      </>
    )}

     
    </>
  );
}

export default App
