import { Footer } from "./Footer";
import { Header } from "./Header";

export const DefaultLayout = ({ children }) => {
  return (
    <div className="mx-10 flex flex-col h-screen">
      <Header className="sticky top-0" />
      <div className="flex-grow p-5">{children}</div>
      <Footer />
    </div>
  );
};
