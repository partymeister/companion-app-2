export interface Satellite {
  title: string;
  country: string;
  image: string;
  link: string;
  contact_email: string;
  contact_name: string;
  entrance: string;
  visitors: string;
  address_1: string;
  address_2: string;
  address_3: string;
  content: string;
}

export interface SatelliteItem {
  intro_headline: string;
  intro: string;
  outro_headline: string;
  outro: string;
  satellites: Satellite[];
}
