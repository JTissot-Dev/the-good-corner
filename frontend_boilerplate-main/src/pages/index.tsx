import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header/Header";
import RecentAds from "@/components/RecentAds.tsx/RecentAds";

export default function Home() {
  return (
    <>
       <body>
          <RecentAds />
      </body>
    </>
  );
}
