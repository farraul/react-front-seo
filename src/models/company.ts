export interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export interface CompanyRegister {
  name: string;
  namePersonContact: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  whatsApp: string;
  priceHour: number | null;
  website: string;
  availability: string;
  community: string;
  province: string;
  location: string;
  yearsActive: undefined;
  servicesAditionals: Array<string>;
}
