export interface Diary {
    id: number;
    content: string;
    data?: MusicData[];
    created_at?: string;
    updated_at?: string;
}

export type EditedDiary = Omit<Diary, 'created_at' | 'updated_at'>

export type User = {
    id: number;
    email: string;
    user_name: string;
}

export type CsrfToken = {
    csrf_token: string;
}

export type Credential = {
    email: string;
    password: string;
}

export type PaginatedResponse = {
  data: Diary[];
  total_items: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export type DiaryDate = {
    date: string;
    count: number;
}

export type DiaryDatesResponse = {
    dates: DiaryDate[];
}

export type MusicRequest = {
    prompt: string;
  }
  
export interface MusicData {
    audio_file: string;
    image_file: string;
    item_uuid: string;
    title: string;
    lyric: string;
    tags: string;
}

export type MusicResponse = {
    status: number;
    message: string;
    data: MusicData;
}