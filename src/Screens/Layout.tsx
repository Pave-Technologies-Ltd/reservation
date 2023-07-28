import { Outlet } from "react-router-dom";
import { Footer } from "../partials/Footer";

const Layout = () => {
  return (
    <div className="">
      {/* <div>Layout</div> */}
      <Outlet />
      

      <Footer/>
    
    </div>
  );
};

export default Layout;
