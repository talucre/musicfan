import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { App } from '@/app/ui/App/App.tsx'
import { store } from '@/app/model/store.ts'
import './index.scss'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
)
