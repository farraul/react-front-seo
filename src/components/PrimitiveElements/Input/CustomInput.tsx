import React, { useState } from 'react';
import type { RegisterOptions, UseFormRegister } from 'react-hook-form';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

type AttributeProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type typeInput = 'text' | 'password' | 'number' | 'email' | '';

type Props = {
  label?: string;
  placeholder?: string;
  id: string;
  isRequired?: boolean;
  name?: string;
  classAditional?: string;
  type: typeInput;
  error: string;
  rules?: RegisterOptions;
  register: UseFormRegister<any>;
} & AttributeProps;

const CustomInput = ({
  id,
  label,
  isRequired,
  type,
  classAditional,
  name,
  placeholder,
  rules,
  error,
  register,
  ...props
}: Props) => {
  const [currentType, setCurrentType] = useState<typeInput>(type);

  const handlePassword = () => {
    console.log({ error });

    const typeIn = currentType === 'password' ? 'text' : 'password';
    setCurrentType(typeIn);
  };

  return (
    <div className={`${classAditional || ''} flex flex-col w-full`}>
      {label && (
        <label className='text-secondary' htmlFor={id}>
          {label}
          {isRequired && <b className='text-red-900'>*</b>}
        </label>
      )}
      <div className='relative w-full flex items-center '>
        <input
          id={id}
          placeholder={placeholder}
          required={isRequired}
          type={currentType}
          className={`${
            id === 'password' || id === 'confirmPassword' ? 'pr-10' : 'w-full'
          } custom-input  w-full p-1 mt-1`}
          {...(register && register(name as string, rules))}
          {...props}
        />

        {id === 'password' || id === 'confirmPassword' ? (
          <button
            type='button'
            className='absolute top-3 hover:scale-110 transition-all active:scale-95  right-3 text-lg'
            onClick={handlePassword}
          >
            {currentType === type ? <FaEye /> : <FaEyeSlash />}
          </button>
        ) : null}
      </div>

      {error && <p className='mt-3 ml-1 text-xs text-red-500 self-start '>{error}</p>}
    </div>
  );
};

export default CustomInput;
