import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Your E-mail",
      credentials: {
        username: {
          label: "E-mail",
          type: "e-mail",
          placeholder: "Your e-mail",
        },
        password: {
          label: "Phone Number",
          type: "password",
        },
      },
      type: "credentials",
      async authorize(credentials, req) {
        // console.log(req);
        // console.log(credentials);
        // console.log(credentials?.username, credentials?.password);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/registration?filterByFormula=AND({email}="${credentials?.username}",{phone_number}="${credentials?.password}")`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
            },
          }
        );
        const user = await res.json();

        // console.log(user);

        if (res.ok && user?.records) {
          // console.log(user?.records?.fields);
          return {
            id: user?.records[0].fields.number,
            name: user?.records[0].fields.name,
            email: user?.records[0].fields.email,
            image: user?.records[0].fields.image_url,
          };
        } else
          return {
            error: `no user found ${user}`,
          };
      },
    }),
  ],
  pages: {
    signIn: "/register",
    error: "/",
  },

  callbacks: {
    async signIn({ account, profile, credentials }) {
      // console.log(account.provider, credentials);
      // const isAllowedToSignIn = true;
      // if (isAllowedToSignIn) {
      //   return true;
      // } else {
      //   // Return false to display a default error message
      //   return false;
      //   // Or you can return a URL to redirect to:
      //   // return '/unauthorized'
      // }
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@jala.tech");
      }
      // console.log("change");
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      // console.log(session, user, token);
      return session;
    },
  },
};

export default NextAuth(authOptions);
