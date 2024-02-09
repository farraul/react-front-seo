import { useModal } from 'src/hooks/useModal';
import Button from '../PrimitiveElements/Button/Button';
import { GroupKeywordsPanel } from '../Intention/Panels/GroupKeywordsPanel';
import { useState } from 'react';
import { EditKeywordModal } from '../Keywords/Modals/EditKeywordModal';
import { CreateIntentionModal } from '../Modals/CreateIntentionModal';

const IntentionTemplate = ({ intentionsStub, showIntention, intentionSelected }: any) => {
  const [intentions, setIntentions] = useState<any>(intentionsStub);
  const [keywordToEdit, setKeywordToEdit] = useState<any>('');

  const { setIsOpenModal, closeModal, isOpenModal } = useModal();

  return (
    <>
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
                          className='bg-primary w-72 h-20 flex  items-center justify-center rounded-2xl flex-col text-xl text-white'
                          onClick={() => showIntention(intention)}
                        >
                          estaa {intention}
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
                    className='bg-gray-200  border-gray-800 border-6 w-72 h-20 flex  items-center justify-center rounded-2xl flex-col text-xl text-black border-dashed'
                    onClick={() => {
                      setIsOpenModal('create');
                    }}
                  >
                    Nueva intención
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {intentionSelected ? (
        <GroupKeywordsPanel
          intentions={intentions}
          setIntentions={setIntentions}
          intentionSelected={intentionSelected}
          closeModal={closeModal}
          setIsOpenModal={setIsOpenModal}
          setKeywordToEdit={setKeywordToEdit}
        />
      ) : (
        <section className='py-32'>
          <p className='text-xl  text-center'>Selecciona una intención de búsqueda</p>
        </section>
      )}
      <EditKeywordModal
        closeModal={closeModal}
        isOpenModal={isOpenModal}
        keywordToEdit={keywordToEdit}
      />
      <CreateIntentionModal closeModal={closeModal} isOpenModal={isOpenModal} />
    </>
  );
};

export default IntentionTemplate;
