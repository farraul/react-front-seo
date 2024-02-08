import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import intentionsStub from 'src/stub/intentionsStub.json';
import { Button } from 'src/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { PanelKeywords } from 'src/components/Intention/PanelKeywords';
import { EditKeywordModal } from 'src/components/Modals/EditKeywordModal';

const IntentionsPage = () => {
  const [intentions, setIntentions] = useState<any>(intentionsStub);
  const [intentionSelected, setIntentionSelected] = useState<any>();
  const [isOpenEditKeyword, setIsOpenEditKeyword] = useState<any>(false);
  const [keywordToEdit, setKeywordToEdit] = useState<any>('');

  const closeModalEditKeyword = () => {
    setIsOpenEditKeyword(false);
  };

  const showIntention = (intention: string) => {
    console.log({ intention });
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
          <div className=' flex  flex-row flex-wrap gap-x-2 gap-y-2'>
            {Object.entries(intentionsStub).map(([intention, vol]) => {
              return (
                <div key={intention}>
                  <div>
                    {intentions[intention] && (
                      <div className=''>
                        <div>
                          <div>
                            <Button
                              variant='outline'
                              className='bg-primary w-72 h-24 flex  items-center justify-center rounded-2xl flex-col text-xl text-white'
                              onClick={() => showIntention(intention)}
                            >
                              {intention}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div key='one'>
              <div>
                <div className=''>
                  <div>
                    <div>
                      <Button
                        variant='outline'
                        className='bg-gray-200  border-gray-400 border-2 w-72 h-24 flex  items-center justify-center rounded-2xl flex-col text-xl text-black border-dashed'
                        onClick={() => {}}
                      >
                        Nueva intención
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {intentionSelected ? (
          <PanelKeywords
            intentions={intentions}
            setIntentions={setIntentions}
            intentionSelected={intentionSelected}
            closeModalEditKeyword={closeModalEditKeyword}
            setIsOpenEditKeyword={setIsOpenEditKeyword}
            setKeywordToEdit={setKeywordToEdit}
          />
        ) : (
          <section className='py-32'>
            <p className='text-xl  text-center'>Selecciona una intención de búsqueda</p>
          </section>
        )}
        <section>
          <EditKeywordModal
            closeModalEditKeyword={closeModalEditKeyword}
            isOpenEditKeyword={isOpenEditKeyword}
            keywordToEdit={keywordToEdit}
          />
        </section>
      </article>
    </>
  );
};

export default IntentionsPage;
