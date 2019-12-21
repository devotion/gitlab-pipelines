import PropTypes from 'prop-types';
import Head from 'next/head';

import Sidebar from './sidebar';

import './layout.scss';

function Layout({ title, children, showSidebar = true }) {
  return (
    <div className="layout">
      <Head>
        <title>{title}</title>
      </Head>
      {showSidebar && <Sidebar />}
      <main>{children}</main>
    </div>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  showSidebar: PropTypes.bool
};

export default Layout;
