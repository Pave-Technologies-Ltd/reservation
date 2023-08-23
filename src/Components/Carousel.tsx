import { useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import PropertyPhotosType from "../Types/Property.photos.types";

interface CarouselType {
  photos: PropertyPhotosType[];
}

const Carousel = ({ photos }: CarouselType) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  return (
    <ReactSimplyCarousel
      activeSlideIndex={activeSlideIndex}
      onRequestChange={setActiveSlideIndex}
      itemsToShow={1}
      itemsToScroll={1}
      forwardBtnProps={{
        //here you can also pass className, or any other button element attributes
        style: {
          alignSelf: "center",
          // background: "black",
          border: "1px solid #6f00e7",
          borderRadius: "50%",
          color: "#6f00e7",
          cursor: "pointer",
          fontSize: "20px",
          height: 30,
          lineHeight: 1,
          textAlign: "center",
          width: 30,
          marginLeft: 4,
        },
        children: <span>{`>`}</span>,
      }}
      backwardBtnProps={{
        //here you can also pass className, or any other button element attributes
        style: {
          alignSelf: "center",
          // background: "black",
          border: "1px solid #6f00e7",
          borderRadius: "50%",
          color: "#6f00e7",
          cursor: "pointer",
          fontSize: "20px",
          height: 30,
          lineHeight: 1,
          textAlign: "center",
          width: 30,

          marginRight: 4,
        },
        children: <span>{`<`}</span>,
      }}
      responsiveProps={[
        {
          itemsToShow: 2,
          itemsToScroll: 2,
          minWidth: 768,
        },
      ]}
      speed={400}
      easing="linear"
    >
      {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
      {photos.map((photo) => (
        <div
          className="bg-cover bg-center "
          key={photo.photo_id}
          style={{
            backgroundImage: `url(${photo.url_max})`,
            width: 500,
            height: 500,
          }}
        ></div>
      ))}
    </ReactSimplyCarousel>
  );
};

export default Carousel;
