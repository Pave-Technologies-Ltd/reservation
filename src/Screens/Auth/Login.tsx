import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className=" w-full  ">
      <div
        className="bg-background md:px-[10%] px-[5%] flex items-center h-[70px] cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="font-bold text-3xl text-white ">Reservation.com</div>
      </div>
      <div className="mt-4 flex justify-center items-center ">
        <div className="w-[400px] ">
          <h1 className="text-lg font-bold">Sign in or create an account</h1>

          <div className="flex flex-col mt-[5%]">
            <label htmlFor="">Email address</label>
            <input
              type="text"
              placeholder="Your email address"
              className="placeholder:text-md pl-4 outline-none py-1 border"
            />
          </div>
          <button className="bg-lightbackground mt-4 text-white w-full py-2 flex items-center justify-center rounded-sm hover:bg-background">
            Continue with email
          </button>
          <div className="relative flex flex-col">
            <hr className="my-6 " />
            <h1 className="bg-white absolute top-[25%]  left-[25%] right-[25%]  w-[50%]">
              or use one of these options
            </h1>
          </div>
          <div className="flex justify-center items-center p-4">
            <div className="border p-6 cursor-pointer hover:border-background">
              <img className="w-6 h-6" src="google.png" alt="" />
            </div>
          </div>
          <hr className="my-6 " />
          <div className="flex justify-center items-center flex-col">
            <p className=" text-sm">
              By signing in or creating an account, you agree with our Terms &
            </p>
            <p className="text-sm"> conditions and Privacy statement</p>
          </div>
          <hr className="my-6 " />
        </div>
      </div>
    </div>
  );
};

export default Login;
