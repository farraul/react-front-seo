import React, { ChangeEvent, useRef, useState } from 'react';
import { ImportSpreadSheet } from 'src/components/ImportSpreadSheet/ImportSpreadSheet';
import { Button } from 'src/components/ui/button';
import keywordsStub from 'src/stub/keywordsStub.json';
import intentionsStub from 'src/stub/intentionsStub.json';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';

function AddKeywordsPage() {
  //Section: news keywords
  const [isOpenImportModal, setIsOpenImportModal] = useState(false);
  const [keywordsImported, setKeywordsImported] = useState<any>(keywordsStub);

  const [isChecked, setIsChecked] = useState(
    new Array(Object.keys(keywordsImported).length).fill(false),
  );

  const [keywordsChecked, setKeywordsChecked] = useState<object>({});

  //Section: intentions
  const [intentionSelected, setIntentionSelected] = useState<string>('');

  const [keywordsSelected, setKeywordsSelected] = useState<string>('intention');

  const [intentions, setIntentions] = useState<any>(intentionsStub);

  const onClose = () => {
    setIsOpenImportModal(false);
  };

  const onSubmit = ({ validData }: any) => {
    const dataFormatted = validData.map((dataKeyword: any) => {
      return { [dataKeyword['Keyword']]: dataKeyword['vol'] };
    });

    const ArraytoObject = Object.assign({}, ...dataFormatted);
    setKeywordsImported(ArraytoObject);
  };

  const handleOnChange = (indexIn: number, keyword: any) => {
    const updatedCheckedState = isChecked.map((item, index) => (index === indexIn ? !item : item));
    setIsChecked(updatedCheckedState);
    setKeywordsChecked((prev) => ({ ...prev, [keyword]: keywordsImported[keyword] }));
  };

  const onChangeSelect = (param: any) => {
    const updatedNews: any = Object.assign({}, intentions[param].news, keywordsChecked);
    setIntentions((prevState: any) => ({
      ...prevState,
      [param]: { ...prevState[param], news: updatedNews },
    }));

    setIsChecked(new Array(Object.keys(keywordsImported).length).fill(false));
    setKeywordsChecked({});
  };

  return (
    <>
      <section className='flex p-20 gap-x-14 '>
        <div className=' max-w-lg w-full h-fit'>
          <h3 className='text-4xl font-bold px-12  text-primary-generic mb-16'>Nuevas Keywords</h3>
          <div className=' bg-gray-200 p-10 rounded-sm'>
            <ImportSpreadSheet isOpen={isOpenImportModal} onClose={onClose} onSubmit={onSubmit} />
            <button
              className='btn-secondary'
              onClick={() => {
                setIsOpenImportModal((prev) => {
                  return !prev;
                });
              }}
            >
              Añadir archivo
            </button>
            <p className='mt-10 font-bold text-xl text-gray-700 mb-6'>Keywords importadas:</p>
            <div className=' overflow-y-auto h-96'>
              {Object.entries(keywordsImported).map(([keyword, vol], i) => {
                console.log(keyword, vol, i);
                return (
                  <li key={keyword} className='flex'>
                    <div className=''>
                      <div className='flex py-2'>
                        <div className='w-72 flex items-center'>
                          <label htmlFor={`custom-checkbox-${keyword}`}>
                            <input
                              type='checkbox'
                              id={`custom-checkbox-${keyword}`}
                              name={keyword}
                              value={keyword}
                              checked={isChecked[i]}
                              onChange={() => handleOnChange(i, keyword)}
                              className='mr-2 h-5 w-5'
                            />
                          </label>
                          <span className='mb-1 ml-2'>{keyword}</span>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </div>
            <p className='font-bold mt-10 text-xl mb-6 text-gray-700'>
              Keywords seleccionadas: {Object.keys(keywordsChecked).length}
            </p>

            <Select
              disabled={Object.keys(keywordsChecked).length ? false : true}
              required
              value={keywordsSelected}
              onValueChange={(e) => {
                console.log(e);
                onChangeSelect(e);
                setKeywordsSelected('intention');
                setIntentionSelected(e);
                setKeywordsChecked({});
              }}
            >
              <SelectTrigger className='w-[100%] bg-white'>
                <SelectValue placeholder='Selecciona laintención de búsqueda' />
              </SelectTrigger>

              <SelectContent>
                <SelectItem key='{intention} ' value='intention'>
                  Selecciona la intención de búsqueda
                </SelectItem>
                {Object.keys(intentions).map((intention) => (
                  <SelectItem key={intention} value={intention}>
                    {intention}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className=' mt-5 ml-4 underline mb-0 text-gray-700'>Crear intención de búsqueda</p>
          </div>
        </div>
        <div className='w-full max-w-7xl'>
          <div className='flex gap-x-4'>
            {intentionSelected && (
              <>
                {console.log(intentionSelected)}
                <>
                  <div className=' text-white flex flex-col items-center  rounded-sm w-full  '>
                    <h3 className='text-4xl font-bold px-12  text-primary-generic mb-16'>
                      {intentionSelected}
                    </h3>
                    <div className='flex'>
                      <div className=' w-full max-w-sm border-2 bg-gray-700'>
                        <p className='bg-gray-800 text-l px-10 py-4 '>Nuevas palabras</p>
                        {Object.keys(intentions[intentionSelected]['news']).length ? (
                          <div className='px-6  bg-gray-700 pb-8  overflow-y-auto max-h-[550px]		'>
                            {Object.keys(intentions[intentionSelected]['news']).map((keyword) => (
                              <>
                                <div className='flex mt-4 flex-col '>
                                  <p className=' w-full flex justify-between'>
                                    {keyword}
                                    <span className='ml-4 text-green-400  mr-2'>
                                      {intentions[intentionSelected]['news'][keyword]}
                                    </span>
                                  </p>
                                  <div className='w-full mt-2'>
                                    <Select
                                      required
                                      onValueChange={(param) => {
                                        const mainKeyword = param.split('*')[1];
                                        const typeKeyword: any = param.split('*')[2];
                                        const keyword: any = param.split('*')[3];
                                        const vol: any = param.split('*')[4];
                                        const updatedType: any = Object.assign(
                                          ...[
                                            intentions[intentionSelected][mainKeyword][typeKeyword],
                                          ],
                                          { [keyword]: vol },
                                        );

                                        delete intentions[intentionSelected]['news'][keyword];

                                        setIntentions((prevState: any) => ({
                                          ...prevState,
                                          [intentionSelected]: {
                                            ...prevState[intentionSelected],
                                            [mainKeyword]: {
                                              ...prevState[intentionSelected][mainKeyword],
                                              [typeKeyword]: updatedType,
                                            },
                                            ['news']: intentions[intentionSelected]['news'],
                                          },
                                        }));
                                      }}
                                    >
                                      <SelectTrigger className='w-[100%] bg-white text-black'>
                                        <SelectValue placeholder='Asignar' />
                                      </SelectTrigger>

                                      <SelectContent>
                                        <>
                                          {Object.keys(intentions[intentionSelected])
                                            .filter((b: any) => b !== 'news')
                                            .map((i: any) => {
                                              return (
                                                <>
                                                  <SelectGroup>
                                                    <SelectLabel>{i}</SelectLabel>

                                                    <SelectItem
                                                      key={`synonymous${i}`}
                                                      value={`${intentionSelected}*${i}*synonymous*${keyword}*${intentions[intentionSelected]['news'][keyword]}`}
                                                    >
                                                      Sinónimos
                                                    </SelectItem>
                                                    <SelectItem
                                                      key={`longTail${i}`}
                                                      value={`${intentionSelected}*${i}*longTail*${keyword}*${intentions[intentionSelected]['news'][keyword]}`}
                                                    >
                                                      Long tails
                                                    </SelectItem>
                                                  </SelectGroup>
                                                </>
                                              );
                                            })}
                                        </>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </>
                            ))}
                          </div>
                        ) : (
                          <div className='bg-gray-600'>
                            <p className='px-10 py-5'>No hay nuevas keywords</p>
                          </div>
                        )}
                      </div>

                      <div className=' flex  flex-wrap  '>
                        {intentions[intentionSelected] &&
                          Object.keys(intentions[intentionSelected])
                            .filter((mainKeyword: any) => mainKeyword !== 'news')
                            .map((intention: any) => {
                              return (
                                <div
                                  key={intention}
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
                              //  :null}
                            })}
                      </div>
                    </div>
                  </div>
                </>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default AddKeywordsPage;
