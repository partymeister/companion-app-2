export interface Seminar {
  title: string;
  image: string;
  youtube: string;
  content: string;
}

export interface SeminarItem {
  intro: string;
  speakers: Seminar[];
}
