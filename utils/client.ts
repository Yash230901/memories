//making sanity client for fetching the all things that are required from sanity backend
import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'oiir613s',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
