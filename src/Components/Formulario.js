import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Criptomoneda from './Criptomoneda';
import Error from './Error';

function Formulario({setMoneda, setCriptomoneda}) {

    const [criptomonedas, setCriptomonedas] = useState([]);
    const [monedaCotizar, setMonedaCotizar] = useState('');
    const [criptoCotizar, setCriptoCotizar] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {

        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            //Guardar respuesta en el state
            setCriptomonedas(resultado.data.Data);
        }
        consultarAPI();

    }, []);

    // Validar que el usuario llene todos los campos
    const cotizarMoneda = e => {
        e.preventDefault();

        //Validar si ambos campos están llenos
        if(monedaCotizar === '' || criptoCotizar === '') {
            setError(true);
            return;
        } 

        //Pasar los datos al componente principal
        setMoneda(monedaCotizar);
        setCriptomoneda(criptoCotizar);

        setError(false);

    }

    // Monstrar el error si es true
    const componente = (error) ? <Error mensaje="Ambos campos son obligatorios" /> : null;

    return ( 
        <form
        onSubmit={cotizarMoneda}
        >
            {componente}
            <div className="row">
                <label>Elige tu Moneda</label>
                <select
                    className="u-full-width"
                    onChange={e => setMonedaCotizar(e.target.value) }
                >
                    <option value="">- Elige tu moneda</option>
                    <option value="USD">Dólar Estadounidense</option>
                    <option value="MXN">Peso Mexicano</option>
                    <option value="GBP">Libras</option>
                    <option value="EUR">Euro</option>
                </select>
            </div>

            <div className="row">
                <label>Elige tu Criptomoneda</label>
                <select
                    className="u-full-width"
                    onChange={e => setCriptoCotizar(e.target.value) }
                >
                    <option value="">- Elige tu Criptomoneda</option>
                    {criptomonedas.map((criptomoneda, indice) => (
                        <Criptomoneda
                        criptomoneda={criptomoneda}
                        key={criptomoneda.CoinInfo.Id}
                        />
                    ))}
                </select>
            </div>

            <input type="submit" className="button-primary u-full-width" value="Calcular"/>

        </form>
     );
}
 
export default Formulario;