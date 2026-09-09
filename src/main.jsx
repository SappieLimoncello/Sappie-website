import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/design-system.css'
import './styles/components.css'

const rootElement = document.getElementById('root')
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// scripts/prerender.mjs schrijft voor de publieke pagina's al gevulde HTML
// in dist/. Staat die er al (root heeft kinderen), dan hydrateren we die in
// plaats van 'm weg te gooien en opnieuw op te bouwen.
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app)
} else {
  ReactDOM.createRoot(rootElement).render(app)
}
