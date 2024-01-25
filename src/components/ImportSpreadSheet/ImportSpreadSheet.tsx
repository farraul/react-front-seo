import React from 'react';
import { ReactSpreadsheetImport } from 'react-spreadsheet-import';

export const ImportSpreadSheet = ({ isOpen, onClose, onSubmit }: any) => {
  const fields = [
    {
      label: ['keyword'],
      key: 'Keyword',
      alternateMatches: ['palabra', 'first'],
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
    {
      label: ['vol'],
      key: 'vol',
      alternateMatches: ['volume', 'volumen', 'busquedas', 'búsquedas'],
      fieldType: {
        type: 'input',
      },
      example: 'Vol',
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
    <ReactSpreadsheetImport
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      fields={fields}
      customTheme={{
        // Button: {
        //   defaultProps: {
        //     bg: 'green',
        //     color: 'white',
        //   },
        // },

        components: {
          Button: {
            baseStyle: {
              borderRadius: 'none',
            },
            defaultProps: {
              colorScheme: 'yellow',
              bg: 'green',
            },
          },
          // UploadStep: {
          //   baseStyle: {
          //     dropzoneButton: {
          //       bg: 'green!important',
          //       color: 'white!important',
          //     },
          //   },
          // },
        },
      }}
    />
  );
};
