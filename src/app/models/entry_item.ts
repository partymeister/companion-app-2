export interface EntryItem {
  id: number;
  author: string;
  author_address: string;
  author_city: string;
  author_country_iso_3166_1: string;
  author_email: string;
  author_name: string;
  author_phone: string;
  author_zip: string;
  competition_name: string;
  composer_address: string;
  composer_city: string;
  composer_country_iso_3166_1: string;
  composer_email: string;
  composer_phone: string;
  composer_zip: string;
  composer_name: string;
  custom_option: string;
  description: string;
  discord_name: string;
  filesize: number;
  filesize_human: string;
  has_composer: boolean;
  has_screenshot: boolean;
  platform: string;
  running_time: string;
  title: string;
  options: Option[];
  screenshot: Screenshot;
  organizer_description: string;
}

export interface Screenshot {
  file_name: string;
  url: string;
  conversions: {
    thumb: string;
    preview: string;
  };
}

export interface Option {
  id: number;
  name: string;
  sort_position: number;
}
