import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router"; // তোমার router অনুযায়ী
import useAxios from "../../hooks/useAxios";

const FreeSessionsSlider = () => {
  const axios = useAxios();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const { data } = await axios.get("/study-sessions/approved");
        const today = new Date();

        const filtered = data.filter(
          (item) => item.fee === "0" && new Date(item.registrationEnd) >= today
        );
        setSessions(filtered);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSessions();
  }, [axios]);

  return (
    <div className="w-11/12 mx-auto mb-23 relative">
      <h2 className="text-xl md:text-3xl text-gray-700 font-bold mb-5 text-center">
        🎓 Free Study Sessions
      </h2>

      {sessions.length > 0 && (
  <Swiper
    slidesPerView={4}
    spaceBetween={30}
    navigation={true}
    loop={true}
    autoplay={{ delay: 2500, disableOnInteraction: false }}
    modules={[Navigation, Autoplay]}
    breakpoints={{
      0: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 3, spaceBetween: 25 },
      1024: { slidesPerView: 4, spaceBetween: 30 },
    }}
  >
    {sessions.map((session) => (
      <SwiperSlide key={session._id}>
        <Link to={`/sessions/${session._id}`}>
          <div className="flex flex-col items-center cursor-pointer">
            <div className="relative flex items-center justify-center w-48 h-48 rounded-full bg-[#e6f8f9] hover:bg-[#f65d4e] transition-colors duration-300">
              <img
                src={session.image}
                alt={session.title}
                className="absolute bottom-0 w-32 h-32 object-cover rounded-lg"
              />
            </div>
            <h3 className="font-medium roboto text-xs md:text-sm mt-4 text-center">
              {session.title}
            </h3>
          </div>
        </Link>
      </SwiperSlide>
    ))}
  </Swiper>
)}

      {/* Arrow styling */}
      <style jsx>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: #333;
          top: 50%;
          transform: translateY(-50%);
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.8);
          z-index: 10;
        }
        .swiper-button-prev {
          left: -2px;
        }
        .swiper-button-next {
          right: -2px;
        }
        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 20px;
          font-weight: bold;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default FreeSessionsSlider;
