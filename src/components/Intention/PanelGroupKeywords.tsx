import { useState } from 'react';
import { CreateIntentionModal } from '../Modals/CreateIntentionModal';
import { EyeClosedIcon } from '@radix-ui/react-icons';
import { SearchIcon } from '../Icons/Effects/search';
import { SettingsIcon } from '../Icons/Effects/Settings';
import { TrashIcon } from '../Icons/Effects/Trash';
import { ExternalLinkIcon } from '../Icons/ExternalLinkIcon';
import { PlusIcon } from '../Icons/PlusIcon';

export const PanelGroupKeywords = ({
  intentions,
  intentionSelected,
  setIntentions,
  setIsOpenEditKeyword,
  setKeywordToEdit,
}: any) => {
  return (
    <>
      <section className='px-16'>
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
                        className='w-full max-w-lg w-1/4 border-2  flex flex-col w-4 '
                      >
                        {intentionSelected !== 'news' && (
                          <>
                            <div className='flex pl-10 pt-8 text-xl font-bold justify-between bg-primary py-10 px-10  '>
                              <p className='text-white'>{mainKeyword}</p>
                              <div className='flex'>
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

                            <div className='pl-14 bg-primary px-10 pb-10 pt-'>
                              <p className=' text-gray-400 mt-4'>Long tails</p>
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
                            <div className='bg-blue-900 px-10  flex justify-around py-4'>
                              <div className='text-center  text-gray-400 flex'>
                                <p>Estrucura asociada</p>
                                <div className='flex ml-2 border-dashed border-white border'>
                                  <PlusIcon width='w-4' />
                                  {/* <span className='text-sm ml-2 text-gray-400'>Añadir nueva</span> */}
                                </div>
                              </div>
                              <div className=''>
                                <div className='flex '>
                                  <div className='text-white mr-2'>Estructura 1</div>
                                  <ExternalLinkIcon width='w-6' />
                                </div>
                              </div>
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
    </>
  );
};
