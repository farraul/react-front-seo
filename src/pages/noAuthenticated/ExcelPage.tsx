import React, { useRef, useState } from 'react';
import { ImportSpreadSheet } from 'src/components/ImportSpreadSheet/ImportSpreadSheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';

function Excel() {
  const [isOpenImportModal, setIsOpenImportModal] = useState(false);
  const [keywordsImported, setKeywordsImported] = useState<any>({
    seo: { vol: 500, intention: 'ninguna' },
    sem: { vol: 700, intention: 'ninguna' },
    'seo es lo mejor': { vol: 200, intention: 'ninguna' },
    'seo para barcelona': { vol: 300, intention: 'ninguna' },
    'seo online españa': { vol: 230, intention: 'ninguna' },
    'seo en denia': { vol: 120, intention: 'ninguna' },
  });

  const [keywordsChecked, setKeywordsChecked] = useState<string[]>([]);
  const [intentions, setIntentions] = useState<any>({
    seo: {
      seo: {
        vol: 1000,
        synonymous: ['mi seo', 'mi seo'],
        longTail: ['mi seo madirid', 'mi seo madrids'],
      },
      'search organic': {
        vol: 700,
        synonymous: ['organic search'],
        longTail: ['organic search madrid', 'seo organiv barcelona'],
      },
      news: ['new1', 'new2', 'new3'],
    },
    sem: {
      sem: {
        vol: 1200,
        synonymous: ['sem pay', 'i want sem'],
        longTail: ['sem madrid', 'sem madrid'],
      },
      'sem ads': {
        vol: 500,
        synonymous: ['sem ads pay', 'pay ads'],
        longTail: ['pay ads online free'],
      },
      news: ['new11', 'new22', 'new33'],
    },
  });

  const onClose = () => {
    setIsOpenImportModal(false);
  };

  const onSubmit = (e: any) => {
    console.log({ e });
    setKeywordsImported(e.validData);
  };

  const handleOnChange = (event: any) => {
    const { value, checked } = event.target;
    if (checked) {
      setKeywordsChecked((prev) => [...prev, value]);
    } else {
      setKeywordsChecked(keywordsChecked.filter((o) => o !== value));
    }
  };

  const onChangeSelect = (param: any) => {
    const updatedNews: any = [...new Set(intentions[param].news.concat(keywordsChecked))];
    setIntentions((prevState: any) => ({
      ...prevState,
      [param]: { ...prevState[param], news: updatedNews },
    }));
  };

  return (
    <>
      <ImportSpreadSheet isOpen={isOpenImportModal} onClose={onClose} onSubmit={onSubmit} />

      <section>
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

        {Object.keys(keywordsImported).map((keyword: any, index: any) => {
          return (
            <li key={index} className='flex'>
              <div className=''>
                <div className='flex py-2'>
                  <div className='w-72'>
                    <label htmlFor={`custom-checkbox-${index}`}>
                      <input
                        type='checkbox'
                        id={`custom-checkbox-${index}`}
                        name={keyword}
                        value={keyword}
                        onChange={handleOnChange}
                        className='mr-2'
                      />
                    </label>
                    {keyword}
                    <span className='ml-4'>{keywordsImported[keyword].vol}</span>
                    <span className='ml-4'>{keywordsImported[keyword].intention}</span>
                  </div>
                  <div></div>
                </div>
              </div>
            </li>
          );
        })}
      </section>
      <section>
        <p>Elementos seleccionados: {keywordsChecked.length}</p>

        <Select
          required
          onValueChange={(e) => {
            console.log({ e });
            onChangeSelect(e);
          }}
        >
          <SelectTrigger className='w-[100%] bg-white'>
            <SelectValue placeholder='Selecciona intención' />
          </SelectTrigger>

          <SelectContent>
            {Object.keys(intentions).map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className='flex gap-x-4'>
          {Object.keys(intentions).map((item) => (
            <>
              <div
                key={item}
                className=' max-w-xl   bg-primary mt-10 text-white flex flex-col justify-between'
              >
                <div className='p-10'>
                  <h3 className='text-3xl font-bold'>{item}</h3>
                  {intentions[item] &&
                    Object.keys(intentions[item]).map((intention: any) => {
                      return (
                        <div key={intention}>
                          {intention !== 'news' && (
                            <>
                              <p className=' ml-6 text-xl font-bold mt-8'>
                                {intention}
                                <span className='ml-4 text-sm text-green-400'>
                                  {intentions[item][intention]['vol']}
                                </span>
                              </p>
                              {intentions[item][intention]['synonymous'] && (
                                <>
                                  <p className='ml-10 text-gray-500 mt-2'>Sinónimos</p>
                                  {intentions[item][intention]['synonymous'].map(
                                    (aynonymous: any) => (
                                      <p className='ml-16'>{aynonymous}</p>
                                    ),
                                  )}
                                </>
                              )}

                              {intentions[item][intention]['longTail'] && (
                                <>
                                  <p className='ml-10 text-gray-500'>Long tails</p>
                                  <div className='ml-16 '>
                                    {intentions[item][intention]['longTail'].map(
                                      (longTail: any) => (
                                        <p className=''> {longTail}</p>
                                      ),
                                    )}
                                  </div>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}
                </div>
                <div className='bg-gray-400 text-l px-10 py-4'>New keywords </div>
                {intentions[item]['news'] && (
                  <div className='py-10'>
                    {intentions[item]['news'].map((aynonymous: any) => (
                      <p className='mx-10'>{aynonymous}</p>
                    ))}
                  </div>
                )}
              </div>
            </>

            // }
          ))}
        </div>
      </section>
    </>
  );
}

export default Excel;
