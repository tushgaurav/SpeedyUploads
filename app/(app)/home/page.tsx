import type { Metadata } from "next";
import CardStack from "./_components/card-stack";
import { RecentFilesCards } from "./_components/recent-uploads";

export const metadata: Metadata = {
    title: "Home",
};

export default function Home() {
    return (
        <div>
            <CardStack />
            <RecentFilesCards />
            {/* <RecentFilesTable /> */}
        </div>
    )
}