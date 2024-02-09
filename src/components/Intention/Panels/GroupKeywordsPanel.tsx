import { SettingsIcon } from '../../Icons/Effects/Settings';
import { TrashIcon } from '../../Icons/Effects/Trash';
import { AssociatedStructure } from '../AssociatedStructure';

export const GroupKeywordsPanel = ({
  intentions,
  intentionSelected,
  setIntentions,
  setIsOpenModal,
  closeModal,
}: any) => {
  return (
    <>
      <section className='px-16'>
        <div className='w-full max-w-9xl overflow-y-auto  '>
          <p className='text-center text-2xl'>Grupos de palabras clave</p>
          <div className=' flex w-full  items-center  '>
            {Object.keys(intentions[intentionSelected]).length ? (
              <div className='w-full flex flex-wrap mt-6 mb-5  '>
                {Object.keys(intentions[intentionSelected])
                  .filter((mainKeyword: any) => mainKeyword !== 'news')
                  .map((mainKeyword: any) => {
                    return (
                      <div key={mainKeyword} className=' max-w-lg w-1/4 border-2  flex flex-col'>
                        {intentionSelected !== 'news' && (
                          <>
                            <div className='flex pl-10 pt-8 text-xl font-bold justify-between bg-primary  px-10  '>
                              <p className='text-white'>
                                {' '}
                                {mainKeyword}{' '}
                                <span className='text-base ml-4 text-gray-400 italic'>
                                  Palabra principal
                                </span>
                              </p>
                              <div className='flex mt-6'>
                                <span className='  text-green-400'>
                                  {intentions[intentionSelected][mainKeyword]['vol']}
                                </span>
                                <div className='flex'>
                                  <div
                                    className='pl-4 cursor-pointer'
                                    onClick={() => {
                                      setIsOpenEditKeyword(true);
                                      setKeywordToEdit(mainKeyword);
                                    }}
                                  >
                                    <SettingsIcon />
                                  </div>
                                  <div
                                    className=' cursor-pointer'
                                    onClick={() => {
                                      console.log(intentions[intentionSelected][mainKeyword]);
                                      delete intentions[intentionSelected][mainKeyword];
                                      setIntentions((prevState: any) => ({
                                        ...prevState,
                                        [intentionSelected]: {
                                          ...prevState[intentionSelected],
                                        },
                                      }));
                                    }}
                                  >
                                    <TrashIcon />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='pl-14 bg-primary  px-10 '>
                              <p className=' text-gray-400  italic'>Sinónimos</p>
                              {Object.keys(intentions[intentionSelected][mainKeyword]['synonymous'])
                                .length ? (
                                <>
                                  {Object.keys(
                                    intentions[intentionSelected][mainKeyword]['synonymous'],
                                  ).map((aynonymous: any) => (
                                    <div className='ml-15 flex justify-between'>
                                      <div className='flex'>
                                        <p className='text-white'>{aynonymous}</p>
                                      </div>
                                      <div className='flex'>
                                        <span className='ml-4 text-green-400'>
                                          {
                                            intentions[intentionSelected][mainKeyword][
                                              'synonymous'
                                            ][aynonymous]
                                          }
                                        </span>

                                        <div
                                          className='ml-4 cursor-pointer'
                                          onClick={() => {
                                            setIsOpenEditKeyword(true);
                                            setKeywordToEdit(aynonymous);
                                          }}
                                        >
                                          <SettingsIcon />
                                        </div>
                                        <div
                                          className=' cursor-pointer'
                                          onClick={() => {
                                            delete intentions[intentionSelected][mainKeyword][
                                              'synonymous'
                                            ][aynonymous];

                                            setIntentions((prevState: any) => ({
                                              ...prevState,
                                              [intentionSelected]: {
                                                ...prevState[intentionSelected],
                                                [mainKeyword]: {
                                                  ...prevState[intentionSelected][mainKeyword],
                                                  ['synonymous']: {
                                                    ...intentions[intentionSelected][mainKeyword][
                                                      'synonymous'
                                                    ],
                                                  },
                                                },
                                              },
                                            }));
                                          }}
                                        >
                                          <TrashIcon />
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </>
                              ) : null}
                            </div>
                            <div className='pl-14 bg-primary px-10 pb-10 '>
                              <p className=' text-gray-400 mt-4  italic'>Long tails</p>
                              {intentions[intentionSelected][mainKeyword]['longTail'] ? (
                                <>
                                  {Object.keys(
                                    intentions[intentionSelected][mainKeyword]['longTail'],
                                  ).map((longTail: any) => (
                                    <div className='pl-15 flex justify-between'>
                                      <div className='flex'>
                                        <p className='text-white'>{longTail}</p>
                                      </div>

                                      <div className='flex'>
                                        <span className='pl-4 text-green-400'>
                                          {
                                            intentions[intentionSelected][mainKeyword]['longTail'][
                                              longTail
                                            ]
                                          }
                                        </span>

                                        <div
                                          className='ml-4 cursor-pointer'
                                          onClick={() => {
                                            setIsOpenEditKeyword(true);
                                            setKeywordToEdit(longTail);
                                          }}
                                        >
                                          <SettingsIcon />
                                        </div>
                                        <div
                                          className=' cursor-pointer'
                                          onClick={() => {
                                            delete intentions[intentionSelected][mainKeyword][
                                              'longTail'
                                            ][longTail];

                                            setIntentions((prevState: any) => ({
                                              ...prevState,
                                              [intentionSelected]: {
                                                ...prevState[intentionSelected],
                                                [mainKeyword]: {
                                                  ...prevState[intentionSelected][mainKeyword],
                                                  ['longTail']: {
                                                    ...intentions[intentionSelected][mainKeyword][
                                                      'longTail'
                                                    ],
                                                  },
                                                },
                                              },
                                            }));
                                          }}
                                        >
                                          <TrashIcon />
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </>
                              ) : null}
                            </div>
                            <AssociatedStructure />
                          </>
                        )}
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className=' py-32 flex justify-center w-full'>
                <p className=' text-xl text-center'>
                  No hay palabras para esta intención de búsqueda
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
