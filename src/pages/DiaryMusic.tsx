import { useLocation } from 'react-router-dom'
import AudioPlayer from '../component/music/AudioPlayer'
import { Container, Card, Typography, Box } from '@mui/material'

const DiaryMusic = () => {
  const location = useLocation()
  const musicData = location.state.musicData
  const DiaryData = location.state.DiaryData

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 10 } }}>
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
              color: 'text.secondary',
              fontSize: { xs: '0.9rem', sm: '1rem' },
            }}
          >
            {DiaryData.content}
          </Typography>
        </Card>

        <Card sx={{ p: 3 }}>
          <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
            生成された音楽
          </Typography>
          <AudioPlayer
            audioUrl={musicData.audio_file}
            imageUrl={musicData.image_file}
            title={musicData.title}
          />
        </Card>
      </Box>
    </Container>
  )
}

export default DiaryMusic
