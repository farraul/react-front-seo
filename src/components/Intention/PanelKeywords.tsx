import { SettingsIcon, TrashIcon } from '../Icons';

export const PanelKeywords = ({
  intentions,
  intentionSelected,
  setIntentions,
  setIsOpenEditKeyword,
  setKeywordToEdit,
}: any) => {
  return (
    <section>
      <div className='w-full max-w-9xl overflow-y-auto  '>
        <div className=' flex w-full  items-center  '>
          {Object.keys(intentions[intentionSelected]).length ? (
            <div className='w-full flex flex-wrap mt-6 mb-5  '>
              {Object.keys(intentions[intentionSelected])
                .filter((mainKeyword: any) => mainKeyword !== 'news')
                .map((mainKeyword: any) => {
                  return (
                    <div
                      key={mainKeyword}
                      className='w-full max-w-md border-2 px-10 py-10 bg-primary flex flex-col '
                    >
                      {intentionSelected !== 'news' && (
                        <>
                          <div className='flex ml-2 mt-8 text-xl font-bold justify-between '>
                            <p className='text-white'>{mainKeyword}</p>
                            <div className='flex'>
                              <span className='  text-green-400'>
                                {intentions[intentionSelected][mainKeyword]['vol']}
                              </span>
                              <div className='flex'>
                                <div
                                  className='ml-4 cursor-pointer'
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
                          <div className='ml-14'>
                            <p className=' text-gray-400 mt-2'>Sinónimos</p>
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
                                          intentions[intentionSelected][mainKeyword]['synonymous'][
                                            aynonymous
                                          ]
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

                          <div className='ml-14'>
                            <p className=' text-gray-400 mt-4'>Long tails</p>
                            {intentions[intentionSelected][mainKeyword]['longTail'] ? (
                              <>
                                {Object.keys(
                                  intentions[intentionSelected][mainKeyword]['longTail'],
                                ).map((longTail: any) => (
                                  <div className='ml-15 flex justify-between'>
                                    <div className='flex'>
                                      <p className='text-white'>{longTail}</p>
                                    </div>

                                    <div className='flex'>
                                      <span className='ml-4 text-green-400'>
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
  );
};
