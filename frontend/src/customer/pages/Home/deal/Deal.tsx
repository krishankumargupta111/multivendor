import DealCard from "./DealCard";

import { Swiper, SwiperSlide } from "swiper/react";
import {} from "swiper/modules";

import "swiper/css";

function Deal() {
  const slides = [1, 1, 1, 1, 1, 1];

  return (
    <div>
      <Swiper
        modules={[]}
        slidesPerView={1}
        loop={true} >
        {slides.map((_, slideIndex) => (
          <SwiperSlide key={slideIndex}>
            <div className="grid grid-cols-6 gap-4">
              {slides.map((_, cardIndex) => (
                <DealCard
                  key={cardIndex}
                  
                  deal={{
                    image:
                      "https://png.pngtree.com/png-vector/20240729/ourmid/pngtree-men-formal-shoes-png-image_13287455.png",
                    discount: "10",
                  }}
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Deal;