

const Offer = () => {
  return (
    <div className=" h-[180px] flex lg:w-[550px] w-full shadow-md">
      <div className="w-[70%] border p-6 flex flex-col justify-between ">
        <h1>Take your longest holiday yet</h1>
        <p>
          Browse properties offering long-term stays, many at reduced monthly
          rates.
        </p>
        <button className="py-1 w-[40%] mt-2 bg-lightbackground hover:bg-background text-white font-bold">Find a Stay</button>
      </div>
      <div className="">
        <img
          src="src/assets/image1.jpeg"
          alt=""
          className="w-[100%] h-[100%]"
        />
      </div>
    </div>
  );
}

export default Offer