import { FormEvent, useState } from 'react'
import { EditedDiary } from '../../types'

type DiaryFormProps = {
  editedDiary: EditedDiary
  updateDiary: (diary: EditedDiary) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export const DiaryForm: React.FC<DiaryFormProps> = ({
  editedDiary,
  updateDiary,
  onSubmit,
}) => {
  const [charCount, setCharCount] = useState(editedDiary.content.length)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateDiary({
      id: editedDiary.id,
      content: e.target.value,
    })
    setCharCount(e.target.value.length)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <textarea
        className="w-full h-40 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder="今日はどんな1日だった？"
        value={editedDiary.content}
        onChange={handleTextChange}
      />
      <div
        className={`text-right text-gray-500 text-sm mt-2 ${
          charCount > 200 ? 'text-red-500 font-bold' : ''
        }`}
      >
        {charCount}文字/200文字
      </div>
      <button
        className={`w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500 ${
          charCount > 200
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-orange-500 text-white hover:bg-orange-600'
        }`}
        type="submit"
        disabled={charCount > 200}
      >
        作成する
      </button>
    </form>
  )
}
