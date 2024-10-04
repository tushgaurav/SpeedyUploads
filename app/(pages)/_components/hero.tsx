"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

export function HeroText() {
    return (
        <HeroHighlight containerClassName="bg-blue-100">
            <motion.h1
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: [20, -5, 0],
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1],
                }}
                className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-blue-600 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
            >
                SpeedyUploads is the fastest way to share files. It is a{" "}
                <Highlight className="text-black dark:text-white">
                    simple, secure, and reliable.
                </Highlight>{" "}
            </motion.h1>
        </HeroHighlight>
    );
}
