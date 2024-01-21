import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useAppSelector } from 'src/hooks/useApp';
import Card from '@mui/material/Card';

import { Link, Outlet } from 'react-router-dom';
import { EditFieldPopUp } from 'src/components/PopUp/EditFieldPopUp';

interface List {
  title: string;
  data: string;
}

const ProfilePage = () => {
  const {
    name,
    namePersonContact,
    email,
    whatsApp,
    yearsActive,
    community,
    province,
    availability,
    priceHour,
    location,
    servicesAditionals,
  } = useAppSelector((state) => state.user.userInfo);

  // function stringAvatar(name: string) {
  //   return {
  //     sx: {
  //       bgcolor: 'grey',
  //     },
  //     children: `${name.split(' ')[0][0]}`,
  //   };
  // }

  const [value, setValue] = useState(0);

  const listDataProfile: List[] = [
    {
      title: 'Nombre',
      data: name,
    },
    {
      title: 'Persona de contacto',
      data: namePersonContact,
    },
    {
      title: 'Email',
      data: email,
    },
    {
      title: 'Whatsapp',
      data: whatsApp,
    },
    {
      title: 'Años de experiencia',
      data: yearsActive,
    },
    {
      title: 'Precio la hora',
      data: priceHour,
    },
    {
      title: 'Disponibilidad',
      data: availability,
    },
    {
      title: 'Comunidad autónoma',
      data: community,
    },
    {
      title: 'Localidad',
      data: location,
    },
    {
      title: 'Provincia',
      data: province,
    },
    {
      title: 'Servicios adicionales',
      data: servicesAditionals,
    },
  ];

  return (
    <article>
      <section className='w-full  flex flex-row justify-center'>
        <div className='w-1/2'>
          <div className='pb-10 flex flex-row items-center'>
            <div>
              <img src='/assets/images/icons/profile.svg' />
            </div>
            {/* revisar tamaños h1*/}
            <h1 className='text-2xl font-bold ml-3'>Mi perfil</h1>
          </div>

          <div className='p-10 max-w-md bg-gray-300 rounded-lg'>
            {/* <Avatar {...stringAvatar(name)} /> */}

            <ul className='py-8'>
              {listDataProfile.map((field) => (
                <li key={field.title}>
                  <b>{field.title}: </b> {field.data}
                </li>
              ))}
            </ul>
            <EditFieldPopUp listDataProfile={listDataProfile} />
          </div>
        </div>
        <div className='w-1/2'>
          <div>
            <p className='text-bold text-2xl font-bold'>Lead comprados</p>
            <div className='w-full max-w-72 flex justify-between flex-col  mt-10'>
              <div className=' bg-blue-200 flex flex-row justify-between px-4 py-2 '>
                <div className='font-bold'>Manuel</div> <div>ver</div>
              </div>
              <div className=' mt-1 bg-blue-200 flex flex-row justify-between px-4 py-2 '>
                <div className='font-bold'>Manuel</div> <div>ver</div>
              </div>
            </div>
          </div>
        </div>

        {/* <Outlet /> */}
      </section>
    </article>
  );
};

export default ProfilePage;
