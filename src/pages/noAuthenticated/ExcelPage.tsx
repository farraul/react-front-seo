import React, { ChangeEvent, useRef, useState } from 'react';
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

  const [keywordsChecked, setKeywordsChecked] = useState<object>({});

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
      news: { 'mi seo madirid': 100, 'mi sebo madrids': 300 },
    },
    sem: {
      sem: {
        vol: 1200,
        synonymous: { 'mi seoo madirid': 34, 'mi seo omadrids': 340 },
        longTail: { 'mi seo mkadirid': 130, 'mi seo madrids': 300 },
      },
      semAds: {
        vol: 500,
        synonymous: { 'mbi seko madirid': 100, 'mi seo madrids': 120 },
        longTail: { 'mi bseo madirid': 14320, 'mi seo madrids': 400 },
      },
      news: { 'mi seo mbadirid': 130, 'mi seno madrids': 230 },
    },
  });

  const [isChecked, setIsChecked] = useState(
    new Array(Object.keys(keywordsImported).length).fill(false),
  );

  const onClose = () => {
    setIsOpenImportModal(false);
  };

  const onSubmit = (e: any) => {
    setKeywordsImported(e.validData);
  };

  const handleOnChange = (indexIn: number) => {
    const updatedCheckedState = isChecked.map((item, index) => (index === indexIn ? !item : item));
    console.log({ keywordsImported });
    const arreglo = Object.entries(keywordsImported);
    console.log('handleOnChange  arreglo:', arreglo);

    setIsChecked(updatedCheckedState);
    console.log(arreglo[indexIn][0]);

    if (updatedCheckedState) {
      setKeywordsChecked((prev) => ({ ...prev, keywordsImported }));
    } else {
      // setKeywordsChecked(keywordsChecked.filter((o) => o !== arreglo[indexIn][0]));
    }
  };

  const onChangeSelect = (param: any) => {
    console.log(intentions[param].news);
    console.log(keywordsChecked);
    const updatedNews: any = Object.assign({}, intentions[param].news, keywordsChecked);

    setIntentions((prevState: any) => ({
      ...prevState,
      [param]: { ...prevState[param], news: updatedNews },
    }));

    setIsChecked(new Array(Object.keys(keywordsImported).length).fill(false));
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
                        checked={isChecked[index]}
                        onChange={() => handleOnChange(index)}
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
        <p>Elementos seleccionados: {Object.keys(keywordsChecked).length}</p>

        <Select
          required
          onValueChange={(e) => {
            onChangeSelect(e);
          }}
        >
          <SelectTrigger className='w-[100%] bg-white'>
            <SelectValue placeholder='Selecciona intención' />
          </SelectTrigger>

          <SelectContent>
            {Object.keys(intentions).map((intention) => (
              <SelectItem key={intention} value={intention}>
                {intention}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className='flex gap-x-4'>
          {Object.keys(intentions).map((item) => (
            <>
              <div
                key={item}
                className=' max-w-3xl w-100  bg-primary mt-10 text-white flex flex-col justify-between'
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
                              {console.log(intentions[item][intention]['synonymous'])}
                              {Object.keys(intentions[item][intention]['synonymous']).length && (
                                <>
                                  <p className='ml-10 text-gray-500 mt-2'>Sinónimos</p>
                                  {Object.keys(intentions[item][intention]['synonymous']).map(
                                    (aynonymous: any, vol: number) => (
                                      <p className='ml-16'>
                                        {aynonymous}
                                        <span className='ml-4 text-green-500'>
                                          {intentions[item][intention]['synonymous'][aynonymous]}
                                        </span>
                                      </p>
                                    ),
                                  )}
                                </>
                              )}

                              {intentions[item][intention]['longTail'] && (
                                <>
                                  <p className='ml-10 text-gray-500'>Long tails</p>
                                  <div className='ml-16 '>
                                    {Object.keys(intentions[item][intention]['longTail']).map(
                                      (longTail: any) => (
                                        <p className=''>
                                          {longTail}
                                          <span className='ml-4 text-green-500'>
                                            {intentions[item][intention]['longTail'][longTail]}
                                          </span>
                                        </p>
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
                  <div className='p-10 '>
                    {Object.keys(intentions[item]['news']).map((aynonymous: any) => (
                      <>
                        <div className='flex mt-1 '>
                          <p className=' w-56'>{aynonymous}</p>
                          <div className='w-full ml-10'>
                            <Select
                              required
                              onValueChange={(param) => {
                                console.log('Excel  param:', param);
                                console.log(param.split('*'));
                                const typeKeyword = param.split('*')[0];
                                console.log('Excel  typeKeyword:', typeKeyword);

                                const mainKeyword = param.split('*')[1];
                                console.log('Excel  mainKeyword:', mainKeyword);

                                const keyword: any = param.split('*')[2];
                                console.log('Excel  keyword:', keyword);

                                const vol: any = param.split('*')[3];
                                console.log('Excel  vol:', vol);
                                console.log({ item });

                                // console.log('Excel  type:', typeKeyword);
                                // console.log({ newKeyword });
                                console.log(intentions[item]);
                                console.log(intentions[item][keyword]);
                                console.log(intentions[item][keyword][typeKeyword]);
                                console.log(keyword);
                                // console.log(keyword);

                                const updatedType: any = Object.assign(
                                  ...[intentions[item][keyword][typeKeyword]],
                                  ...keyword,
                                );
                                console.log('Excel  updatedType:', updatedType);

                                // const updatedNews: any = [
                                //   ...new Set(
                                //     intentions[item]['news'].filter(
                                //       (newsItem: string) => newsItem !== keyword,
                                //     ),
                                //   ),
                                // ];

                                // let updatedNews: any = {
                                //   intentions[item]['news']
                                // };

                                console.log(intentions[item]['news']);

                                for (const i of Object.entries(intentions[item]['news'])) {
                                  const dataIn = { [i[0]]: i[1] };

                                  if (dataIn !== keyword) {
                                    //  updatedNews={ updatedNews, i[0]}
                                  }
                                }

                                // console.log('Excel  updatedNews:', updatedNews);

                                // console.log('Excel  updatedType:', updatedType);
                                // console.log({ item });
                                // console.log(intentions);

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

                                // setIntentions((prevState: any) => ({
                                //   ...prevState,
                                //   seo: {
                                //     ...prevState['seo'],
                                //     seo: { ...prevState['seo']['seo'], synonymous: ['casa'] },
                                //   },
                                // }));

                                console.log(intentions);
                              }}
                            >
                              <SelectTrigger className='w-[100%] bg-white text-black'>
                                <SelectValue placeholder='Asignar' />
                              </SelectTrigger>

                              <SelectContent>
                                <>
                                  {console.log(intentions[item]['news'])}
                                  {console.log(Object.entries(intentions[item]))}
                                  {/* {Object.entries(intentions[item])
                                    .filter((i: any, a) => i !== 'news')
                                    .map((i: any) => ( */}
                                  {Object.keys(intentions[item]['news']).map((i: any) => {
                                    console.log(i);
                                    console.log(intentions[item]['news'][i]);
                                    return (
                                      <>
                                        <SelectItem disabled value={i} className='font-bold'>
                                          {i}
                                        </SelectItem>
                                        <SelectItem
                                          key={`synonymous${i}`}
                                          value={`synonymous*${i}*${item}*${intentions[item]['news'][i]}`}
                                        >
                                          Sinónimos
                                        </SelectItem>
                                        <SelectItem
                                          key={`longTail${i}`}
                                          value={`longTail*${i}*${aynonymous}`}
                                        >
                                          Long tails
                                        </SelectItem>
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
