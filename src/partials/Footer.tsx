export const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100px] ">
      <p className="text-sm">All rights reserved.</p>
      <p className="text-sm">
        Copyright © {new Date().getFullYear()} Reservation.com™.
      </p>
    </div>
  );
};
