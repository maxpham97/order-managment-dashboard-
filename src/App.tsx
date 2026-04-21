import './index.css'
import Providers from './providers/providers'
import { RenderRoutes } from './routes/routes'


function App() {

  return (
    <Providers>
      <RenderRoutes />
    </Providers>
  )
}

export default App
