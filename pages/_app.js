// import '../styles/globals.css';
import Head from 'next/head';
import 'react-quill/dist/quill.snow.css'; //react-quill Editor
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  return <>
          <Head>
            <title>Admin Page</title>
            <link
              // href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"             
              href="https://unpkg.com/tailwindcss@^2.0/dist/tailwind.min.css"
              rel="stylesheet"
            />
          </Head>
          <Component {...pageProps} />
        </>
}

export default MyApp
