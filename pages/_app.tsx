import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { DefaultSeo } from 'next-seo'
import { useEffect } from 'react'
import { SWRConfig } from 'swr'
import NProgress from 'nprogress'
import { swrFetcher } from '@utils/fetcher'
import { DEFAULT_SEO } from '@utils/constants'
import 'nprogress/nprogress.css'
import '../styles/globals.css'

NProgress.configure({ showSpinner: false })

function MyApp({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    const startProgress = () => NProgress.start()
    const stopProgress = () => NProgress.done()

    router.events.on('routeChangeStart', startProgress)
    router.events.on('routeChangeComplete', stopProgress)
    router.events.on('routeChangeError', stopProgress)

    return () => {
      router.events.off('routeChangeStart', startProgress)
      router.events.off('routeChangeComplete', stopProgress)
      router.events.off('routeChangeError', stopProgress)
    }
  }, [router])
  return (
    <>
      <SWRConfig
        value={{
          fetcher: async (resource, init) => await swrFetcher(resource, init),
        }}
      >
        <DefaultSeo {...DEFAULT_SEO} />
        <Component {...pageProps} key={router.route} />
      </SWRConfig>
      <Toaster toastOptions={{ duration: 5000 }} />
    </>
  )
}

export default MyApp
