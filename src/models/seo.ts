export interface PreSeo {
  keywords: Record<string, number>;
  type: number;
  headings: SeoHeadingWithName[];
}

export interface Seo {
  [key: string]: PreSeo[];
}

export interface SeoHeadingWithName {
  name: string;
  headings: SeoHeadingWithName[];
  type: number;
  keywords: Record<string, number>[];
}
