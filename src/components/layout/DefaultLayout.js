import { Footer } from "./Footer";
import { Header } from "./Header";

export const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header className="sticky top-0" />
      <div className="flex-grow p-5">
        <div className="mt-7">{children}</div>
      </div>
      <Footer className="sticky bottom-0" />
    </div>
  );
};
