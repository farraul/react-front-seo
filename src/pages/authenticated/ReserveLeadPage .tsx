import React from 'react';
import ReserveLeadCard from 'src/components/Cards/ReserveLeadCard';
import ReservationCard from 'src/components/Cards/ReserveLifeguardCard';
import leads from 'src/stub/leads.json';

const ReserveLead = () => {
  return (
    <>
      <article>
        <section className='w-full items-center flex-col flex justify-center '>
          <h1 className='text-center text-4xl'>Encuentra tu cliente</h1>
          <p className='text-center mt-2'>
            Estos contactos estan buscando los servicios de socorrismo. Ponte en contacto con ellos.
            para ofrecerles un presupuesto
          </p>
          <div className='flex gap-x-6 gap-y-6 flex-wrap justify-center mt-20'>
            {leads.map((lead) => (
              <ReserveLeadCard
                name={lead.name}
                community={lead.community}
                location={lead.location}
                key={lead.id}
                province={lead.province}
                numberworkers={lead.numberworkers}
                weeklyhours={lead.weeklyhours}
                start={lead.start}
                end={lead.end}
                id={lead.id}
              />
            ))}
          </div>
        </section>
      </article>
    </>
  );
};

export default ReserveLead;
