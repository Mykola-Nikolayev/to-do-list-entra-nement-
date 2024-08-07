import { Route, Routes } from 'react-router-dom';
import { AuthPage } from '../pages/Auth';
import { HomePage } from '../pages/Home';
import {Header} from '../components/Header';
import { useUserContext } from '../context/UserContext';

export const AppRoutes = () => {
    const { isAuthenticated } = useUserContext()

    return isAuthenticated ? (
        <div className='app-wrapper'>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </div>
    ) : (
        <Routes>
            <Route path="*" element={<AuthPage />} />
        </Routes>   
    )
} 