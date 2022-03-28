export interface TimetableDay {
  day: string;
  events: TimetableEvent[];
}

export interface TimetableEvent {
  start: Date;
  category: string;
  title: string;
  backgroundColor: string;
}
