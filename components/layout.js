import Head from "next/head";
import Header from "../components/header";

import "./layout.scss";

const Layout = ({ title, children, showHeader = true }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {showHeader && <Header />}
      {children}
    </div>
  );
};

export default Layout;
