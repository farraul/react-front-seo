import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReserveLeadCard from 'src/components/Cards/ReserveLeadCard';
import ReserveLifeguardCard from 'src/components/Cards/ReserveLifeguardCard';
import leads from 'src/stub/leads.json';

const HomePage = () => {
  const navigate = useNavigate();
  const filteredLeads = leads.slice(0, 2);

  return (
    <>
      {/* <img
        src='/assets/images/backgrounds/beach-water-background.png'
        alt='image of products'
        className='w-full h-screen z-[-1] fixed top-0 left-0 brightness-50'
        style={{ objectFit: 'cover' }}
      /> */}
      <article>
        <section className='flex items-center flex-col justify-center bg-blue-300'>
          <h1 className='text-center text-5xl'>La plataforma para socorristas</h1>
          <h2 className='text-center text-2xl mt-24'>Selecciona lo que estas buscando</h2>
          <div className='w-full flex justify-center gap-20 max-w-7xl mt-10'>
            <div className='w-1/3 bg-primary text-secondary-generic p-10 text-center rounded-2xl '>
              <p className=''>Para proveedores</p>
              <p className='text-3xl mt-4'>Consigue clientes</p>
              <p className='mt-8'>
                ¿Eres una empresa de socorrismo? Accede a clientes que buscan socorristas, envía
                presupuestos y publica ofertas de empleo para contratar socorristas.
              </p>
              <button
                className='mt-8 bg-secondary text-primary-generic text-lg px-4 py-2 rounded-md'
                onClick={() => navigate('/register-provider')}
              >
                Empezar gratis
              </button>
            </div>
            <div className='w-1/3 bg-primary text-secondary-generic p-10 text-center rounded-2xl '>
              <p>Para administradores</p>

              <p className='text-3xl mt-4'>Encuentra socorrista</p>
              <p className='mt-8'>
                {' '}
                ¿Administras una finca o urbanización? Publica anuncios de búsqueda de socorristas,
                solicita presupuestos a empresas y contrata servicios de forma sencilla.
              </p>
              <button
                className='mt-8 bg-secondary text-primary-generic text-lg px-4 py-2 rounded-md'
                onClick={() => navigate('/register-administrator')}
              >
                Regístrate gratis
              </button>
            </div>
            <div className='w-1/3 bg-primary text-secondary-generic p-10 text-center rounded-2xl '>
              <p>Para socorristas</p>

              <p className='text-3xl mt-4'>Consigue empleo</p>
              <p className='mt-8'>
                ¿Eres socorrista y estás desempleado? Crea tu perfil, inscríbete a ofertas de
                trabajo y recibe oportunidades de empleo por parte de las empresas de socorrismo.
              </p>
              <button
                className='mt-8 bg-secondary text-primary-generic text-lg px-4 py-2 rounded-md'
                onClick={() => navigate('/register-lifeguard')}
              >
                Registro gratuito
              </button>
            </div>
          </div>
        </section>
        <section className=' items-center flex-col flex justify-center'>
          <h2 className='text-3xl mt-4'>Últimas ofertas publicadas</h2>
          <p className='text-xl mt-4'>Estos clientes estan buscando una empresa de socorrismo.</p>

          <div className='flex  flex-wrap justify-center mt-20 gap-20 max-w-8xl  '>
            {/* {filteredLeads.map((lead) => {})} */}
            <div className=' display flex flex-col'>
              <p className='text-xl text-center mb-2 font-bold'>Urbanización </p>
              <p className='text-center mb-6'>Busca una empresa de socorrismo</p>
              <ReserveLeadCard
                name='Andres'
                community='C.valenciama'
                province='Valencia'
                location='Valencia'
                key='eee'
                numberworkers='1'
                weeklyhours='40'
                start='Junio'
                end='Agosto'
                id='999'
              />
              <button className='mt-5 bg-primary px-10 py-3 rounded-sm text-secondary-generic text-xl '>
                Quiero estos clientes
              </button>
            </div>
            <div className=' display flex flex-col'>
              <p className='text-xl text-center mb-2 font-bold'> Socorrista</p>
              <p className='text-center mb-6'>Busca trabajar de socorristas</p>
              <ReserveLifeguardCard
                name='Andres'
                community='C.valenciama'
                province='Valencia'
                location='Valencia'
                key='eee'
                id='999'
                age={23}
                experience='1 año'
                move='Sí'
                availability='Junio-Agosto'
                minheight='min-h-96'
              />
              <button className='mt-5 bg-primary px-10 py-3 rounded-sm text-secondary-generic text-xl'>
                Quiero contratar socorristas
              </button>
            </div>
          </div>
        </section>
        <section className='flex items-center flex-col justify-center'>
          <h2 className='text-3xl mt-4 text-center'>Últimas ofertas publicadas</h2>
        </section>
      </article>
    </>
  );
};

export default HomePage;
