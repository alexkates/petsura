export interface Animal {
  name: string;
  age: string;
  coat: string;
  contact: Contact;
  description: string;
  gender: string;
  id: number;
  photos: Photo[];
  size: string;
  status: string;
  type: string;
}

interface Photo {
  full: string;
  large: string;
  medium: string;
  small: string;
}

interface Contact {
  email: string;
}
