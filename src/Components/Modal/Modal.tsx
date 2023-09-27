import { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  disableClose: boolean;
  children: ReactNode;
  closeModal: () => void;
}

export const Modal = ({
  isOpen,
  disableClose = false,
  children,
  closeModal,
}: Props) => {
  return (
    <div
      id="modal"
      className={`${
        isOpen ? "top-0 scale-100" : "top-[-100%] scale-0"
      } fixed transition-all left-0 w-screen h-screen flex items-center justify-center backdrop-blur-sm  bg-[#00000099] transform duration-500`}
    >
      {/* <!-- Modal content --> */}
      <div className="rounded-md flex flex-col items-center bg-white w-[90%] md:w-1/2 h-[90%] md:h-1/2 p-12">
        {/* <!--Close modal button--> */}
        <button
          disabled={disableClose}
          onClick={() => closeModal()}
          id="closebutton"
          type="button"
          className="focus:outline-none self-start"
        >
          {/* <!-- Hero icon - close button --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        {/* <!-- Test content --> */}
        <div className={`grow flex flex-col justify-center`}>{children}</div>
      </div>
    </div>
  );
};
