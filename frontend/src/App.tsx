import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppRoutes } from './routes/AppRoutes'
import { UserContextProvider } from './context/UserContext'


function App() {

  return (
    <BrowserRouter>
      <UserContextProvider>
        <AppRoutes />
        <ToastContainer />
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App
