import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { FadeUp } from "./Motion.jsx";
import GuestCard from "./GuestCard.jsx";

export const juryMembers = [
    {
        name: "Mr Rohit Sharma",
        designation: "Indian Cricketer",
        img: "jury1.jpeg"
    },
    {
        name: "Mr. Sunil Gavaskar",
        designation: "Indian Cricket Commentator & Former Cricketer",
        img: "jury2.jpeg"
    },
    {
        name: "Ms. Lara Dutta",
        designation: "Indian Actress & Model",
        img: "jury3.jpeg"
    },
    {
        name: "Mr. Brett Lee",
        designation: "Australian Cricketer",
        img: "jury4.jpeg"
    },
    {
        name: "Mr. Virender Sehwag",
        designation: "Indian Cricket Commentator & Former Cricketer",
        img: "jury5.jpeg"
    },
    {
        name: "Dr. Yoganand Shashtri",
        designation: "Former Reader, Shaheed Bhagat Singh College, Delhi",
        img: "jury6.jpeg"
    },
    {
        name: "Mr. Sandeep Patil",
        designation: "Former Indian Cricketer & Chief of the BCCI Selection Committee",
        img: "jury7.jpeg"
    },
    {
        name: "Dr. Raj Aggarwal",
        designation: "Director of AIMA-CME",
        img: "jury8.jpeg"
    },
    {
        name: "Mr. Chetan Sharma",
        designation: "Former Indian Cricketer",
        img: "jury9.jpeg"
    },
    {
        name: "Padma Shri Dr. J. K. Singh",
        designation: "President, Cancer Care India; Former National Vice President, India Medical Association",
        img: "jury10.jpeg"
    },
    {
        name: "Mr. Arvind Sawant",
        designation: "Hon'ble Minister of Heavy Industries and Public Enterprise",
        img: "jury11.jpeg"
    },
    {
        name: "Mr. Chetan Chouhan",
        designation: "Former Indian Cricketer & Politician",
        img: "jury12.jpeg"
    },
    {
        name: "Mr. Jonty Rhodes",
        designation: "Former South African Cricketer",
        img: "jury13.png"
    },
    {
        name: "Mr. Sajid Khan",
        designation: "Film Director & Producer",
        img: "jury14.png"
    },
];

export default function JurySection({ hideHeader = false }) {
    const displayJury = juryMembers.length > 0 && juryMembers.length < 12
        ? [...juryMembers, ...juryMembers]
        : juryMembers;

    return (
        <section className={`relative overflow-hidden ${hideHeader ? "py-0" : "py-12"}`}>
            {!hideHeader && (
                <FadeUp className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-black mb-4 bg-gradient-to-r from-white via-emerald-400 to-white bg-clip-text text-transparent drop-shadow-2xl">
                        Our Esteemed <span className="text-emerald-400">Guests & Speakers</span>
                    </h2>
                    <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto rounded-full" />
                    <p className="mt-6 text-emerald-100/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                        Join our network of eminent medical professionals and visionaries.
                    </p>
                </FadeUp>
            )}
            <FadeUp className={`max-w-7xl mx-auto px-6 ${hideHeader ? "" : "pt-10"}`}>
                <Swiper
                    modules={[Autoplay, Pagination, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor
                    centeredSlides
                    slidesPerView="auto"
                    coverflowEffect={{
                        rotate: 15,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: false
                    }}
                    autoplay={{ delay: 1000, disableOnInteraction: false }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    loop={displayJury.length > 1}
                    className="!pb-20"
                >
                    {displayJury.map((member, i) => (
                        <SwiperSlide key={i} className="!w-[320px] md:!w-[380px]">
                            <GuestCard member={member} index={i} isFeatured={true} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </FadeUp>
        </section>
    );
}
