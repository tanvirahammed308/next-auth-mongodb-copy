import { connectMongodb } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        
        // const user = { id: "1" };
        // return user;
        const{email,password}=credentials;
        try{
await connectMongodb();
const user=await User.findOne({email});
if (!user) {
  return null;
  
}
const passwordMached=await bcrypt.compare(password,user.password);
if (!passwordMached) {
  return null;
  
}
return user;
        }catch(error){
          console.log('error',error)

        }

        
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
const handler =NextAuth(authOptions)
export {handler as GET,handler as POST}
