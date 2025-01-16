import { DiaryForm } from '../component/diary/DiaryForm'
import { DiaryHint } from '../component/diary/DiaryHint'
import { useMutateDiary } from '../hooks/useMutateDiary'
import AudioPlayer from '../component/music/AudioPlayer'
import useStore from '../store'
import { FormEvent } from 'react'

const Diary = () => {
  const { editedDiary } = useStore()
  const updateDiary = useStore((state) => state.updateEditedDiary)
  const { createDiaryMutation, updateDiaryMutation } = useMutateDiary()

  const submitDiaryHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedDiary.id === 0) {
      createDiaryMutation.mutate({
        content: editedDiary.content,
      })
    } else {
      updateDiaryMutation.mutate(editedDiary)
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <DiaryForm
          editedDiary={editedDiary}
          updateDiary={updateDiary}
          onSubmit={submitDiaryHandler}
        />
        <DiaryHint />
        <AudioPlayer
          imageUrl="https://files.topmediai.com/aimusic/api/ea0e0432-c614-4a41-b35b-142c4a17e52d-image.png"
          audioUrl="https://files.topmediai.com/aimusic/api/ea0e0432-c614-4a41-b35b-142c4a17e52d-audio.mp3"
          title="ボタン音"
        />
      </div>
    </div>
  )
}

export default Diary
