import '../styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return 
    <>
    {/* <Head>
      <titel>Admin Page</titel>
      <link
        href="https://unpkg.com/tailwindcss@^2.0/dist/tailwind.min.css"
        rel="stylesheet"
      />
    </Head> */}
    <Component {...pageProps} />
    </>
}

export default MyApp
