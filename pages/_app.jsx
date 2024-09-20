import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <DefaultSeo
        title="ShrimpHack 2024 🍤"
        description="ShrimpHack is a competitive weekend-long internal event of JALA where Warga JALA come together to work on cool projects. Join on 19 - 20 October, 2024."
        canonical="https://www.shrimphack.com/"
        openGraph={{
          url: "https://www.shrimphack.com/",
          title: "ShrimpHack 2024 🍤",
          description:
            "ShrimpHack is a competitive weekend-long internal event of JALA where Warga JALA come together to work on cool projects. Join on 19 - 20 October, 2024.",
          images: [
            {
              url: "https://www.shrimphack.com/shrimphack-2024.jpg",
              width: 800,
              height: 450,
              alt: "ShrimpHack 2024",
              type: "image/jpeg",
            },
          ],
          siteName: "ShrimpHack",
        }}
        twitter={{
          handle: "@jalaindonesia",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
