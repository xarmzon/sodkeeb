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
import { AnimatePresence } from 'framer-motion'
import store from '@redux/store'
import {
  setLoading,
  setLoadingLogout,
  setLoginState,
  setUser,
} from '@redux/slice/auth'
import { Provider } from 'react-redux'

NProgress.configure({ showSpinner: false })

function MyApp({ Component, pageProps, router }: AppProps) {
  const userLoggedIn = store.getState().auth.loggedIn
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

  useEffect(() => {
    if (store.getState().auth.loadingLogout) {
      store.dispatch(setLoadingLogout(false))
    }
    const localStorageUser = localStorage.getItem('user')
    if (localStorageUser) {
      if (!userLoggedIn) {
        const userData = JSON.parse(localStorageUser)
        store.dispatch(
          setUser({ token: userData.token, username: userData.username })
        )
        store.dispatch(setLoginState(true))
      }
    } else {
      store.dispatch(setUser({ token: '', username: '' }))
      store.dispatch(setLoginState(false))
    }

    store.dispatch(setLoading(false))
  }, [userLoggedIn, router.route])

  return (
    <Provider store={store}>
      <SWRConfig
        value={{
          fetcher: async (resource, init) => await swrFetcher(resource, init),
        }}
      >
        <DefaultSeo {...DEFAULT_SEO} />
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </SWRConfig>
      <Toaster
      // toastOptions={{ duration: 5000 }}
      />
    </Provider>
  )
}

export default MyApp
