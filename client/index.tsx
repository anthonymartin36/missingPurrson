import { createRoot } from 'react-dom/client'
import { Auth0Provider  } from '@auth0/auth0-react'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import router from './routes'

import App from './components/App'

//const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
//const domain = process.env.REACT_APP_AUTH0_DOMAIN
const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider 
    authorizationParams={{ 
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_APP_AUTH0_AUDIENCE
    }}
    domain={import.meta.env.VITE_APP_AUTH0_DOMAIN} 
    clientId={import.meta.env.VITE_APP_AUTH0_CLIENT_ID}
    
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>,
  )
})

//redirectUri={window.location.origin}
//audience={import.meta.env.VITE_APP_AUTH0_AUDIENCE}