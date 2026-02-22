"use client";
import AOS from "aos";
import { FaCode } from "react-icons/fa";
import { useEffect } from "react";
import { FaComputerMouse } from "react-icons/fa6";
import Footer from "@/components/ContactSection";
import dynamic from "next/dynamic";

const StarsBg = dynamic(() => import("@/components/StarsBg"), {
  ssr: false,
});
export default function Content({
  dictionary,
  lang,
}: {
  dictionary: any;
  lang: any;
}) {
  useEffect(() => {
    AOS.init({
      offset: 100,
    });
  }, []);
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-br from-black via-zinc-800 to-black scale-150"></div>
      <StarsBg />

      <div className="mt-60 pt-8 pb-12 flex flex-col items-center z-[600] relative w-max md:w-[675px] lg:w-[900px] mx-auto space-y-6">
        <div className="absolute left-[-42px] md:left-[50%] top-0 md:-translate-x-[50%] h-full w-1 bg-yellow-300 z-[600] rounded-full"></div>

        <div className="text-white font-bold text-2xl p-2 absolute -left-[20%] md:left-[50%] top-[0%] -translate-y-[138%] md:-translate-x-[50%] h-max w-max bg-slate-800 border-2 border-yellow-300 z-[600] rounded-xl px-12 font-anta">
          {dictionary.HomePage.about}
        </div>

        {dictionary.HomePage.timeline.map((item: any, i: number) => (
          <RoadmapItem key={i} item={item} alignLeft={i % 2 === 0} />
        ))}
      </div>
      <div
        data-aos="fade-up"
        id="about"
        data-aos-duration={1200}
        className="w-screen flex flex-col z-[600] relative group"
      >
        <div className="z-[50] top-0 h-1 rounded-full w-full bg-transparent absolute left-[50%] -translate-x-[50%] group-hover:bg-yellow-300 scale-x-0 group-hover:scale-x-100 duration-[1000ms]"></div>
        <div className="bg-slate-800 p-3 py-12 relative">
          <div className="md:w-[675px] lg:w-[900px] mx-auto text-white z-[50]">
            <h2 className="text-white drop-shadow-xl shadow-black text-3xl lg:text-4xl 2xl:text-5xl font-bold relative ml-24">
              <FaCode className="text-gray-300 w-[75px] h-[75px] z-[25] absolute -translate-x-[130%] opacity-10 top-1/2 -translate-y-1/2" />
              <span className="text-yellow-300 font-anta">
                {dictionary.HomePage.motivation}
              </span>
            </h2>
            <h3 className="font-anta drop-shadow-xl shadow-black text-xl lg:text-2xl xl:text-3xl font-bold mt-12">
              {dictionary.HomePage.logic}
            </h3>
            <p className="font-dosis text-base lg:text-xl">
              {dictionary.HomePage.logicDesc}
            </p>
            <h3 className="font-anta drop-shadow-xl shadow-black text-xl lg:text-2xl xl:text-3xl font-bold mt-6">
              {dictionary.HomePage.learning}
            </h3>
            <p className="font-dosis text-base lg:text-xl">
              {dictionary.HomePage.learningDesc}
            </p>
            <h3 className="font-anta drop-shadow-xl shadow-black text-xl lg:text-2xl xl:text-3xl font-bold mt-6">
              {dictionary.HomePage.visualization}
            </h3>
            <p className="font-dosis text-base lg:text-xl">
              {dictionary.HomePage.visualizationDesc}
            </p>
            <div className="mt-24">
              <h2 className="text-white drop-shadow-xl shadow-black text-3xl lg:text-4xl 2xl:text-5xl font-bold relative ml-24">
                <FaComputerMouse className="text-gray-300 w-[75px] h-[75px] z-[25] absolute -translate-x-[130%] opacity-10 top-1/2 -translate-y-1/2" />
                <span className="text-yellow-300 font-anta">
                  {dictionary.HomePage.story}
                </span>
              </h2>
              <p className="font-dosis text-base lg:text-xl mt-6">
                {dictionary.HomePage.storyDesc}
              </p>
            </div>
          </div>
        </div>
        <Footer dictionary={dictionary} />
      </div>
    </>
  );
}
const RoadmapItem = ({
  item,
  alignLeft,
}: {
  item: any;
  alignLeft: boolean;
}) => (
  <div
    className={`text-white w-[250px] sm:w-[400px] md:w-[300px] lg:w-[410px] rounded-xl border-2 border-slate-600 bg-slate-800 ${
      alignLeft
        ? "md:mr-auto md:rounded-tr-none"
        : "md:ml-auto md:rounded-tl-none"
    } relative duration-300`}
  >
    <div
      className={`absolute top-[50%] -translate-y-[50%] ${
        alignLeft
          ? "md:-right-[41px] md:left-auto -left-[42px]"
          : "-left-[41px]"
      } h-1 w-10 bg-yellow-300`}
    ></div>
    <div
      className={`flex flex-col items-start md:items-center justify-between ${
        alignLeft ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div
        className={`font-anta bg-yellow-300 rounded-br-lg rounded-tl-lg px-3 py-3 w-max text-zinc-800 ${
          alignLeft
            ? "md:rounded-bl-lg md:rounded-br-none md:rounded-tl-none"
            : "rounded-br-lg md:rounded-l-none"
        }`}
      >
        {item.year}
      </div>
      <h2 className="px-3 font-bold md:text-xl font-anta">{item.title}</h2>
    </div>
    <p className="p-3 text-sm sm:text-base">{item.description}</p>
  </div>
);
