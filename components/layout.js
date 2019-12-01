import Head from "next/head";
import Header from "../components/header";

import "./layout.scss";

const Layout = ({ title, children, showHeader = true }) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <title>{title}</title>
      </Head>
      {showHeader && <Header />}
      {children}
    </div>
  );
};

export default Layout;
