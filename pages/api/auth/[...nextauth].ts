import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GithubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import clientPromise from '../../../lib/mongodb';

export default NextAuth({
    // Configure one or more authentication providers
    adapter: MongoDBAdapter(clientPromise),
    secret: 'thisisasecret',
    providers: [
        GithubProvider({
            clientId: <string>process.env.GITHUB_ID,
            clientSecret: <string>process.env.GITHUB_SECRET,
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }),
    ],

    pages: {
        signIn: '/auth',
    },
});
