import { useEffect, useState } from 'react';
import styled from '@emotion/styled/';
import ImagenCripto from './img/imagen-criptos.png';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media(min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`
const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color:#fff;
  text-align: center;
  font-weight: 700;
  margin-top:80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content:'';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {
  const [monedas, setMonedas] = useState({});    //state necesario para consultar que monedas se van a comparar desde el Formulario
  const [resultado, setResultado] = useState({});  //state necesario para almacenar el resultado obtenida desde la API
  const [cargando, setCargando] = useState(false);  // state del spinner de cargando información

  useEffect(()=>{        
    if(Object.keys(monedas).length > 0) {
      setCargando(true)        //mostrar el spinner antes de cargar los datos
      setResultado({})          //ocultar los resultados previos mientras se carga el siguiente
      const cotizarCripto = async () => {
        const {moneda, criptomoneda} = monedas     // extraigo los 2 parametros de monedas para compararlas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        //La API manda un resultado de la forma de la siguiente linea, sin embargo para hacer dinamica esa informacion colocamos entre [] los parametros que teniamos (criptomoneda, moneda), asi lograremos "reutilizar" la informacion cada que cambiemos las monedas a comparar... De lo contrario tendríamos que hacer 20 comparaciones o todas las necesarias
        setResultado(resultado.DISPLAY[criptomoneda][moneda])
        setCargando(false)
      }
      cotizarCripto();
    }
  },[monedas]);                // effect que escuchará los cambios realizados en monedas

  return (
    <Contenedor>
      <Imagen
        src={ImagenCripto}
        alt="imagen criptos"
      />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          setMonedas={setMonedas}                     
        />
        {cargando && <Spinner/>}
        {resultado.PRICE && <Resultado resultado={resultado}/>}     {/* resultado.PRICE viene de la informacion otorgada desde la API... lo utilizamos para solo mostrar cuando se hace una consulta */}
      </div>
    </Contenedor>
  )
}

export default App
