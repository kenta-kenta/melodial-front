import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { MusicRequest, MusicResponse } from '../types';

export const useMutateMusic = (diaryId: string) => {
  const createMusic = async (music: MusicRequest): Promise<MusicResponse> => {
    const { data } = await axios.post<MusicResponse>(
      `${import.meta.env.VITE_API_URL}/diaries/${diaryId}/musics`,
      music
    );
    return data;
  };

  return useMutation({
    mutationFn: createMusic,
    onSuccess: (data) => {
      // 成功時の処理をここに書く
      // 例：トースト表示やキャッシュの更新など
      console.log('Music created successfully:', data);
    },
    onError: (error) => {
      // エラー時の処理をここに書く
      console.error('Failed to create music:', error);
    },
  });
};