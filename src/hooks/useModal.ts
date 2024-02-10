import React, { useState } from 'react';
import { typeModalOpen } from 'src/models/modals';

export const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState<typeModalOpen>('close');

  const closeModal = () => {
    setIsOpenModal('close');
  };

  return {
    isOpenModal,
    setIsOpenModal,
    closeModal,
  };
};
