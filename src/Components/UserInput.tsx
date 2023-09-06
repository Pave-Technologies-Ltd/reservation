import { RefObject } from "react";
import UserIcon from "../assets/UserIcon";
import SubtractIcon from "../assets/SubtractIcon";
import PlusIcon from "../assets/PlusIcon";
 type userInputActionType = "increase" | "decrease";
interface UserInputType {
  adult: number;
  children: number;
  room: number;
  showUserModal: boolean;
  UserInputModalRef: RefObject<HTMLDivElement>;
  showUserModalHandler: () => void;
  UserInputHandler: (action: userInputActionType, type: string) => void;
}

const UserInput = ({
  adult,
  room,
  children,
  UserInputModalRef,
  showUserModal,
  showUserModalHandler,
  UserInputHandler,
}: UserInputType) => {
  return (
    <div className="relative lg:w-[30%] w-[100%] h-full z-10">
      <div
        onClick={showUserModalHandler}
        className="relative  w-[100%] h-full border-4 border-lightbackground p-2 cursor-pointer bg-white flex items-center"
      >
        <div className="absolute mx-1">
          <UserIcon />
        </div>

        <div className="flex text-[#262626] pl-8 h-full w-full font-medium py-2 text-sm">
          {`${adult} Adult . ${children} ${
            children === 1 ? "Child" : "Children"
          } ${room} ${room > 1 ? "Rooms" : "Room"}`}
        </div>
      </div>
      {showUserModal && (
        <div
          ref={UserInputModalRef}
          className="mt-1 bg-white drop-shadow-xl  w-[350px] p-8 absolute right-0  "
        >
          <div className="flex flex-col ">
            <div className="flex flex-col gap-2 mb-2">
              <div className="flex  justify-between items-center">
                <h4 className="font-medium text-[#262626]">Adult</h4>
                <div className=" border border-[#262626] rounded-md p-2 flex w-[50%]  justify-between">
                  <span
                    onClick={UserInputHandler.bind(null, "decrease", "adult")}
                    className={`${
                      adult === 1 ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    {" "}
                    <SubtractIcon
                      stroke={`${adult === 1 ? "#d0d0d0" : "currentColor"}`}
                    />
                  </span>

                  <span className="text-[#262626] font-medium"> {adult}</span>
                  <span
                    className=" cursor-pointer"
                    onClick={UserInputHandler.bind(null, "increase", "adult")}
                  >
                    {" "}
                    <PlusIcon />
                  </span>
                </div>
              </div>
              <div className="flex  justify-between items-center">
                <h4 className="font-medium text-[#262626]">Children</h4>
                <div className=" border border-[#262626] rounded-md p-2 flex w-[50%]  justify-between">
                  <span
                    onClick={UserInputHandler.bind(
                      null,
                      "decrease",
                      "children"
                    )}
                    className={`${
                      children === 0 ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    {" "}
                    <SubtractIcon
                      stroke={`${children === 0 ? "#d0d0d0" : "currentColor"}`}
                    />
                  </span>

                  <span className="text-[#262626] font-medium">
                    {" "}
                    {children}
                  </span>
                  <span
                    onClick={UserInputHandler.bind(
                      null,
                      "increase",
                      "children"
                    )}
                    className=" cursor-pointer"
                  >
                    {" "}
                    <PlusIcon />
                  </span>
                </div>
              </div>
              <div className="flex  justify-between items-center">
                <h4 className="font-medium text-[#262626]">Rooms</h4>
                <div className=" border border-[#262626] rounded-md p-2 flex w-[50%]  justify-between">
                  <span
                    onClick={UserInputHandler.bind(null, "decrease", "room")}
                    className={`${
                      room === 1 ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    {" "}
                    <SubtractIcon
                      stroke={`${room === 1 ? "#d0d0d0" : "currentColor"}`}
                    />
                  </span>

                  <span className="text-[#262626] font-medium"> {room}</span>
                  <span
                    onClick={UserInputHandler.bind(null, "increase", "room")}
                    className=" cursor-pointer"
                  >
                    {" "}
                    <PlusIcon />
                  </span>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={showUserModalHandler}
                className="py-2 border border-lightbackground text-lightbackground flex items-center justify-center w-full font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInput;
