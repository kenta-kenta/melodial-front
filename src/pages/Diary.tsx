import { useState } from 'react'
import { DiaryForm } from '../component/diary/DiaryForm'
import AudioPlayer from '../component/music/AudioPlayer'
import { EditedDiary, MusicResponse } from '../types'
import { useMutateDiary } from '../hooks/useMutateDiary'
import { useNavigate } from 'react-router-dom'

const Diary = () => {
  const navigate = useNavigate()
  const [editedDiary, setEditedDiary] = useState<EditedDiary>({
    id: 0,
    content: '',
  })
  const [musicData, setMusicData] = useState<MusicResponse['data'] | null>(null)
  const { createDiaryMutation } = useMutateDiary()

  const updateDiary = (diary: EditedDiary) => {
    setEditedDiary(diary)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await createDiaryMutation.mutateAsync({
      content: editedDiary.content,
    })
    setMusicData(result.data.data?.[0] || null)
    console.log(result.data)
    navigate('/diary/music/1', {
      state: { musicData: result.data.data?.[0], DiaryData: editedDiary },
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">日記を書く</h1>
      <DiaryForm
        editedDiary={editedDiary}
        updateDiary={updateDiary}
        onSubmit={handleSubmit}
      />
      {createDiaryMutation.isLoading && (
        <div className="text-center py-4">
          <p>音楽を生成中...</p>
        </div>
      )}
      {musicData && (
        <>
          <div className="mt-8">
            <p className="text-center text-lg font-bold mb-4">
              {editedDiary.content}
            </p>
          </div>
          <div className="mt-8">
            <AudioPlayer
              audioUrl={musicData.audio_file}
              imageUrl={musicData.image_file}
              title={musicData.title}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Diary
