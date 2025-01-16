import { useParams } from 'react-router-dom'
import { useMutateMusic } from '../hooks/useMutateMusic'
import { MusicResponse } from '../types'
import AudioPlayer from '../component/music/AudioPlayer'

const DiaryMusic = () => {
  const { diaryId } = useParams()
  const mutation = useMutateMusic(diaryId as string)

  const handleClick = () => {
    // mutateを呼び出してAPIリクエストを開始
    mutation.mutate({
      prompt: 'テスト用プロンプト',
      lyrics: 'テスト歌詞',
      title: 'テストああああ',
    })
  }

  const data: MusicResponse = mutation.data as MusicResponse

  return (
    <div className="container mx-auto px-4 py-20">
      {/* ローディング状態の確認 */}
      {mutation.isLoading && <p>生成中...</p>}

      {/* エラー状態の確認 */}
      {mutation.error && <p>エラーが発生しました</p>}

      {/* データの確認 */}
      {mutation.data && (
        <AudioPlayer
          audioUrl={data?.data[0].audio_file}
          imageUrl={data?.data[0].image_file}
          title={data?.data[0].title}
        />
      )}

      <button className="mx-4 mx-auto mt-20" onClick={handleClick}>
        音楽を生成
      </button>
    </div>
  )
}

export default DiaryMusic
