import React from 'react';
import ReservationCard from 'src/components/Cards/ReserveLifeguardCard';
import lifeguardsUsers from 'src/stub/lifeguardsStub.json';

const ReserveLifeguard = () => {
  return (
    <>
      <article>
        <section className='w-full items-center flex-col flex justify-center'>
          <h1 className='text-center text-4xl'>Encuentra tu socorrista</h1>
          <p className='text-center mt-2'>
            Contacta con los siguienes socorristas para contratarlos.
          </p>
          <div className='flex gap-x-6 gap-y-6 flex-wrap justify-center mt-20'>
            {lifeguardsUsers.map((lifeguard) => (
              <ReservationCard
                name={lifeguard.name}
                key={lifeguard.id}
                age={lifeguard.age}
                experience={lifeguard.experience}
                location={lifeguard.location}
                community={lifeguard.community}
                province={lifeguard.province}
                move={lifeguard.move}
                availability={lifeguard.availability}
                id={lifeguard.id}
              />
            ))}
          </div>
        </section>
      </article>
    </>
  );
};

export default ReserveLifeguard;
