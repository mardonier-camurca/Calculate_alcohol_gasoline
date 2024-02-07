import { useState, FormEvent } from 'react';
import './App.css'

import logoImg from './assets/logo.png';

/* Calculo: alcool / gasolina
E se o resultado for menor 0.7 compensa usar álcool
*/

interface InfoProps{
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

function FormatarMoeda(valor: number){
  let valorFormatado = valor.toLocaleString('pt-br',
  {
    style: 'currency',
    currency: 'BRL'
  })
  return valorFormatado;
}

function App() {
  const [alcoolInput, setAlcoolInput] = useState(1);
  const [gasolinaInput, setGasolinaInput] = useState(1);
  const [info, setInfor] = useState<InfoProps>()

  function calcular(event: FormEvent){
    event.preventDefault();

    let calculo = (alcoolInput / gasolinaInput)
    console.log(calculo);
    
    
    if(calculo <= 0.7){
      setInfor({
        title: 'Compensa usar álcool!',
        gasolina: FormatarMoeda(gasolinaInput),
        alcool: FormatarMoeda(alcoolInput)
      })
    }else{
      setInfor({
        title: 'Compensa usar gasolina!',
        gasolina: FormatarMoeda(gasolinaInput),
        alcool: FormatarMoeda(alcoolInput)
    })
    }
  }

  return (
    <div>
        <main className='container'>
          <img 
            className='logo'
            src={logoImg}
            alt='Logo da calculadora de gasolina ou alcool' 
          />
          <h1 className='title'>Qual a melhor opção</h1>
          <br />

          <form className='form' onSubmit={calcular}>
            <label>Álcoo (preço por litro):</label>
            <input 
              className='input'
              type='number' 
              placeholder='4,90'
              min='1'
              step='0.01'
              required
              value={alcoolInput}
              onChange={(e) => setAlcoolInput(Number(e.target.value))}
              />
            
            <label>Gasolina (preço por litro):</label>
            <input 
              className='input'
              type='number' 
              placeholder='5,90'
              min='1'
              step='0.01'
              required
              value={gasolinaInput}
              onChange={(e) => setGasolinaInput(Number((e.target.value)))}
              />
            <input className='button' type="submit" value='Calcular' />
          </form>

          {info && Object.keys(info).length > 0 && (
            <section className='result'>
              <h2 className='result-title'>
                {info.title}</h2>
              <span>Álcool {info.alcool}</span>
              <span>Gasolina {info.gasolina}</span>
            </section>
          )}
        </main>
    </div>
  )
}

export default App
