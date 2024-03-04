import Head from "next/head";
import Header from "../Header/Header";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>The Good Corner</title>
        <meta name="description" content="The Good Corner" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="main-content">
        { children }
      </main>
    </>
  )
}

export default Layout;