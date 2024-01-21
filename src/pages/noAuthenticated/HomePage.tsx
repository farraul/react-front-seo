import React, { useState } from 'react';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ReserveBusinessCard from 'src/components/Cards/ReserveBusinessCard';
import ReserveLeadCard from 'src/components/Cards/ReserveLeadCard';
import ReserveLifeguardCard from 'src/components/Cards/ReserveLifeguardCard';
import { SearchCompany } from 'src/components/Search/SearchCompany';
import business from 'src/stub/businessStub.json';

const HomePage = () => {
  const navigate = useNavigate();

  const [searchSelected, setSearchSelected] = useState({
    community: '',
    province: '',
    location: '',
  });
  console.log({ searchSelected });
  return (
    <>
      {/* <img
        src='/assets/images/backgrounds/beach-water-background.png'
        alt='image of products'
        className='w-full h-screen z-[-1] fixed top-0 left-0 brightness-50'
        style={{ objectFit: 'cover' }}
      /> */}
      <article>
        <section className='flex items-center flex-col justify-center bg-primary text-secondary-generic'>
          <h1 className='text-center text-5xl'>La plataforma para socorristas</h1>
          <div className='w-full flex justify-center gap-20 max-w-7xl mt-10'>
            <div className='w-1/3 bg-primary text-secondary-generic p-10 text-center rounded-2xl '>
              <p className=''>Para proveedores</p>
              <p className='text-3xl mt-4'>Consigue clientes</p>
              <p className='mt-8'>
                ¿Eres una empresa de socorrismo? Accede a clientes que buscan socorristas, envía
                presupuestos y publica ofertas de empleo para contratar socorristas.
              </p>
              <button className='btn-primary' onClick={() => navigate('/register-company')}>
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
              <button className='btn-primary' onClick={() => navigate('/register-administrator')}>
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
              <button className='btn-primary' onClick={() => navigate('/register-lifeguard')}>
                Registro gratuito
              </button>
            </div>
          </div>
        </section>
        <section className='py-10 bg-secondary'>
          <SearchCompany setSearchSelected={setSearchSelected} />
        </section>
        <section className=' items-center flex-col flex justify-center'>
          <div>
            {business.map((company) => {
              company.location === searchSelected.location;

              return (company.community == searchSelected.community ||
                searchSelected.community === '') &&
                (company.province === searchSelected.province || searchSelected.province === '') &&
                (company.location === searchSelected.location || searchSelected.location === '') ? (
                <ReserveBusinessCard
                  name={company.name}
                  community={company.community}
                  province={company.province}
                  location={company.location}
                  id={company.id}
                  namePersonContact={company.namePersonContact}
                  email={company.email}
                  phone={company.phone}
                  price={company.price}
                  yearsActive={company.yearsActive}
                  availability={company.availability}
                  servicesAditionals={company.servicesAditionals}
                  key={company.id}
                />
              ) : null;
            })}
          </div>
        </section>
        <section className='flex items-center flex-col justify-center'></section>
      </article>
    </>
  );
};

export default HomePage;
