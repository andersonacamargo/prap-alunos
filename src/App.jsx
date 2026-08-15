import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from 'axios'

function App() {
  
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "https://6a79e554674f43f4db11ebc8.mockapi.io/api/person/",
          {},
        );
        setPerson(res.data);

        console.log("Success:", res.data);
        setLoading(false);

      } catch (err) {
        console.error("Erro ao carregar API", err);
        setLoading(false);
        setError(true);
      }
    }
    getData();
  },[])


  const handleNext = () => {
    if (count < person.length - 1) {
      setCount((prev) => prev + 1);
    }
  };
  
  if (loading) {
    return (<div>Carregando</div>)
  }
  if (error){
    return (<div>Erro insperado ocorreu</div>)
    
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>{person[count].nome + " " + person[count].sobrenome}</h1>
       
        </div>
        <div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count - 1)}
        >
         Anterior
        </button>
        <button
          type="button"
          className="counter"
          onClick={handleNext}
        >
         Próximo
        </button></div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Informações</h2>
          <p>Profissão: {person[count].profissao}</p>
          <p>Formação: {person[count]?.formacao ?? "não informado"} </p>
          <p>email: {person[count].email}</p>
          <p>git: {person[count].git}</p>
          <p>linkedin: {person[count].linkedin}</p>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Hobbies</h2>
          <ul>
          {typeof person[count].hobbies == "object" && person[count].hobbies.map((hobby, index) => (
              // Usamos o index aqui apenas porque a lista é estática e simples
              <li key={index}>{hobby},</li>
            ))}
            {typeof person[count].hobbies == "string" && person[count].hobbies}
          </ul> 
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
