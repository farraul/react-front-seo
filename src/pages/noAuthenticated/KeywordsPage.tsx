import { useState } from 'react';
import keywordsStub from 'src/stub/keywordsStub.json';
import intentionsStub from 'src/stub/intentionsStub.json';
import { v4 as uuidv4 } from 'uuid';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { LeftHandleKewyords } from 'src/components/Keywords/Handle/LeftHandleKewyords';
import { HandleKewyords } from 'src/components/Keywords/Handle/HandleKewyords';

function ImportKeywordsPage() {
  const [keywordsImported, setKeywordsImported] = useState<any>(keywordsStub);
  const [intentionSelected, setIntentionSelected] = useState<string>('');
  const [intentions, setIntentions] = useState<any>(intentionsStub);

  return (
    <>
      <section className='flex p-20 gap-x-14 '>
        <div className=' max-w-lg w-full h-fit'>
          <h3 className='heading-h1'>Nuevas Keywords</h3>
          <LeftHandleKewyords
            setIntentionSelected={setIntentionSelected}
            keywordsImported={keywordsImported}
            setKeywordsImported={setKeywordsImported}
            intentions={intentions}
            setIntentions={setIntentions}
          />
        </div>
        {/* desde aqui a template */}
        <div className='w-full max-w-9xl flex gap-x-4 '>
          {intentionSelected ? (
            <>
              {console.log(intentionSelected)}
              <>
                <div className=' text-white flex flex-col items-center  rounded-sm w-full  '>
                  <h3 className='text-4xl font-bold px-12  text-primary-generic mb-16'>
                    {intentionSelected}
                  </h3>
                  <div className='flex'>
                    <div className='flex'>
                      <HandleKewyords
                        intentions={intentions}
                        intentionSelected={intentionSelected}
                        setIntentions={setIntentions}
                      />

                      <div className=' flex  flex-wrap  '>
                        {intentions[intentionSelected] &&
                          Object.keys(intentions[intentionSelected])
                            .filter((mainKeyword: any) => mainKeyword !== 'news')
                            .map((intention: any) => {
                              return (
                                <div
                                  key={uuidv4()}
                                  className='w-full max-w-md border-2 px-10 py-10 bg-primary'
                                >
                                  {intention !== 'news' && (
                                    <>
                                      <div className='flex ml-2 mt-8 text-xl font-bold justify-between '>
                                        <p className=' '>{intention}</p>
                                        <span className='  text-green-400'>
                                          {intentions[intentionSelected][intention]['vol']}
                                        </span>
                                      </div>
                                      {console.log(
                                        intentions[intentionSelected][intention]['synonymous'],
                                      )}
                                      <div className='ml-14'>
                                        <p className=' text-gray-400 mt-2'>Sinónimos</p>
                                        {Object.keys(
                                          intentions[intentionSelected][intention]['synonymous'],
                                        ).length ? (
                                          <>
                                            {Object.keys(
                                              intentions[intentionSelected][intention][
                                                'synonymous'
                                              ],
                                            ).map((aynonymous: any) => (
                                              <div className='ml-15 flex justify-between'>
                                                <p>{aynonymous}</p>

                                                <span className='ml-4 text-green-400'>
                                                  {
                                                    intentions[intentionSelected][intention][
                                                      'synonymous'
                                                    ][aynonymous]
                                                  }
                                                </span>
                                              </div>
                                            ))}
                                          </>
                                        ) : null}
                                      </div>

                                      <div className='ml-14'>
                                        <p className=' text-gray-400 mt-4'>Long tails</p>
                                        {intentions[intentionSelected][intention]['longTail'] ? (
                                          <>
                                            {Object.keys(
                                              intentions[intentionSelected][intention]['longTail'],
                                            ).map((longTail: any) => (
                                              <div className='ml-15 flex justify-between'>
                                                <p>{longTail}</p>
                                                <span className='ml-4 text-green-500'>
                                                  {
                                                    intentions[intentionSelected][intention][
                                                      'longTail'
                                                    ][longTail]
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
                            })}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            </>
          ) : (
            <div className='border border-dashed border-slate-600 w-full flex items-center justify-center text-2xl '>
              Selecciona las palabras clave y su intención de búsqueda
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ImportKeywordsPage;
