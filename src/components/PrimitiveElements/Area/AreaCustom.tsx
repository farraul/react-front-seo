import React, { useState } from 'react';
import type { RegisterOptions, UseFormRegister } from 'react-hook-form';

type AttributeProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

type Props = {
  classAditional?: string;
  label: string;
  id: string;
  register: UseFormRegister<any>;
  error: string;
  isRequired?: boolean;
  name?: string;
  rules?: RegisterOptions;
} & AttributeProps;

const CustomTextArea = ({
  classAditional,
  label,
  id,
  isRequired,
  error,
  register,
  rules,
  name,
  ...props
}: Props) => {
  return (
    <div className={`${classAditional} flex items-center justify-center flex-col w-full`}>
      <label className='label-primary' htmlFor={id}>
        {label}
        {isRequired && <b className='text-red-500 f'>*</b>}
      </label>
      <div className='w-full relative'>
        <textarea
          {...(register && register(name as string, rules))}
          {...props}
          name={name}
          id={id}
          className='h-20 pb-3 pr-1 custom-input'
        />
      </div>
      {error && <p className='mt-1 ml-1 text-xs text-red-500 self-start '>{error}</p>}
    </div>
  );
};

export default CustomTextArea;
