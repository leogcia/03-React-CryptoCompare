import styled from "@emotion/styled";
import { useState } from "react";

const Label = styled.label`
    color: #fff;
    display: block;
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`
const Select = styled.select`
    width: 100%;
    font-size: 18px;
    padding: 14px;
    border-radius: 10px;
`

function useSelectMonedas(label, opciones) {   // Que parámetros recibe
    const [state, setState] = useState('');    //state con nombres genéricos porque se va a reutilizar

    const SelectMonedas = () => (
        <>
            <Label>{label}</Label>

            <Select
                value={state}
                onChange={e => setState(e.target.value)}
            >
                <option value="">Seleccione</option>
                {opciones.map(opcion => (
                    <option
                        key={opcion.id}
                        value={opcion.id}
                    >{opcion.nombre}</option>
                ))}
            </Select>
        </>
    )

    return [ state, SelectMonedas ];   //retorna en destructuring array todo lo necesario para el uso del hook
}

export default useSelectMonedas;