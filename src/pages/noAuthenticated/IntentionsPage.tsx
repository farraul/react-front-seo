import React, { useState } from 'react';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ReserveBusinessCard from 'src/components/Cards/ReserveBusinessCard';
import ReserveLeadCard from 'src/components/Cards/ReserveLeadCard';
import ReserveLifeguardCard from 'src/components/Cards/ReserveLifeguardCard';
import { SearchCompany } from 'src/components/Search/SearchCompany';
import intentionsStub from 'src/stub/intentionsStub.json';

const IntentionsPage = () => {
  const navigate = useNavigate();

  const [intentions, setIntentions] = useState<any>(intentionsStub);

  return (
    <>
      <article>
        <section>
          <div className=' mb-16 mt-20 flex items-center flex-col justify-cente'>
            <h1 className=' text-4xl font-bold  text-primary-generic'>Intenciones</h1>
            <p className='mt-5 text-xl'>Selecciona la inteción que quieras revisar</p>
          </div>
          <div className=' flex  flex-row flex-wrap gap-x-2 gap-y-2'>
            {Object.entries(intentionsStub).map(([intention, vol]) => {
              return (
                <div>
                  <div>
                    {intentions[intention] && (
                      <div className='bg-primary w-80 h-40 flex  items-center justify-center rounded-2xl'>
                        <p className='text-2xl text-white  '>{intention}</p>
                        {/* {Object.keys(intentions[intention])
                          .filter((mainKeyword: any) => mainKeyword !== 'news')
                          .map((mainKeyword: any) => {
                            return (
                              <div
                                key={intention}
                                className='w-full max-w-md border-2 px-10 py-10 bg-primary flex'
                              >
                                {intention !== 'news' && (
                                  <>
                                    <div className='flex ml-2 mt-8 text-xl font-bold justify-between '>
                                      <p className=' '>{mainKeyword}</p>
                                      <span className='  text-green-400'>
                                        {intentions[intention][mainKeyword]['vol']}
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                            );
                            //  :null}
                          })} */}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </article>
      {/* <section className='flex items-center flex-col justify-center'>
          {Object.entries(intentionsStub).map(([intention, vol]) => {
            {
              console.log(intention);

              console.log(vol);
              console.log(intentions[intention]);
              console.log(Object.keys(intentions[intention]));
            }
            return (
              <div>
                <div>
                  <div className=' flex  flex-wrap  '>
                    {intentions['Seo'] &&
                      Object.keys(intentions['Seo'])
                        .filter((mainKeyword: any) => mainKeyword !== 'news')
                        .map((mainKeyword: any) => {
                          return (
                            <div
                              key={intention}
                              className='w-full max-w-md border-2 px-10 py-10 bg-primary'
                            >
                              {intention !== 'news' && (
                                <>
                                  <div className='flex ml-2 mt-8 text-xl font-bold justify-between '>
                                    <p className=' '>{mainKeyword}</p>
                                    <span className='  text-green-400'>
                                      {intentions[intention][mainKeyword]['vol']}
                                    </span>
                                  </div>
                                  {console.log(intentions[intention][mainKeyword]['synonymous'])}
                                  <div className='ml-14'>
                                    <p className=' text-gray-400 mt-2'>Sinónimos</p>
                                    {Object.keys(intentions['Seo'][mainKeyword]['synonymous'])
                                      .length ? (
                                      <>
                                        {Object.keys(
                                          intentions['Seo'][mainKeyword]['synonymous'],
                                        ).map((aynonymous: any) => (
                                          <div className='ml-15 flex justify-between'>
                                            <p>{aynonymous}</p>

                                            <span className='ml-4 text-green-400'>
                                              {
                                                intentions['Seo'][mainKeyword]['synonymous'][
                                                  aynonymous
                                                ]
                                              }
                                            </span>
                                          </div>
                                        ))}
                                      </>
                                    ) : null}
                                  </div>

                                  <div className='ml-14'>
                                    <p className=' text-gray-400 mt-4'>Long tails</p>
                                    {intentions[intention][mainKeyword]['longTail'] ? (
                                      <>
                                        {Object.keys(
                                          intentions[intention][mainKeyword]['longTail'],
                                        ).map((longTail: any) => (
                                          <div className='ml-15 flex justify-between'>
                                            <p>{longTail}</p>
                                            <span className='ml-4 text-green-500'>
                                              {
                                                intentions[intention][mainKeyword]['longTail'][
                                                  longTail
                                                ]
                                              }
                                            </span>
                                          </div>
                                        ))}
                                      </>
                                    ) : null}
                                  </div>
                                </>
                              )}
                            </div>
                          );
                          //  :null}
                        })}
                  </div>
                </div>
              </div>
            );
          })}
        </section> */}
    </>
  );
};

export default IntentionsPage;
