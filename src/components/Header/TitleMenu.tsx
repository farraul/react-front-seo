import { Divider } from '@mui/material';
import React from 'react';

export const TitleMenu = ({ text }: { text: string }) => {
  return (
    <>
      <div className='bg-primary '>
        <p className='ml-5'>{text}</p>
      </div>
      <Divider sx={{ my: 0, bgcolor: 'bg-blue' }} />
    </>
  );
};
