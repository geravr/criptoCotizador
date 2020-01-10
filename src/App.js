import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './Components/Formulario';
import Spinner from './Components/Spinner';
import Cotizacion from './Components/Cotizacion';
import axios from 'axios'

import imagen from './criptomonedas.png'

function App() {

  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState({});

  useEffect(() => {
    const cotizarCriptomoneda = async () => {

      //Si no hay moneda, no ejecutar
      if (moneda === '') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      //Mostrar Spinner
      setCargando(true);

      //Ocultar Spinner y agregar resultado al state
      setTimeout(() => {
        setCargando(false);
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 1500);
    }
    cotizarCriptomoneda();
  }, [criptomoneda, moneda])

  //Mostrar spinner o resultado
  const componente = (cargando) ? <Spinner />  : <Cotizacion resultado={resultado}/>;

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <img src={imagen} alt="imagen criptomonedas" className="logotipo"/>
          </div>
          <div className="one-half column">
            <h1>Cotiza Criptomonedas ahora</h1>
            <Formulario
            setMoneda={setMoneda}
            setCriptomoneda={setCriptomoneda}
            />

            {componente}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
