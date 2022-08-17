## Redux-Saga 勉強用アプリ

- フロント側の基本構成は React、Redux(createSlice)、Redux-Saga、tailwindcss、axios。
- API側はLaravel
- 機能一覧
  - サインアップ・ログイン・ログアウト
  - 投稿（POST）のCRUD
  - タスク(Task)のCRUD
  - 実行済みタスクのCRUD
- 画像のやりとりはbase64で行う。フロント側で予めbase64に変換した方が楽そう。
- タスク一覧の表示ではMaterial UIのDataGridとmaterial-tableを試してみた。<br>material-tableはRedux Toolkitと相性が悪い
- 実行済みタスクはFullCalendar上で管理
- 実行済みタスクはFetch APIを使ってみた。axiosよりFetchAPIの方がメソッドの共通化が簡単かも。