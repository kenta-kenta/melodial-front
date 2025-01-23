import { useState } from 'react'
import { DiaryForm } from '../component/diary/DiaryForm'
import { EditedDiary } from '../types'
import { useMutateDiary } from '../hooks/useMutateDiary'
import { useNavigate } from 'react-router-dom'
import { DiaryHint } from '../component/diary/DiaryHint'

const Diary = () => {
  const navigate = useNavigate()
  const [editedDiary, setEditedDiary] = useState<EditedDiary>({
    id: 0,
    content: '',
  })
  const { createDiaryMutation } = useMutateDiary()

  const updateDiary = (diary: EditedDiary) => {
    setEditedDiary(diary)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await createDiaryMutation.mutateAsync({
      content: editedDiary.content,
    })
    navigate('/diary/music/1', {
      state: { musicData: result.data.music?.[0], DiaryData: editedDiary },
    })
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center text-orange-600">
          今日の日記
        </h1>
        <DiaryForm
          editedDiary={editedDiary}
          updateDiary={updateDiary}
          onSubmit={handleSubmit}
        />
        <DiaryHint />
        {createDiaryMutation.isLoading && (
          <div className="text-center py-4">
            <p>音楽を生成中...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Diary
