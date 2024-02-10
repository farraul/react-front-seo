import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import { typeModalOpen } from 'src/models/modals';

createPortal;

interface ModalProps {
  close: () => void;
  isOpen: typeModalOpen;
  typeModal: typeModalOpen;
  title: string;
  className: string;
  children: ReactNode;
}

const PortalModal = ({ close, isOpen, title, className, children, typeModal }: ModalProps) => {
  console.log('PortalModal  typeModal:', typeModal);

  console.log('PortalModal  isOpen:', isOpen);

  return createPortal(
    <>
      <div
        onClick={close}
        className={`${
          isOpen === typeModal ? '' : 'hidden'
        } cursor-pointer mx-auto overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[102] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-900 opacity-90`}
      ></div>
      <div
        id='productModal'
        className={`${
          isOpen === typeModal ? 'flex' : 'hidden'
        } mx-auto overflow-y-auto overflow-x-hidden absolute z-[103] justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full opacity-100`}
      >
        <div className={`${className} relative shadow rounded-lg p-8 w-full max-h-full z-[104]`}>
          <div className='flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>{title}</h3>
            <button
              type='button'
              onClick={close}
              className=' cursor-pointer gap-4 z-[105] text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
            >
              <IoMdClose className='w-8 h-8' />
            </button>
          </div>
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
};

export default PortalModal;
