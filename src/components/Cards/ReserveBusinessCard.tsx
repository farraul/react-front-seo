import { ClassNames } from '@emotion/react';
import React from 'react';
import { Avatar } from 'src/components/Avatar/Avatar';
import QuestionHoverCard from 'src/components/HoverCards/QuestionHoverCard';
interface LifeguardProps {
  name: string;
  namePersonContact: string;
  email: string;
  phone: string;
  price: number;
  yearsActive: number;
  availability: string;
  community: string;
  province: string;
  location: string;
  servicesAditionals: Array<string>;
  id: string;
  className?: string;
}

const ReserveLeadCard = ({
  name,
  namePersonContact,
  email,
  phone,
  price,
  yearsActive,
  availability,
  community,
  province,
  location,
  servicesAditionals,
  id,
  className,
}: LifeguardProps) => {
  return (
    <div
      key={id}
      className={` mt-5 w-full bg-secondary rounded-md text-primary-generic shadow-slate-200 shadow-md ${className}  content-between  w-full max-w-5xl   `}
    >
      <div className=' flex flex-row '>
        <div className=' flex flex-col items-center w-120 bg-primary px-6 py-2 rounded-l-sm text-secondary-generic justify-around'>
          <Avatar height={'h-24'} width={'w-24'} />
          <div className='text-center text-lg'>{name}</div>
          <div className='gap-x-2 gap-y-2 flex flex-wrap justify-center'>
            <div className='flex gap-2 w-full'>
              <button className='btn-primary'>Llamar</button>
              <button className='btn-primary'>Email</button>
            </div>
            <div className='flex gap-2 w-full'>
              <button className='btn-primary'>WhatsApp</button>
              <button className='btn-primary'>Página web</button>
            </div>
          </div>
        </div>
        <div className=' flex ml-6 w-full py-2 pr-2'>
          <div className='flex flex-col w-44'>
            <div className=' p-4 h-20 rounded-sm bg-white text-primary flex flex-col'>
              <p>Precio</p>
              <p className='text-xl font-bold '>{price}€/hora</p>
            </div>
            <div className='mt-2 p-4 rounded-sm bg-white text-primary'>
              <p>Disponibilidad</p>
              <p>{availability} </p>
            </div>
            <div className='mt-2 p-4 rounded-sm bg-white text-primary'>
              <p>Años activo</p>
              <p> {yearsActive} </p>
            </div>
          </div>
          <div className='flex flex-col ml-2 w-full'>
            <div className='h-20 p-4  rounded-sm bg-white text-primary flex  flex-col'>
              <p>Donde estamos:</p>
              <p>
                {community}, {province}, {location}
              </p>
            </div>
            <div className='mt-2 p-4 min-h-20 rounded-sm bg-white text-primary'>
              <p> Servicios adicionales </p>
              <p> {servicesAditionals}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveLeadCard;
