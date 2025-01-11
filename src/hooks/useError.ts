import { useNavigate } from "react-router-dom"
import { useQueryClient } from '@tanstack/react-query'
import useStore from "../store"
import axios from "axios"
import { CsrfToken } from "../types"

export const useError = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const resetEditedDiary = useStore((state) => state.resetEditedDiary)
    const getCsrfToken = async () => {
        const { data } = await axios.get<CsrfToken>(
            `${import.meta.env.VITE_API_URL}/csrf`
        )
        axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
    }
    const switchErrorHandling = (msg: string) => {
        switch (msg) {
            case 'invalid csrf token':
                getCsrfToken().then(() => {
                    queryClient.clear()
                    alert('セキュリティトークンを更新しました。もう一度操作を行ってください。')
                    window.location.reload()
                }).catch(() => {
                    alert('セキュリティトークンの更新に失敗しました。ログインページに戻ります。')
                    resetEditedDiary()
                    navigate('/')
                })
                break
            case 'invalid or expired jwt':
                alert('認証の有効期限が切れました。再度ログインしてください。')
                resetEditedDiary()
                navigate('/')
                break
            case 'missing or malformed jwt':
                alert('認証情報が不正です。再度ログインしてください。')
                resetEditedDiary()
                navigate('/')
                break
            case 'duplicated key not allowed':
                alert('このメールアドレスは既に登録されています。')
                break
            case 'crypto/bcrypt: hashedPassword is not the hash of the given password':
                alert('パスワードが正しくありません。')
                break
            case 'record not found':
                alert('メールアドレスが正しくありません。')
                break
            case 'password: Password must be between 6 and 30 characters.':
                alert('パスワードは6文字以上30文字以下で入力してください。')
                break
            case 'email: Email is invalid.':
                alert('メールアドレスの形式が正しくありません。')
                break
            case 'ERROR: duplicate key value violates unique constraint "uni_users_email" (SQLSTATE 23505)':
                alert('このメールアドレスは既に登録されています。')
                break
            default:
                alert(msg)
        }
    }
    return { switchErrorHandling }
}