import React, { useState } from 'react';
import intentionsStub from 'src/stub/intentionsStub.json';
import { IntentionTemplate } from 'src/components/templates';

const IntentionsPage = () => {
  return (
    <>
      <article>
        <section className='px-20'>
          <div className=' mb-16 mt-20 flex items-center flex-col justify-cente'>
            <h1 className=''>Intenciones</h1>
            {/* <p className='mt-5 text-xl'>Selecciona la inteción que quieras revisar</p> */}
          </div>

          <IntentionTemplate intentionsStub={intentionsStub} />
        </section>
      </article>
    </>
  );
};

export default IntentionsPage;
