import React from "react";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const App = () => {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingref = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <span
        ref={growingSpan}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>
      <div className="w-full relative min-h-screen">
        {showCanvas &&
          data[0].map((canvasdets, index) => <Canvas details={canvasdets} />)}

        <div className="w-full relative z-[1] h-screen">
          <nav className="w-full py-4 px-5 flex justify-between z-50">
            <div className="brand text-md font-md">Thirtysixstudio</div>
            <div className="links flex gap-10">
              {[
                "What we do",
                "Who we are",
                "How we give back",
                "Talk to us",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-md hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div
            style={{ borderBottom: "1px solid #252525", margin: "0 10px" }}
          ></div>
          <div className="textcontainer w-full mt-10 px-[22%]">
            <div className="text w-[50%]">
              <h3 className="text-[2.4rem] leading-[1.2]">
                At Thirtysixstudio, we <br /> build digital assets and immersive
                experiences <br /> for purposeful brands.
              </h3>
              <p className="text-[1.1rem] w-[80%] mt-10 font-normal">
                We're a boutique production studio focused on design, animation,
                and technology, constantly rethinking whatdigital craft can do
                for present-day ads and campaigns.
              </p>
              <p className="text-[1.1rem] mt-10">Scroll</p>
            </div>
          </div>
          <div className="w-full bottom-0 left-0 mt-30">
            <h1
              ref={headingref}
              className="text-[14.7rem] font-normal leading-none pl-4"
            >
              Thirtysixstudio
            </h1>
          </div>
          <div
            style={{
              borderBottom: "1px solid #252525",
              margin: "10px",
              padding: "1.5rem",
            }}
          ></div>
        </div>
      </div>

      <div className="w-full h-screen relative mt-75 mb-0 px-10">
        {showCanvas &&
          data[1].map((canvasdets, index) => <Canvas details={canvasdets} />)}
        <div className="relative z-[1] flex w-[60%] mx-auto my-1 items-start justify-between ">
          <h1 className="text-[1.2rem]">01 - WHAT WE DO</h1>
          <h1 className="text-[2rem] max-w-[70%] leading-tight">
            We elevate creative <br /> production in the <br /> advertising
            industry, <br /> transforming ambitious <br /> ideas into reality.
          </h1>
        </div>
        <div className="relative z-[1] flex w-[60%] mx-90 mt-30 items-end justify-end">
          <p className="text-[1rem] max-w-[50%]">
            By combining cutting-edge craft with modern <br /> technology and
            top-tier processes, we deliver <br /> sophisticated work that
            resonates. <br /> <br /> Our agile approach balances innovation with
            simplicity, <br /> ensuring your journey with us is seamless,
            transparent, <br /> and rewarding from start to finish.
          </p>
        </div>
      </div>
    </>
  );
};

export default App;
