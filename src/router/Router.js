import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { DefaultLayout } from "../components/layout/DefaultLayout";
import { Login } from "../components/auth/Login";
import { Signup } from "../components/auth/Signup";
import { PostList } from "../components/post/PostList";
import { CreatePost } from "../components/post/CreatePost";
import { EditPost } from "../components/post/EditPost";
import { TaskList } from "../components/task/TaskList";
import { CreateTask } from "../components/task/CreateTask";
import { EditTask } from "../components/task/EditTask";

export const Router = () => {
  const user = useSelector((state) => state.user.currentUser);

  // // 未ログインのアクセス制限
  const handleAuth = (component) => {
    const uri = new URL(window.location.href);

    // ログアウト時にフラッシュメッセージが上書きされて再レンダリングするのを回避
    if (uri.pathname === "/") return;

    const state = { flash: "ログインが必要です" };
    // ログイン前に認証済みのページへアクセスした場合にログインページに戻す
    if (Object.keys(user).length > 0) {
      return component;
    } else {
      return <Navigate to={"/"} replace state={state} />;
    }
  };

  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="/task/:taskid/edit" element={handleAuth(<EditTask />)} />
          <Route path="/tasks/create" element={handleAuth(<CreateTask />)} />
          <Route path="/tasks" element={handleAuth(<TaskList />)} />
          <Route path="/post/:postid/edit" element={handleAuth(<EditPost />)} />
          <Route path="/posts/create" element={handleAuth(<CreatePost />)} />
          <Route path="/posts" element={handleAuth(<PostList />)} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  );
};
