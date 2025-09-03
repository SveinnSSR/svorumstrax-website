import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // If we navigated to an anchor (…#section), let the browser handle it.
    if (hash) return

    // Scroll to top *after* the new route paints.
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    })
  }, [pathname, hash])

  return null
}
