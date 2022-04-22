import { useEffect, useState } from 'react'

const useSticky = () => {
  const [sticky, setSticky] = useState<boolean>(false)
  useEffect(() => {
    const stickyNav = () => {
      const scrollY = window.scrollY
      if (scrollY > 1) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }
    stickyNav()
    window.addEventListener('scroll', stickyNav)
    return () => window.removeEventListener('scroll', stickyNav)
  }, [])

  return {
    sticky,
  }
}

export default useSticky
