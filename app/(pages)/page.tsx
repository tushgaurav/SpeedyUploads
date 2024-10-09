import { HeroText } from "./_components/hero";
import Image from "next/image";
import type { Metadata } from "next";
import { VelocityScroll } from "@/components/ui/velocity-scroll";

export const metadata: Metadata = {
  title: "SpeedyUploads.com - Fast Uploads & File Sharing",
  description: "The fastest way to share files.",
};

function Button({ type = "gradient", children }: { type?: "gradient" | "litup", children: React.ReactNode }) {
  switch (type) {
    case "gradient":
      return (
        <button className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
          {children}
        </button>
      );
    case "litup":
      return (
        <button className="px-8 py-2 rounded-full bg-blue-500 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
          {children}
        </button>
      );
  }
}

export default function Home() {
  return (
    <div className="relative">
      {/* Gradients */}
      <div
        aria-hidden="true"
        className="flex absolute start-1/2 transform -translate-x-1/2"
      >
        <div className="bg-gradient-to-r from-background/50 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
        <div className="bg-gradient-to-tl blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-primary-foreground via-primary-foreground to-background" />
      </div>
      {/* End Gradients */}
      <div className='py-10 relative z-10'>

        <VelocityScroll
          text="Speed   ."
          default_velocity={5}
          className="font-display text-center text-4xl font-black tracking-[-0.02em] text-primaryblue dark:text-gray-600 drop-shadow-sm md:text-7xl md:leading-[5rem] opacity-15 dark:opacity-80 select-none"
        />

        <h1 className="pt-10 text-4xl md:text-6xl text-center text-black dark:text-gray-300">
          <span className='text-primaryblue font-bold z-50'>Fast Uploads,</span> Effortless Shares.
        </h1>
        <p className='pt-10 text-xl text-center text-black dark:text-gray-300'>
          The fastest way to share files.
        </p>
        <div className='flex justify-center pt-4'>
          <Button>Get Started</Button>
        </div>
        <div className="pt-20 relative">
          <Image src="/hero.png" alt="Hero" className="mx-auto" width={400} height={400} />
          {/* circular glow */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-white to-primaryblue dark:from-gray-900 dark:to-gray-600 opacity-50 blur-2xl" />
        </div>
      </div>


      {/* <HeroText /> */}
    </div >
  );
}
