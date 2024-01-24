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
    'seo para barcelona y cercan para barcelona y cercan': 300,
    'pay per clic': 500,
  });

  const [intentions, setIntentions] = useState<any>({
    Seo: {
      Seo: {
        vol: 1000,
        synonymous: { 'sinmi seo madird': 40, 'mi seno madrids': 34 },
        longTail: { 'longmi seo madiridpppp': 100, 'mi sebo madrids': 300 },
      },
      'search Organic': {
        vol: 700,
        synonymous: { 'mi seo adirid': 100, 'mi seno madrids': 300 },
        longTail: { 'mi seo mairid': 100, 'mi sbeo madrids': 300 },
      },
      'El seo': {
        vol: 700,
        synonymous: { 'mi seo adirid': 100, 'mi seno madrids': 300 },
        longTail: { 'mi seo mairid': 100, 'mi sbeo madrids': 300 },
      },
      'Search búsqUedas': {
        vol: 700,
        synonymous: { 'mi seo adirid': 100, 'mi seno madrids': 300 },
        longTail: { 'mi seo mairid': 100, 'mi sbeo madrids': 300 },
      },
      news: {},
    },
    // sem: {
    //   sem: {
    //     vol: 1200,
    //     synonymous: {},
    //     longTail: {},
    //   },
    //   semAds: {
    //     vol: 500,
    //     synonymous: {},
    //     longTail: {},
    //   },
    //   news: {},
    // },
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
        <div className='w-full'>
          <div className='flex gap-x-4'>
            {Object.keys(intentions).map((item) => (
              <>
                <div
                  key={item}
                  className=' text-white flex flex-col items-center  rounded-sm w-full  '
                >
                  <h3 className='text-4xl font-bold px-12  text-primary-generic mb-16'>{item}</h3>
                  <div className='flex'>
                    <div className='w-96  border-2 bg-gray-700'>
                      <p className='bg-gray-800 text-l px-10 py-4 '>Nuevas palabras</p>
                      {Object.keys(intentions[item]['news']).length ? (
                        <div className='px-6  bg-gray-700'>
                          {Object.keys(intentions[item]['news']).map((keyword) => (
                            <>
                              <div className='flex mt-4 flex-col '>
                                <p className=' w-full flex justify-between'>
                                  {keyword}
                                  <span className='ml-4 text-green-400  mr-2'>
                                    {intentions[item]['news'][keyword]}
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

                    <div className=' flex  flex-wrap  '>
                      {intentions[item] &&
                        Object.keys(intentions[item])
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
                                        {intentions[item][intention]['vol']}
                                      </span>
                                    </div>
                                    {console.log(intentions[item][intention]['synonymous'])}
                                    <div className='ml-14'>
                                      <p className=' text-gray-400 mt-2'>Sinónimos</p>
                                      {Object.keys(intentions[item][intention]['synonymous'])
                                        .length ? (
                                        <>
                                          {Object.keys(
                                            intentions[item][intention]['synonymous'],
                                          ).map((aynonymous: any) => (
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
                                          ))}
                                        </>
                                      ) : null}
                                    </div>

                                    <div className='ml-14'>
                                      <p className=' text-gray-400 mt-4'>Long tails</p>
                                      {intentions[item][intention]['longTail'] ? (
                                        <>
                                          {Object.keys(intentions[item][intention]['longTail']).map(
                                            (longTail: any) => (
                                              <div className='ml-15 flex justify-between'>
                                                <p>{longTail}</p>
                                                <span className='ml-4 text-green-500'>
                                                  {
                                                    intentions[item][intention]['longTail'][
                                                      longTail
                                                    ]
                                                  }
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
                            //  :null}
                          })}
                    </div>
                  </div>
                </div>
              </>

              // }
            ))}
          </div>
        </div>
      </section>
      <section>
        <h1 className='text-2xl p-20'>
          Intenciones de búsqueda
          <p className='text-sm bg-blue-400 w-fit p-4 rounded-sm mt-4 font-bold'>
            crear intención de búsuqeda
          </p>
        </h1>
      </section>
    </>
  );
}

export default Excel;
