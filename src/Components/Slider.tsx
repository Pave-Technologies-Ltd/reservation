import { useRef } from "react";

interface SliderProps {
  data: {
    title: string;
    description: string;
    image: string;
  }[];
}

const Slider = ({ data }: SliderProps) => {
  const slidesContainer = useRef<HTMLDivElement>(null);
  const slideWidth = useRef<HTMLDivElement>(null);

  const nextButtonHandler = () => {
    const slideWidthValue = slideWidth.current?.clientWidth ?? 0;

    slidesContainer.current!.scrollLeft += slideWidthValue;
  };

  const prevButtonHandler = () => {
    const slideWidthValue = slideWidth.current?.clientWidth ?? 0;
    slidesContainer.current!.scrollLeft -= slideWidthValue;
  };
  return (
    <div className="relative">
      <div
        ref={slidesContainer}
        className="slides-container h-72 flex  snap-x snap-mandatory overflow-hidden  space-x-2 rounded scroll-smooth before:w-[45vw] before:shrink-0 after:w-[45vw] after:shrink-0 md:before:w-0 md:after:w-0"
      >
        {data.map((property,index) => {
          return (
            <>
              <div
                
                key={index}
                ref={slideWidth}
                className="slide  aspect-square h-full flex-shrink-0 snap-center rounded overflow-hidden"
              >
                <img
                  className="w-full h-[200px] object-cover"
                  src={property.image}
                  alt=""
                />

                <div>
                  <h1>{property.title}</h1>
                  <p className="text-[#6b9ccf]">{`${property.description} ${property.title}`}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <div className="absolute top-0 -left-4 h-full items-center  md:flex">
        <button
          onClick={prevButtonHandler}
          role="button"
          className="prev px-2 py-2 rounded-full bg-neutral-100 text-neutral-900 group"
          aria-label="prev"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 group-active:-translate-x-2 transition-all duration-200 ease-linear"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>
      <div className="absolute top-0 -right-4 h-full items-center  md:flex">
        <button
          onClick={nextButtonHandler}
          role="button"
          className="next px-2 py-2 rounded-full bg-neutral-100 text-neutral-900 group"
          aria-label="next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 group-active:translate-x-2 transition-all duration-200 ease-linear"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slider;
