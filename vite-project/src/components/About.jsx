import React from 'react';

const About = () => {
  return (
    <div id="about" className=" min-h-screen w-screen">
      <div className=" relative mb-8 mt-36  flex flex-col items-center gap-6">
        <h2 className=" font-general text-sm uppercase md:text-[10px]">Welcome to Reality</h2>

        <div className=" text-center uppercase text-4xl  md:text-[6rem] leading-[0.8]">
          Disc<b>o</b>ver the world's <br /> mos<b>t</b> immersive gaming e<b>x</b>perience
        </div>
        <div className="about-subtext ">
          <p>the game of games begin-your life , now an epic MMORPG </p>
          <p>Zentries unites every player from countless games and platforms</p>
        </div>
      </div>
    </div>
  );
};

export default About;
