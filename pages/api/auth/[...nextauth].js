import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GoogleClientID,
      clientSecret: process.env.GoogleClientSecret
    })
  ],
  secret: process.env.SECRET,
}
export default NextAuth(authOptions)