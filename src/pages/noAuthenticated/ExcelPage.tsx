import React, { ChangeEvent, useRef, useState } from 'react';
import { ImportSpreadSheet } from 'src/components/ImportSpreadSheet/ImportSpreadSheet';
import { Button } from 'src/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';

function Excel() {
  const [isOpenImportModal, setIsOpenImportModal] = useState(false);
  const [keywordsImported, setKeywordsImported] = useState<any>({
    ' Que es el seo': 500,
    'seo es lo mejor': 200,
    'sem valencia': 700,
    'agencia de anuncios': 240,
    'seo pro': 130,
    sem: 700,
    'seo para barcelona y cercanias': 300,
    'pay per clic': 500,
  });

  const [intentions, setIntentions] = useState<any>({
    seo: {
      seo: {
        vol: 1000,
        synonymous: { 'sinmi seo madird': 40, 'mi seno madrids': 34 },
        longTail: { 'longmi seo madiridpppp': 100, 'mi sebo madrids': 300 },
      },
      'search Organic': {
        vol: 700,
        synonymous: { 'mi seo adirid': 100, 'mi seno madrids': 300 },
        longTail: { 'mi seo mairid': 100, 'mi sbeo madrids': 300 },
      },
      news: {},
    },
    sem: {
      sem: {
        vol: 1200,
        synonymous: {},
        longTail: {},
      },
      semAds: {
        vol: 500,
        synonymous: { 'mbi seko madirid': 100, 'mi seo madrids': 120 },
        longTail: { 'mi bseo madirid': 140, 'mi seo madrids': 400 },
      },
      news: {},
    },
  });

  const [isChecked, setIsChecked] = useState(
    new Array(Object.keys(keywordsImported).length).fill(false),
  );
  const [keywordsChecked, setKeywordsChecked] = useState<object>({});
  const [keywordsSelected, setKeywordsSelected] = useState<string>('intention');

  const onClose = () => {
    setIsOpenImportModal(false);
  };

  const onSubmit = (e: any) => {
    setKeywordsImported(e.validData);
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
      <section className='flex p-20 gap-x-10'>
        <div className=' max-w-xl w-full'>
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
            {Object.entries(keywordsImported).map(([keyword, vol], i) => {
              console.log(keyword, vol, i);
              return (
                <li key={keyword} className='flex'>
                  <div className=''>
                    <div className='flex py-2'>
                      <div className='w-72'>
                        <label htmlFor={`custom-checkbox-${keyword}`}>
                          <input
                            type='checkbox'
                            id={`custom-checkbox-${keyword}`}
                            name={keyword}
                            value={keyword}
                            checked={isChecked[i]}
                            onChange={() => handleOnChange(i, keyword)}
                            className='mr-2'
                          />
                        </label>
                        {keyword}
                      </div>
                      <div></div>
                    </div>
                  </div>
                </li>
              );
            })}
            <p className='font-bold mt-10 text-xl mb-6 text-gray-700'>
              Keywords seleccionadas: {Object.keys(keywordsChecked).length}
            </p>

            <Select
              required
              value={keywordsSelected}
              onValueChange={(e) => {
                console.log(e);
                onChangeSelect(e);
                setKeywordsSelected('intention');
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
          </div>
        </div>
        <div>
          <div className='flex gap-x-4 '>
            {Object.keys(intentions).map((item) => (
              <>
                <div
                  key={item}
                  className=' max-w-4xl w-100 bg-primary text-white flex flex-col justify-between rounded-sm'
                >
                  <div className='p-10'>
                    <h3 className='text-3xl font-bold'>{item}</h3>
                    {intentions[item] &&
                      Object.keys(intentions[item]).map((intention: any) => {
                        return (
                          <div key={intention}>
                            {intention !== 'news' && (
                              <>
                                <div className='flex ml-6 mt-8 text-xl font-bold justify-between'>
                                  <p className='  '>{intention}</p>
                                  <span className='  text-green-400'>
                                    {intentions[item][intention]['vol']}
                                  </span>
                                </div>
                                {console.log(intentions[item][intention]['synonymous'])}
                                <div className='ml-20'>
                                  <p className=' text-gray-400 mt-2'>Sinónimos</p>
                                  {Object.keys(intentions[item][intention]['synonymous']).length ? (
                                    <>
                                      {Object.keys(intentions[item][intention]['synonymous']).map(
                                        (aynonymous: any) => (
                                          <div className='ml-15 flex justify-between'>
                                            <p>{aynonymous}</p>

                                            <span className='ml-4 text-green-400'>
                                              {
                                                intentions[item][intention]['synonymous'][
                                                  aynonymous
                                                ]
                                              }
                                            </span>
                                          </div>
                                        ),
                                      )}
                                    </>
                                  ) : null}
                                </div>

                                <div className='ml-20'>
                                  <p className=' text-gray-400 mt-4'>Long tails</p>
                                  {intentions[item][intention]['longTail'] ? (
                                    <>
                                      {Object.keys(intentions[item][intention]['longTail']).map(
                                        (longTail: any) => (
                                          <div className='ml-15 flex justify-between'>
                                            <p>{longTail}</p>
                                            <span className='ml-4 text-green-500'>
                                              {intentions[item][intention]['longTail'][longTail]}
                                            </span>
                                          </div>
                                        ),
                                      )}
                                    </>
                                  ) : null}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                  </div>
                  <div>
                    <p className='bg-gray-800 text-l px-10 py-4'>Nuevas palabras</p>
                    {Object.keys(intentions[item]['news']).length ? (
                      <div className='p-10 bg-gray-700'>
                        {Object.keys(intentions[item]['news']).map((keyword) => (
                          <>
                            <div className='flex mt-1 '>
                              <p className=' w-full'>
                                {keyword ? keyword : 'g'}
                                <span className='ml-4 text-green-400'>
                                  {intentions[item]['news'][keyword]}{' '}
                                </span>
                              </p>
                              <div className='w-full ml-4'>
                                <Select
                                  required
                                  onValueChange={(param) => {
                                    const mainKeyword = param.split('*')[1];
                                    const typeKeyword: any = param.split('*')[2];
                                    const keyword: any = param.split('*')[3];
                                    const vol: any = param.split('*')[4];
                                    const updatedType: any = Object.assign(
                                      ...[intentions[item][mainKeyword][typeKeyword]],
                                      { [keyword]: vol },
                                    );

                                    delete intentions[item]['news'][keyword];

                                    setIntentions((prevState: any) => ({
                                      ...prevState,
                                      [item]: {
                                        ...prevState[item],
                                        [mainKeyword]: {
                                          ...prevState[item][mainKeyword],
                                          [typeKeyword]: updatedType,
                                        },
                                        ['news']: intentions[item]['news'],
                                      },
                                    }));
                                  }}
                                >
                                  <SelectTrigger className='w-[100%] bg-white text-black'>
                                    <SelectValue placeholder='Asignar' />
                                  </SelectTrigger>

                                  <SelectContent>
                                    <>
                                      {Object.keys(intentions[item])
                                        .filter((b: any) => b !== 'news')
                                        .map((i: any) => {
                                          return (
                                            <>
                                              <SelectGroup>
                                                <SelectLabel>{i}</SelectLabel>

                                                <SelectItem
                                                  key={`synonymous${i}`}
                                                  value={`${item}*${i}*synonymous*${keyword}*${intentions[item]['news'][keyword]}`}
                                                >
                                                  Sinónimos
                                                </SelectItem>
                                                <SelectItem
                                                  key={`longTail${i}`}
                                                  value={`${item}*${i}*longTail*${keyword}*${intentions[item]['news'][keyword]}`}
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
                </div>
              </>

              // }
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Excel;
