import { Footer } from "./Footer";
import { Header } from "./Header";

export const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header className="sticky top-0" />
      <div className="flex-grow bg-gray-200 py-10">
        <div>{children}</div>
      </div>
      <Footer className="sticky bottom-0" />
    </div>
  );
};
