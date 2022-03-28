export interface Sponsor {
  title: string;
  level: string;
  image: string;
  link: string;
  content: string;
}

export interface SponsorItem {
  outro_headline: string;
  outro: string;
  sponsors: Sponsor[];
}
