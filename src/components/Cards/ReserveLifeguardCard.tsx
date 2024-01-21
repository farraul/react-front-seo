import React from 'react';
import { Avatar } from 'src/components/Avatar/Avatar';
import QuestionHoverCard from 'src/components/HoverCards/QuestionHoverCard';
interface LifeguardProps {
  name: string;
  age: number;
  experience: string;
  community: string;
  province: string;
  location: string;
  move: string;
  availability: string;
  id: string;
  minheight?: string;
}

const ReserveLifeguardCard = ({
  name,
  age,
  experience,
  community,
  province,
  location,
  move,
  availability,
  id,
  minheight,
}: LifeguardProps) => {
  return (
    <div
      key={id}
      className={`w-80 bg-theme-primary rounded-md text-theme-primary  shadow-slate-200 shadow-md ${minheight} items-end  justify-between `}
    >
      <div className=' p-10 '>
        <div className=' flex items-center '>
          <Avatar />
          <div className='ml-4 text-lg'>{name}</div>
        </div>
        <div className='mt-6'>
          <div className='mt-2'>Experiencia: {experience} </div>
          <div>Edad: {age} años</div>
          <div className='mt-2'>C. Autónoma : {community}</div>
          <div>Provincia : {province}</div>
          <div>Localidad : {location}</div>
          <div className='mt-2'>Disponibilidad : {availability}</div>
          <div className='flex items-center'>
            Desplazamiento
            <QuestionHoverCard color='yellow'>
              <h4 className='text-sm font-semibold'>Desplazamiento</h4>
              <p className='text-sm'>¿El usuario estaría dispuesto a mudarse?</p>
            </QuestionHoverCard>
            : {move}
          </div>
        </div>
      </div>
      <div className='text-primary rounded-b-md h-9 flex justify-center items-center bg-thirdary'>
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

export default ReserveLifeguardCard;
