import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DefaultLayout } from "../components/layout/DefaultLayout";
import { Login } from "../components/auth/Login";
import { PostList } from "../components/post/PostList";

export const Router = () => {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="/posts" element={<PostList />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  );
};
