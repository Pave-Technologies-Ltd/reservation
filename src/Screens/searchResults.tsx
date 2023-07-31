import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const navigate = useNavigate();
  return (
    <div className=" w-full  flex flex-col">
      <div
        className="bg-background md:px-[10%] px-[5%] flex items-center h-[70px] cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="font-bold text-3xl text-white ">Reservation.com</div>
      </div>
      <div className="md:px-[10%] px-[5%] border mt-[5%] flex">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default SearchResults;
