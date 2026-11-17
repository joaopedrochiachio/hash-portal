import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Inter com eixo óptico: em tamanhos grandes vira "Inter Display" automaticamente.
import '@fontsource-variable/inter/opsz.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import './styles.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
