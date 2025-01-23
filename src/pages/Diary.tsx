import { useState } from 'react'
import { DiaryForm } from '../component/diary/DiaryForm'
import { EditedDiary } from '../types'
import { useMutateDiary } from '../hooks/useMutateDiary'
import { useNavigate } from 'react-router-dom'
import { DiaryHint } from '../component/diary/DiaryHint'
import { LinearProgress, Box, Typography } from '@mui/material'

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
    console.log(result)
    navigate('/diary/music/1', {
      state: { musicData: result.data.data?.[0], DiaryData: editedDiary },
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
        {createDiaryMutation.isLoading && (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
              音楽を生成中...
            </Typography>
            <LinearProgress sx={{ mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              あなたの日記から素敵な音楽を作成中です
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              (生成には約2分かかります。少々お待ちください)
            </Typography>
          </Box>
        )}
        <DiaryHint />
      </div>
    </div>
  )
}

export default Diary
