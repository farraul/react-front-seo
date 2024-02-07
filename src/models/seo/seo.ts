export type urlSeo = `https://${string}` | '';

export type HeadingsSeo = {
  [key: string]: string[];
};
export type Headings = {
  [K in keyof HeadingsSeo]: string[];
};
