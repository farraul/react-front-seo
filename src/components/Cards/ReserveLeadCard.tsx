import { ClassNames } from '@emotion/react';
import React from 'react';
import { Avatar } from 'src/components/Avatar/Avatar';
import QuestionHoverCard from 'src/components/HoverCards/QuestionHoverCard';
interface LifeguardProps {
  name: string;
  community: string;
  province: string;
  location: string;
  weeklyhours: string;
  numberworkers: string;
  start: string;
  end: string;
  id: string;
  className?: string;
}

const ReserveLeadCard = ({
  name,
  community,
  province,
  location,
  weeklyhours,
  numberworkers,
  start,
  end,
  id,
  className,
}: LifeguardProps) => {
  return (
    <div
      key={id}
      className={`w-80 bg-theme-primary rounded-md text-theme-primary shadow-slate-200 shadow-md ${className}  content-between  `}
    >
      <div className=' p-10 '>
        <div className=' flex items-center '>
          <Avatar height={''} width={''} />
          <div className='ml-4 text-lg'>{name}</div>
        </div>
        <div className='mt-6'>
          <div className='mt-2'>C. Autónoma : {community}</div>
          <div>Provincia : {province}</div>
          <div>Localidad : {location}</div>
          <div className='mt-4'>Fecha inicio : {start}</div>
          <div className=''>Fecha fin : {end}</div>
          <div className='mt-4'>Horas semanales: {weeklyhours} </div>
          <div className=''>Número trabajadores: {numberworkers} </div>

          {/* <div className='flex items-center'>
            Desplazamiento
            <QuestionHoverCard color='yellow'>
              <h4 className='text-sm font-semibold'>Desplazamiento</h4>
              <p className='text-sm'>¿El usuario estaría dispuesto a mudarse?</p>
            </QuestionHoverCard>
            : {}
          </div> */}
        </div>
      </div>
      <div className='text-primary h-12 flex justify-center items-center bg-yellow-500 flex-col py-10 px-10'>
        <div className='flex w-full justify-between '>
          <p>
            Compra genérica
            <QuestionHoverCard color='black' className=''>
              <h4 className='text-sm font-semibold'>Compra genérica</h4>
              <p className='text-sm'>Lo pueden comprar todos los usuarios de la plataforma</p>
            </QuestionHoverCard>
            :
          </p>
          <div>
            <button className=' ml-2 bg-slate-900 text-white py-1 px-4 rounded-sm text-xs w-14 h-6'>
              10 €
            </button>
          </div>
        </div>
        <div className='flex w-full justify-between mt-2'>
          <p>
            Compra única{' '}
            <QuestionHoverCard color='black'>
              <h4 className='text-sm font-semibold'>Compra única.</h4>
              <p className='text-sm'>Solo tu tendrás el contacto en toda la plataforma.</p>
            </QuestionHoverCard>
            :{/* <span className='text-xs'>Solo podrás comprar tu el lead</span> */}
          </p>
          <button className=' ml-2 bg-slate-900 text-white py-1 px-4 rounded-sm text-xs  w-14 h-6'>
            30 €
          </button>
        </div>
      </div>
      <div className='text-primary rounded-b-md h-9 flex justify-center items-center bg-theme-primary py-6'>
        <div className='flex w-48 justify-evenly text-white'>
          <div className=''>Teléfono:</div>
          <div className='blur-1' style={{ filter: 'blur(2.5px)' }}>
            685262068
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveLeadCard;
