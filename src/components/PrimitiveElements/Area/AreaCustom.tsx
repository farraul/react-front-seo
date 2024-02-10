import React, { useState } from 'react';
import type { RegisterOptions, UseFormRegister } from 'react-hook-form';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

type AttributeProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

type Props = {
  label?: string;
  placeholder?: string;
  id: string;
  isRequired?: boolean;
  name?: string;
  classAditional?: string;
  error: string;
  rules?: RegisterOptions;
  register: UseFormRegister<any>;
} & AttributeProps;

const AreaCustom = ({
  id,
  label,
  isRequired,
  classAditional,
  name,
  placeholder,
  rules,
  error,
  register,
  ...props
}: Props) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={`${classAditional || ''} flex flex-col w-full`}>
      {label && (
        <label className='' htmlFor={id}>
          {label}
          {isRequired && <b className='text-red-900'>*</b>}
        </label>
      )}
      <div className='relative w-full flex items-center '>
        <textarea
          id={id}
          placeholder={placeholder}
          required={isRequired}
          className={`${
            id === 'password' || id === 'confirmPassword' ? 'pr-10' : 'w-full'
          } custom-input  w-full p-1 mt-1`}
          value={value}
          onChange={handleChange}
          {...(register && register(name as string, rules))}
          {...props}
        />
      </div>

      {error && <p className='mt-3 ml-1 text-xs text-red-500 self-start '>{error}</p>}
    </div>
  );
};

export default AreaCustom;
