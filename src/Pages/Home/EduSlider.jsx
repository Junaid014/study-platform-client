import { Link } from "react-router";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { TypeAnimation } from "react-type-animation";

const EduSlider = () => {
  const slides = [
    {
      image: "https://i.ibb.co/BHb6ZYKR/vecteezy-online-library-internet-book-shop-and-distance-education-14197144.jpg",
      title: "Live Study Sessions",
      date: "July 20, 2025",
      description:
        "Join live interactive study sessions led by expert tutors. Collaborate with peers in real time.",
      cta: "Explore Now",
    },
    {
      image: "https://i.ibb.co/LXzYYCH1/vecteezy-e-learning-and-distance-education-banner-template-with-tiny-16546156.jpg",
      title: "Summer Bootcamp 2025",
      date: "August 1, 2025",
      description:
        "Boost your academic skills with our intensive summer bootcamp. Group learning, quizzes & more!",
      cta: "Join Bootcamp",
    },
    {
      image: "https://i.ibb.co/PGF45zTW/vecteezy-education-illustration-of-students-are-around-piles-of-books-7382829-1.jpg",
      title: "Free Study Materials",
      date: "Available All Year",
      description:
        "Download notes, video lectures, and resources shared by tutors and fellow students.",
      cta: "Browse Materials",
    },
  ];

  return (
    <div className="w-full mt-6">
      <Slide duration={5000} transitionDuration={700} infinite indicators arrows>
        {slides.map((slide, index) => (
          <div key={index} className="each-slide-effect">
            <div
              className="w-full h-[600px] bg-no-repeat bg-cover bg-center relative flex items-center px-6 md:px-20"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)),
                  url(${slide.image})
                `,
              }}
            >
              <div className="relative text-white mx-auto max-w-xl z-10">
                <h2 className="text-3xl lg:text-5xl font-bold roboto mb-4">
                  <TypeAnimation
                    sequence={[slide.title, 2000, "", 500]}
                    speed={50}
                    repeat={Infinity}
                    cursor={true}
                  />
                </h2>
                <p className="text-lg font-medium mb-2">📅 {slide.date}</p>
                <p className="text-md mb-4">{slide.description}</p>
                <Link
                  to="/allStudySession"
                  className="btn bg-gradient-to-r px-6 py-2 from-[#3d53eb] to-[#5d7cff] text-white rounded-lg shadow-md hover:from-[#2f42d2] hover:to-[#4d6eff] transition duration-300"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default EduSlider;
