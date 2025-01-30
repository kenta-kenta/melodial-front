import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Stack,
  Alert,
} from '@mui/material'
import { Create, MusicNote, Favorite } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
  const navigate = useNavigate()

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Alert
        severity="warning"
        sx={{
          mb: 4,
          mx: 'auto',
          maxWidth: 'sm',
        }}
      >
        現在Safariブラウザでは正常に動作しない可能性があります。
        修正作業を進めておりますので、しばらくの間Chrome等のブラウザをご利用ください。
      </Alert>

      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          variant="h2"
          color="primary"
          sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' }, mb: 2 }}
        >
          Melodial
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          あなたの日記で音楽を生成するAIアプリ
        </Typography>

        {/* CTAボタン */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          sx={{ mb: 6 }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/auth')}
            sx={{ minWidth: 200 }}
          >
            新規登録・ログイン
          </Button>
        </Stack>
      </Box>

      {/* 機能説明セクション */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Create color="primary" sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              日記を書く
            </Typography>
            <Typography variant="body1" color="text.secondary">
              あなたの気持ちや出来事を自由に書き留めましょう
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <MusicNote color="primary" sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              AIが音楽を生成
            </Typography>
            <Typography variant="body1" color="text.secondary">
              日記の内容からAIが独自の音楽を生成します
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Favorite color="primary" sx={{ fontSize: 40, mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              思い出を音楽で残す
            </Typography>
            <Typography variant="body1" color="text.secondary">
              あなただけの特別な音楽コレクションを作りましょう
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 使い方セクション */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          使い方
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          1. アカウントを作成してログイン
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          2. 「日記を書く」から今日の出来事を記録
        </Typography>
        <Typography variant="body1" color="text.secondary">
          3. AIが自動で音楽を生成し、あなたの思い出を音楽にします
        </Typography>
      </Box>
    </Container>
  )
}

export default Welcome
