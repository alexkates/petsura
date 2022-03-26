export interface Animal {
  id: number;
  organization_id: string;
  url: string;
  type: string;
  species: string;
  breeds: Breeds;
  colors: Colors;
  age: string;
  gender: string;
  size: string;
  coat: string;
  attributes: Attributes;
  environment: Environment;
  tags: string[];
  name: string;
  description: string;
  organization_animal_id: string;
  photos: Photo[];
  primary_photo_cropped: Photo;
  videos: any[];
  status: string;
  status_changed_at: string;
  published_at: string;
  distance?: any;
  contact: Contact;
  _links: Links;
}

interface Links {
  self: Self;
  type: Self;
  organization: Self;
}

interface Self {
  href: string;
}

interface Contact {
  email: string;
  phone: string;
  address: Address;
}

interface Address {
  address1: string;
  address2?: any;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

interface Photo {
  small: string;
  medium: string;
  large: string;
  full: string;
}

interface Environment {
  children?: any;
  dogs?: any;
  cats?: any;
}

interface Attributes {
  spayed_neutered: boolean;
  house_trained: boolean;
  declawed: boolean;
  special_needs: boolean;
  shots_current: boolean;
}

interface Colors {
  primary: string;
  secondary?: any;
  tertiary?: any;
}

interface Breeds {
  primary: string;
  secondary?: any;
  mixed: boolean;
  unknown: boolean;
}
