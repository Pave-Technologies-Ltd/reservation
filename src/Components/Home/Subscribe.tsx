

const Subscribe = () => {
  return (
    <>
      <div className=" bg-background md:h-[200px] h-[250px] text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl">Save time, save money!</h1>
        <h4 className="text-[#bd9b84]">
          Sign up and we'll send the best deals to you
        </h4>
        <div className="flex md:flex-nowrap flex-wrap  justify-center h-[60px] mt-2 gap-2">
          <input
            placeholder="Your email address"
            type="text"
            className="placeholder:text-lg  p-2 w-[100%] outline-none text-black"
          />
          <button className=" bg-lightbackground h-[60px] w-[200px] ">
            Subscribe
          </button>
        </div>
      </div>
      <div className=" bg-lightbackground  h-[100px]"></div>
    </>
  );
}

export default Subscribe