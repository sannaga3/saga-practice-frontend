import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../components/auth/Login";

import { DefaultLayout } from "../components/layout/DefaultLayout";

export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <div>
          <DefaultLayout>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </DefaultLayout>
        </div>
      </BrowserRouter>
    </>
  );
};
