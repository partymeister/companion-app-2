import {Screenshot} from "./entry_item";

export interface VoteEntryItem {
  id: number;
  competition_id: number;
  competition_name: string;
  sort_position_prefixed: string;
  title: string;
  author: string;
  description: string;
  vote: Vote;
  vote_category_has_comment: boolean;
  vote_category_has_negative: boolean;
  vote_category_has_special_vote: boolean;
  vote_category_id: number;
  vote_category_points: number;
  rating: number;
  comment: string;
  favourite: boolean;
  deadline_reached: boolean;
  has_screenshot: boolean;
  screenshot: Screenshot;
  has_audio: boolean;
  audio: Screenshot;
}

export interface Vote {
  comment: string;
  competition_id_number;
  entry_id: number;
  points: number;
  special_vote: boolean;
  vote_category_id: number;
  id: number;
}
