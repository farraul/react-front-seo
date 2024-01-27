import { useState } from 'react';
import intentionsStub from 'src/stub/intentionsStub.json';
import keywordsStub from 'src/stub/keywordsStub.json';
import { ImportSpreadSheet } from 'src/components/ImportSpreadSheet/ImportSpreadSheet';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { Modal } from 'src/components/Modals';
import { Button, CustomInput } from 'src/components/PrimitiveElements';
import { SubmitHandler, useForm } from 'react-hook-form';
const initialState: any = {
  intention: '',
};
type Inputs = { intention: string };

export const LeftHandleKewyords = ({
  setIntentionSelected,
  keywordsImported,
  setKeywordsImported,
  intentions,
  setIntentions,
}: any) => {
  const [isOpenImportModal, setIsOpenImportModal] = useState<any>(false);
  const [keywordsChecked, setKeywordsChecked] = useState<object>({});
  const [keywordsSelected, setKeywordsSelected] = useState<string>('intention');
  const [isOpenModalCreateIntention, setIsOpenModalCreateIntention] = useState<any>(false);

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

  const [isChecked, setIsChecked] = useState(
    new Array(Object.keys(keywordsImported).length).fill(false),
  );
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: initialState,
  });

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

  const closeModalCreateIntention = () => {
    setIsOpenModalCreateIntention(false);
  };

  const onSubmitform: SubmitHandler<Inputs> = (value) => {
    closeModalCreateIntention();
    console.log('data: ', value);
  };
  return (
    <>
      <div className=' bg-gray-200 p-10 rounded-sm'>
        <ImportSpreadSheet isOpen={isOpenImportModal} onClose={onClose} onSubmit={onSubmit} />
        <button
          className='btn-secondary'
          onClick={() => {
            setIsOpenImportModal((prev: any) => {
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
        <button
          className=' mt-5 ml-4 underline mb-0 text-gray-700'
          onClick={() => setIsOpenModalCreateIntention(!isOpenModalCreateIntention)}
        >
          Crear intención de búsqueda
        </button>
      </div>
      <Modal
        close={closeModalCreateIntention}
        title='Añade una intención de búsqueda'
        isOpen={isOpenModalCreateIntention}
        className={'bg-slate-200 max-w-xl'}
      >
        <form
          onSubmit={handleSubmit(onSubmitform)}
          className='space-y-4 md:space-y-6 flex flex-col justify-center bg'
        >
          <CustomInput
            name='intention'
            error={errors.intention?.message as string}
            register={register}
            rules={{
              required: true,
            }}
            type='text'
            id='intetion'
            isRequired={true}
            placeholder='intention'
          />

          <Button
            className='h-12 text-center hover:scale-110 active:scale-90 transition flex items-center text-white bg-primary justify-center'
            type='submit'
          >
            Loguearse
          </Button>
        </form>
      </Modal>
    </>
  );
};
