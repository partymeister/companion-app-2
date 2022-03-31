export interface Artist {
  title: string;
  image: string;
  youtube: string;
  content: string;
}

export interface MusicItem {
  intro: string;
  artists: Artist[];
}
