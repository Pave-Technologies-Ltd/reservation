import { Outlet } from "react-router-dom";
import { Footer } from "../partials/Footer";

const Layout = () => {
  return (
    <>
      {/* <div>Layout</div> */}
      <Outlet />
      <Footer/>
    </>
  );
};

export default Layout;
