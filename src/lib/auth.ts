import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import UserModel from '@/models/user';
import sanitizeHtml from 'sanitize-html';

// Alinhar CustomUser com o tipo User do NextAuth
export interface CustomUser extends User {
  _id?: string; // Opcional para compatibilidade com MongoDB
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  password?: string; // Opcional, já que User não exige
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email e senha são obrigatórios');
        }

        const sanitizedEmail = sanitizeHtml(credentials.email.trim().toLowerCase());
        await dbConnect();
        const dbUser = await UserModel.findOne({ email: sanitizedEmail }).lean() as unknown as CustomUser;

        if (!dbUser) {
          console.error('Usuário não encontrado:', sanitizedEmail);
          throw new Error('Usuário não encontrado');
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, dbUser.password || '');
        if (!isPasswordValid) {
          console.error('Senha inválida para:', sanitizedEmail);
          throw new Error('Senha inválida');
        }

        return { id: dbUser._id!.toString(), name: dbUser.name, email: dbUser.email, role: dbUser.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as CustomUser).role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as 'admin' | 'editor' | 'viewer';
      return session;
    },
  },
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
};