import { ListItem, ListItemText, ListSubheader } from '@mui/material';
import React from 'react';
import { Headings } from 'src/models/seo/seo';

export const AnalizeSerpTemplate = ({ title, description, headings }: any) => {
  return (
    <div className='w-1/2 p-24'>
      {title ? (
        <>
          <div className='py-4 px-2 bg-violet-300 '>Title</div>
          <div className='py-4'>{title}</div>
        </>
      ) : null}
      {description ? (
        <>
          <div className='py-4 px-2 bg-violet-300 '>Meta-description</div>
          <div className='py-4'>{description}</div>
        </>
      ) : null}
      {headings.map((heading: any) => {
        const singleKey = Object.keys(heading)[0] as keyof Headings;
        return (
          <>
            <div key={`section-${heading}`}>
              <div>
                <ListSubheader sx={{ bgcolor: '#bfbff1', color: 'black' }}>
                  {Object.keys(heading)[0]}
                </ListSubheader>

                <ListItem
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 0,
                    margin: 0,
                  }}
                  key={`item-${Object.keys(heading)[0]}-list`}
                >
                  {heading[singleKey].map((e: any) => {
                    return (
                      <ListItemText
                        sx={{
                          borderTop: 1,
                          borderColor: 'grey.500',
                          width: '100%',
                          paddingTop: 2,
                          paddingBottom: 2,
                          paddingLeft: 2,
                          paddingRight: 2,
                          margin: 0,
                        }}
                        primary={e}
                      />
                    );
                  })}
                </ListItem>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
