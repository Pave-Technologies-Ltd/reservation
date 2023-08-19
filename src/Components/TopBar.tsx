import { useNavigate } from "react-router-dom";


const TopBar = () => {

    const navigate = useNavigate()
  return (
    <div
      className="bg-background md:px-[10%] px-[5%] flex items-center h-[70px] cursor-pointer"
      onClick={() => {
        navigate("/");
      }}
    >
      <div className="font-bold text-3xl text-white ">Reservation.com</div>
    </div>
  );
}

export default TopBar