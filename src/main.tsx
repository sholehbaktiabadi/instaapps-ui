import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app.tsx'
import { NextUIProvider } from '@nextui-org/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <App />
      </main>
    </NextUIProvider>
  </StrictMode>,
)
