import { useParams } from 'react-router-dom'
import AudioPlayer from '../component/music/AudioPlayer'
import {
  Container,
  Card,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface MusicData {
  audio_file: string
  image_file: string
  item_uuid: string
  lyric: string
  tags: string
  title: string
}

interface DiaryResponse {
  id: number
  content: string
  music_data: MusicData[]
  created_at: string
  updated_at: string
}

const DiaryMusic = () => {
  const { diaryId } = useParams()
  const [response, setResponse] = useState<DiaryResponse>({} as DiaryResponse)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/diaries/${diaryId}`
        )
        console.log(response.data)
        setResponse(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDiary()
  }, [diaryId])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <h1 className="text-2xl font-bold mb-8 text-center text-orange-600">
        日記と音楽
      </h1>
      <Box
        sx={{
          maxWidth: { xs: '100%', sm: '80%', md: '2xl' },
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Card
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            mb: { xs: 3, sm: 4 },
          }}
        >
          <Typography
            variant="h5"
            color="primary"
            sx={{
              mb: 2,
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
            }}
          >
            日記内容
          </Typography>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              color: 'text-black',
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            {response.content}
          </Typography>
        </Card>

        <Card sx={{ p: 3 }}>
          <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
            生成された音楽
          </Typography>
          {response && response.music_data.length > 0 && (
            <AudioPlayer
              audioUrl={response.music_data[0].audio_file}
              imageUrl={response.music_data[0].image_file}
              title={response.music_data[0].title}
            />
          )}
        </Card>
      </Box>
    </Container>
  )
}

export default DiaryMusic
