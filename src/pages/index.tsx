import Head from 'next/head'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Finstagram</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    </>
  )
}
