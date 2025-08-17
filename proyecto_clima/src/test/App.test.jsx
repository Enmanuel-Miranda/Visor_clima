import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import axios from 'axios';
import App from "../App";

//simulando axios
vi.mock('axios');


describe('Componente App', () => {

  // comprueba el renderizado en la pagina
  test('el componente se renderiza con el encabezado y los controles de busqueda', () => {
    render(<App />);
    
    //verificamos elementos en la pagina
    expect(screen.getByText('Visor de Clima')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingrese una ciudad')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument();
  });

  //comprueba elcomportamiento exitoso
  test('Obtiene y muestra datos del clima para una ciudad válida', async () => {
    //simula una respuesta de la api
    const mockWeatherData = {
      name: 'Lima',
      main: { temp: 25, feels_like: 24, humidity: 75 },
      weather: [{ description: 'cielo claro' }],
      wind: { speed: 3.5 },
    };
    axios.get.mockResolvedValue({ data: mockWeatherData });

    render(<App />);

    //interaccion del usuario
    fireEvent.change(screen.getByPlaceholderText('Ingrese una ciudad'), { target: { value: 'Lima' } });
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));

    await waitFor(() => {
      expect(screen.getByText('Lima')).toBeInTheDocument();
      expect(screen.getByText('Temperature: 25ºC')).toBeInTheDocument();
      expect(screen.getByText('Description:cielo claro')).toBeInTheDocument();
      expect(screen.getByText('Humedad: 75%')).toBeInTheDocument();
    });
  });

  //prueba de errores
  test('Muestra un mensaje de error para una ciudad no válida', async () => {
    //simula una respuesta fallida
    axios.get.mockRejectedValue({ response: { status: 404 } });
    
    render(<App />);
//simula una interaccion con el usuario
    fireEvent.change(screen.getByPlaceholderText('Ingrese una ciudad'), { target: { value: 'invalida' } });
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));
    
    await waitFor(() => {
      expect(screen.getByText('Ciudad no encontrada')).toBeInTheDocument();
    });

    expect(screen.queryByText('Temperature')).not.toBeInTheDocument();
  });

});