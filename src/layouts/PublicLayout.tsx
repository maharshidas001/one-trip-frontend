import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <main>
        <Header />
        <Outlet />
      </main>
    </>
  )
};

export default PublicLayout;