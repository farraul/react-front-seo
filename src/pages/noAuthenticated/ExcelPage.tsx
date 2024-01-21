import React, { useState } from 'react';
import { ReactSpreadsheetImport } from 'react-spreadsheet-import';

function Excel() {
  const [isOpen, setIsOpen] = useState(false);
  const [group, setgroup] = useState();

  const [selectedOption, setSelectedOption] = useState();
  const [checkedState, setCheckedState] = useState<string[]>([]);
  console.log('Excel  checkedState:', checkedState);

  console.log('Excel  checkedState:', checkedState);
  const [openModal, setOpenModal] = useState(false);

  // console.log('ImportExcel  keywords:', keywords);

  const fields = [
    {
      label: 'keyword',
      key: 'name',
      alternateMatches: ['Keyword', 'first'],
      fieldType: {
        type: 'input',
      },
      example: 'Seo',
      validations: [
        {
          rule: 'required',
          errorMessage: 'Name is required',
          level: 'error',
        },
      ],
    },
  ];

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmit = (e: any) => {
    console.log({ e });
    setKeywords(e.validData);
  };

  const handleOnChange = (event: any) => {
    const { value, checked } = event.target;
    if (checked) {
      setOpenModal(true);
      setCheckedState((prev) => [...prev, value]);
    } else {
      setOpenModal(false);
      setCheckedState(checkedState.filter((o) => o !== value));
    }
  };

  const options = [
    { name: 'a', value: 'a' },
    { name: 'b', value: 'b' },
  ];

  const [intentionSearch, setIntentionSearch] = useState<any>({
    seo: {
      'seo palabra principal': {
        synonymous: ['mi seo', 'mi seo'],
        longTail: ['mi seo madirid', 'mi seo madrids'],
      },
      'search organic': {
        synonymous: ['organic search'],
        longTail: ['organic search madrid', 'seo organiv barcelona'],
      },
    },
    sem: {
      sem: {
        synonymous: ['sem pay', 'i want sem'],
        longTail: ['sem madrid', 'sem madrid'],
      },
      'sem ads': {
        synonymous: ['sem ads pay', 'pay ads'],
        longTail: ['pay ads online free'],
      },
    },
  });

  const [keywords, setKeywords] = useState<any>({
    seo: { vol: 500, intention: 'ninguna' },
    sem: { vol: 700, intention: 'ninguna' },
  });
  const [isMainKeyword, setIsMainKeyword] = useState<any>(false);

  const onChangeSelect = (e: any) => {
    console.log('onChangeSelect  e:', e);

    console.log({ isMainKeyword });
    setIsMainKeyword(e);
    console.log({ isMainKeyword });
  };

  return (
    <>
      <ReactSpreadsheetImport
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        fields={fields}
      />
      <section>
        <button
          className='btn-secondary'
          onClick={() => {
            setIsOpen((prev) => {
              return !prev;
            });
          }}
        >
          Añadir archivo
        </button>

        {Object.keys(keywords).map((keyword: any, index: any) => {
          return (
            <li key={index} className='flex'>
              <div className=''>
                <div className='flex py-2'>
                  {/* <Select name={''} options={options} onChange={onChangeSelect} onBlur={undefined} /> */}
                  <div className='w-56'>
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
                    <span className='ml-4'>{keywords[keyword].vol}</span>
                    <span className='ml-4'>{keywords[keyword].intention}</span>
                    {/* {<span className='ml-4'>{keywords[keyword].intention}</span>} */}
                  </div>
                  <div>
                    {/* <select
                      value={selectedOption}
                      onChange={
                        // (e) => setSelectedOption(e.target.value)
                        (e) => onChangeSelect(e.target.value)
                      }
                    >
                      <option value='' disabled hidden>
                        Selecciona intención de búsqueda
                      </option>
                      {/* <option value=''>Crear intención de búsqueda</option> */}

                    {/* {Object.keys(intentionSearch).map((item, i) => {
                      return (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      );
                      // {Object.keys(intentionSearch[item]).map((item, i) => {
                      // return <p>{item}</p>;}}
                    })} */}

                    {/* 
                      // {Object.keys(intentionSearch).map((item, i) => (
                      //   <option key={item} value={item}>
                      //     {item}
                      //   </option>
                      // ))} }
                    </select> */}

                    {/* {isMainKeyword && (
                      <select
                        value={selectedOption}
                        onChange={
                          // (e) => setSelectedOption(e.target.value)
                          onChangeSelect
                        }
                      >
                        <option value='' disabled hidden>
                          Selecciona intención de búsqueda
                        </option>
                        {/* <option value=''>Crear intención de búsqueda</option> */}

                    {/* {Object.keys(intentionSearch).map((item, i) => {
                      return (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      );
                      // {Object.keys(intentionSearch[item]).map((item, i) => {
                      // return <p>{item}</p>;}}
                    })} */}

                    {/* 
                      // {Object.keys(intentionSearch).map((item, i) => (
                      //   <option key={item} value={item}>
                      //     {item}
                      //   </option>
                      // ))} }
                      </select> 
                      )}*/}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </section>
      <section>
        <p>Elementos seleccionados: {checkedState.length}</p>
        <select
          value={selectedOption}
          onChange={
            // (e) => setSelectedOption(e.target.value)
            (e) => onChangeSelect(e.target.value)
          }
        >
          <option value='' disabled hidden>
            Selecciona intención de búsqueda
          </option>
          {/* <option value=''>Crear intención de búsqueda</option> */}

          {Object.keys(intentionSearch).map((item, i) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
            // {Object.keys(intentionSearch[item]).map((item, i) => {
            // return <p>{item}</p>;}}
          })}

          {/* 
                      // {Object.keys(intentionSearch).map((item, i) => (
                      //   <option key={item} value={item}>
                      //     {item}
                      //   </option>
                      // ))} */}
        </select>

        {/* <section>{openPopUp && <div className='bg-slate-200'>ñññ</div>}</section> */}

        {Object.keys(intentionSearch).map((item, i) => (
          <div key={item} className='p-4 mt-6 bg-primary mt-1 text-white'>
            <h3 className='text-2xl font-bold'>Intención de búsqueda: {item}</h3>
            {console.log(intentionSearch[item])}

            {intentionSearch[item] &&
              Object.keys(intentionSearch[item]).map((intention: any) => {
                return (
                  <>
                    <p className='mt-2 ml-6'>Keywords principales: {intention}</p>
                    {intentionSearch[item][intention]['synonymous'] &&
                      intentionSearch[item][intention]['synonymous'].map((aynonymous: any) => (
                        <p className='ml-12'>Sinónimo: {aynonymous}</p>
                      ))}

                    {intentionSearch[item][intention]['longTail'] && (
                      <div className='ml-12 mt-6'>
                        {intentionSearch[item][intention]['longTail'].map((longTail: any) => (
                          <p className=''>Long Tail: {longTail}</p>
                        ))}
                      </div>
                    )}
                  </>
                );
              })}

            {/* {intentionSearch[item] &&
            intentionSearch[item].map((intention: any) => <p className='mt-2'>{intention} 
                </p>
              ))}} */}
          </div>
        ))}
      </section>
    </>
  );
}

export default Excel;
