import { FC, memo, useState } from 'react'
import { useMutateDiary } from '../../hooks/useMutateDiary'
import { Diary } from '../../types'
import { Modal, Box, Card, Dialog } from '@mui/material'
import useStore from '../../store'
import { Create, Delete, MusicNote } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const DiaryItemMemo: FC<Omit<Diary, 'updated_at'>> = ({
  id,
  content,
  music_data,
  created_at,
}) => {
  const navigate = useNavigate()
  const { editedDiary } = useStore()
  const updateDiary = useStore((state) => state.updateEditedDiary)
  const { updateDiaryMutation, deleteDiaryMutation } = useMutateDiary()

  // 日付のフォーマット処理
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date)
  }
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    deleteDiaryMutation.mutate(id)
    setIsDeleteModalOpen(false)
  }

  const EditDiaryHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (editedDiary.content === '') {
      handleClose()
      return
    }

    updateDiaryMutation.mutate({
      id: id,
      content: editedDiary.content,
    })
    handleClose()
  }

  const handleMusic = () => {
    console.log(music_data)
    if (!music_data) return
    navigate(`/diary/music/${id}`)
  }

  return (
    <>
      <li className="my-3">
        <Card className="p-3">
          <div className="whitespace-pre-wrap break-words">{content}</div>
          <div className="flex justify-end space-x-2">
            <MusicNote
              className="w-5 h-5 text-orange-500 cursor-pointer hover:text-orange-600"
              onClick={handleMusic}
            />
            <Create
              className="w-5 h-5 text-orange-500 cursor-pointer hover:text-orange-600"
              onClick={() => handleOpen()}
            />
            <Delete
              className="w-5 h-5 text-orange-500 cursor-pointer hover:text-orange-600"
              onClick={handleDeleteClick}
            />
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500">
              {formatDate(created_at as string)}
            </span>
          </div>
        </Card>
      </li>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <form onSubmit={EditDiaryHandler}>
            <textarea
              className="w-full h-40 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) =>
                updateDiary({ ...editedDiary, content: e.target.value })
              }
              defaultValue={content}
            />
            <button
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 bg-orange-500 text-white"
              type="submit"
            >
              Update
            </button>
          </form>
        </Box>
      </Modal>
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">
            本当に削除してもよろしいですか？
          </h3>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              キャンセル
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
            >
              削除する
            </button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export const DiaryItem = memo(DiaryItemMemo)
