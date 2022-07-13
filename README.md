## Redux-Saga 勉強用アプリ

- フロント側の構成は React、Redux(createSlice)、Redux-Saga、tailwindcss、axios。
- API側はLaravel
- 機能一覧
  - サインアップ・ログイン・ログアウト
  - 投稿（POST）のCRUD
  - タスク(Task)のCRUD
- 画像のやりとりはbase64で行う。フロント側で予めbase64に変換した方が楽そう。