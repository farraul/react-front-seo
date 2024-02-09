import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import intentionsStub from 'src/stub/intentionsStub.json';
import { v4 as uuidv4 } from 'uuid';
import { GroupKeywordsPanel } from 'src/components/Intention/Panels/GroupKeywordsPanel';
import { EditKeywordModal } from 'src/components/Keywords/Modals/EditKeywordModal';
import { Button } from 'src/components/PrimitiveElements';
import { typeModalOpen } from 'src/models/common';
import { useModal } from 'src/hooks/useModal';
import { CreateIntentionModal } from 'src/components/Modals/CreateIntentionModal';
import { IntentionTemplate } from 'src/components/template';

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
            <h1 className=' text-4xl font-bold  text-primary-generic'>Intenciones</h1>
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
