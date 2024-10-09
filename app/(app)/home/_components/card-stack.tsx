'use client'
import { IconPencilPlus, IconCategory, IconFolderPlus } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils';

function SpotLightItem({ className, children }: { className?: string, children: React.ReactNode }) {
    const mousePosition = useMousePosition();
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={
                cn(
                    "relative overflow-hidden border-zinc-800 border-2 rounded-lg backdrop-blur",
                    className
                )
            }
        >
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        layoutId="spotlight"
                        className="absolute opacity-0 group-hover:opacity-100 z-10 inset-0 bg-fixed rounded-lg"
                        style={{
                            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #ffffff76 0%,transparent 20%,transparent) fixed `,
                        }}
                    ></motion.div>
                )}
            </AnimatePresence>
            {/* <motion.div
                className="absolute inset-0 z-0 overflow-hidden bg-fixed"
                style={{
                    clipPath: `polygon(0% 0%, 0% 100%, calc(0% + 3px) 100%, calc(0% + 3px) calc(0% + 3px), calc(100% - 3px) calc(0% + 3px), calc(100% - 3px) calc(100% - 3px), calc(0% + 3px) calc(100% - 3px), calc(0% + 3px) 100%, 100% 100%, 100% 0%)`,
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, hsla(${(mousePosition.x! + mousePosition.y!) / 5},90%,70%,0.35) 0%,transparent 10%,transparent) fixed`
                }}
            ></motion.div> */}
            <motion.div
                className="absolute inset-0 z-0  bg-fixed rounded-lg"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #ffffff6e 0%,transparent 10%,transparent) fixed`,
                }}></motion.div>
            <div className="relative z-10">{children}</div>
        </div>
    );
}


function CardContent({ icon, title, link }: { icon: React.ReactNode, title: string, link: string }) {
    return (
        <Link href={link}>
            <div className='p-6'>
                {icon}
                <h2 className="font-semibold text-zinc-100 pt-4">{title}</h2>
            </div>
        </Link>
    )
}

const useMousePosition = () => {
    const [mousePosition, setMousePosition] = React.useState({
        x: null,
        y: null,
    });
    React.useEffect(() => {
        const updateMousePosition = (ev) => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        };
        window.addEventListener("mousemove", updateMousePosition);
        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);
    return mousePosition;
};

export default function CardStack() {
    const boxes = [
        {
            id: "12",
            child: <CardContent icon={<IconFolderPlus size={24} />} title="Create folder" link="hi" />
        },
        {
            id: "22",
            child: <CardContent icon={<IconPencilPlus size={24} />} title="Sign" link="hi" />
        },
        {
            id: "32",
            child: <CardContent icon={<IconCategory size={24} />} title="Apps" link="hi" />
        },
    ];
    return (
        <div className="flex flex-wrap gap-4 text-base">
            {boxes.map((box) => (
                <SpotLightItem key={box.id} className="w-44 md:w-52">{box.child}</SpotLightItem>
            ))}
        </div>
    );
}