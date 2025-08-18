import React from "react";

// Reusable single card
const TestimonialCard = ({ text, highlight = "", name, handle, avatar }) => {
  const parts = highlight ? text.split(new RegExp(`(${highlight})`, "i")) : [text];

  return (
    <div className="relative rounded-3xl bg-white p-6 md:p-7 shadow-[0_14px_40px_rgba(0,0,0,0.08)] ring-1 ring-gray-100 hover:shadow-[0_18px_50px_rgba(0,0,0,0.12)] transition-shadow">
      {/* Quote icon (opening quote) */}
      <div className="mb-4 ">
        <div className="w-10 h-10 rounded-full bg-[#f65d4e] flex items-center justify-center">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="rotate-180 text-white"
          >
            <path
              d="M10 7H6a1 1 0 0 0-1 1v4h3v5h3v-6a4 4 0 0 0-4-4Zm9 0h-4a1 1 0 0 0-1 1v4h3v5h3v-6a4 4 0 0 0-4-4Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* Text */}
      <p className="text-gray-600 leading-relaxed">
        “
        {parts.map((p, i) =>
          p.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="text-[#f65d4e] font-semibold">
              {p}
            </span>
          ) : (
            <span key={i}>{p}</span>
          )
        )}
        ”
      </p>

      {/* Divider */}
      <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Footer */}
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h4 className="text-gray-800 font-semibold">{name}</h4>
          <p className="text-xs text-gray-500">{handle}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const items = [
    {
      name: "Sara Ahmed",
      handle: "student_sara",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      text: "I love EduSync! The free classes helped me catch up on tough subjects, and the interactive sessions made learning fun.",
      highlight: "interactive",
    },
    {
      name: "Rafiqul Islam",
      handle: "tutor_rafiq",
      avatar: "https://randomuser.me/api/portraits/men/21.jpg",
      text: "As a tutor, I can easily upload my classes and share notes. Students are more engaged than ever, and managing sessions is smooth.",
      highlight: "upload",
    },
    {
      name: "Nabila Khan",
      handle: "student_nabila",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      text: "The personalized notes are amazing. I feel like I have a private tutor guiding me every step of the way.",
      highlight: "personalized",
    },
    {
      name: "Arif Hossain",
      handle: "tutor_arif",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
      text: "Many students join free classes, which motivates me to create more quality content. EduSync makes teaching rewarding.",
      highlight: "free classes",
    },
    {
      name: "Tania Rahman",
      handle: "student_tania",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      text: "I love tracking my progress over time. The study sessions are engaging, and the material sharing feature is so helpful.",
      highlight: "progress",
    },
    {
      name: "Omar Faruk",
      handle: "tutor_omar",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      text: "EduSync’s platform is intuitive. I can schedule sessions, upload notes, and communicate with students seamlessly.",
      highlight: "intuitive",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-[10px] md:text-xs font-semibold tracking-wide uppercase text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          Testimonials
        </span>
        <h2 className="text-xl md:text-3xl font-bold mt-4 text-gray-700">
          What our students and tutors say
        </h2>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, idx) => (
          <TestimonialCard
            key={idx}
            text={it.text}
            highlight={it.highlight}
            name={it.name}
            handle={`@${it.handle}`}
            avatar={it.avatar}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
