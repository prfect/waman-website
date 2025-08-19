// app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('🔍 Auth attempt for:', credentials?.email);
        
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing credentials');
          return null;
        }
        
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });
          
          console.log('👤 User found:', !!user);
          
          if (!user) {
            console.log('❌ User not found');
            return null;
          }
          
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          console.log('🔐 Password valid:', isValidPassword);
          
          if (isValidPassword) {
            console.log('✅ Login successful');
            return {
              id: user.id.toString(),
              email: user.email,
            } as any; // Type assertion to avoid TypeScript error
          }
          
          console.log('❌ Invalid password');
          return null;
          
        } catch (error) {
          console.error('💥 Database error during auth:', error);
          return null;
        }
      }
    })
  ],
  session: { 
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  pages: { 
    signIn: '/admin/login',
    error: '/admin/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to admin after successful login
      if (url.startsWith('/admin/login')) {
        return `${baseUrl}/admin`;
      }
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };