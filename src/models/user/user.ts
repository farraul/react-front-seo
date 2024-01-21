// import { Company } from '../company';

export interface Token {
  token: string;
}

// export interface UserInfo extends Token {
//   name: string;
//   lastName: string;
//   email: string;
//   age: number;
//   community: string;
//   province: string;
//   location: string;
//   id: string;
//   experience: string;
//   move: string;
//   token: string;
// }
export interface Company extends Token {
  name: string;
  namePersonContact: string;
  email: string;
  phone: string;
  whatsApp: string;
  website: string;
  priceHour: string;
  availability: string;
  community: string;
  province: string;
  location: string;
  id: string;
  yearsActive: string;
  servicesAditionals: Array<string>;
}

export interface User {
  loading?: boolean;
  userInfo: Company;
  error?: string | null;
  success?: boolean;
}
