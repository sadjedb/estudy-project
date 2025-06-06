// lib/withAuth.js
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

// Helper function to get display name
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const withAuth = (WrappedComponent, allowedRoles = []) => {
  const ComponentWithAuth = (props) => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === 'loading') return

      if (!session) {
        router.push(`/login?callbackUrl=${encodeURIComponent(window.location.href)}`)
        return
      }

      if (allowedRoles.length > 0) {
        const hasRequiredRole = session.user?.roles?.some(role => allowedRoles.includes(role))

        if (!hasRequiredRole) {
          router.push('/unauthorized')
        }
      }
    }, [session, status, router])

    if (status === 'loading' || !session) {
      return <div>Loading...</div>
    }

    if (allowedRoles.length > 0) {
      const hasRequiredRole = session.user?.roles?.some(role =>
        allowedRoles.includes(role))

      if (!hasRequiredRole) {
        return <div>Redirecting...</div>
      }
    }

    return <WrappedComponent {...props} session={session} />
  }

  // Set display name for debugging purposes
  ComponentWithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`

  return ComponentWithAuth
}

export default withAuth