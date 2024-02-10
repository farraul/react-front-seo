import React, { useState } from 'react';
import intentionsStub from 'src/stub/intentionsStub.json';
import { IntentionTemplate } from 'src/components/templates';

const IntentionsPage = () => {
  const [intentionSelected, setIntentionSelected] = useState<any>();

  const showIntention = (intention: string) => {
    setIntentionSelected(intention);
  };

  return (
    <>
      <article>
        <section className='px-20'>
          <div className=' mb-16 mt-20 flex items-center flex-col justify-cente'>
            <h1 className='heading-h1'>Intenciones</h1>
            {/* <p className='mt-5 text-xl'>Selecciona la inteción que quieras revisar</p> */}
          </div>

          <IntentionTemplate
            intentionsStub={intentionsStub}
            showIntention={showIntention}
            intentionSelected={intentionSelected}
          />
        </section>
      </article>
    </>
  );
};

export default IntentionsPage;
