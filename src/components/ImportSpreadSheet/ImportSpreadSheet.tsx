import React from 'react';
import { ReactSpreadsheetImport } from 'react-spreadsheet-import';

export const ImportSpreadSheet = ({ isOpen, onClose, onSubmit }: any) => {
  const fields = [
    {
      label: ['keyword'],
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
  return (
    <ReactSpreadsheetImport isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} fields={fields} />
  );
};
