import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.scss'
import { App } from './app/ui/App/App'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
)
