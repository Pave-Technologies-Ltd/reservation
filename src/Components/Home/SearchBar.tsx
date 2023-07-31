import { useNavigate } from "react-router-dom";


const SearchBar = () => {
  const navigate = useNavigate()
  return (
    <div className=" text-background absolute left-0 top-[320px] md:px-[10%] px-[5%] w-[100%]  h-[60px] ">
      <div className=" flex md:flex-nowrap flex-wrap h-full">
        <input
          type="text"
          className=" border-4 border-lightbackground h-full md:w-[25%] w-[100%] outline-none"
        />
        <input
          type="text"
          className=" border-4 border-lightbackground h-full md:w-[25%] w-[100%] outline-none"
        />
        <input
          type="text"
          className=" border-4 border-lightbackground h-full outline-none md:w-[25%] w-[100%]"
        />
        <button
          onClick={() => {
            navigate("/searchresults");
          }}
          className="md:w-[25%] w-[100%] border-4 border-lightbackground h-full bg-background hover:bg-lightbackground text-white font-bold"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
