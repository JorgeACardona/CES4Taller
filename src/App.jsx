import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import ParkingProvider from './context/ParkingProvider';
import UserCard from './components/UserCard';
import VehicleDetail from './components/VehicleDetail';
import UserDetail from './components/UserDetail';
import UsersPage from './pages/UsersPage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import ParkingPage from './pages/ParkingPage';
import VehiclePage from './pages/VehiclePage';

const App = () => {
  const { isLogin } = useContext(UserContext);

  return (
    <>
      <BrowserRouter>
        <main style={{ width: '100vw', height: '100vh', backgroundColor: '#E0F7FA' }}>
          <ParkingProvider>
            {isLogin && (
              <nav
                className='d-flex justify-content-between align-items-center p-3'
                style={{
                  height: '10vh',
                  width: '100vw',
                  backgroundColor: 'darkcyan', 
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
              >
                <div style={{ width: '25vw' }} className='d-flex justify-content-between'>
                  <Link
                    className='btn'
                    to='/users'
                    style={{
                      backgroundColor: 'rgb(28, 84, 84)',
                      color: 'white',
                      transition: 'background-color 0.3s',
                      textDecoration: 'none',
                      padding: '10px 20px',
                    }}
                  >
                    Empleados
                  </Link>
                  <Link
                    className='btn'
                    to='/'
                    style={{
                      backgroundColor: 'rgb(28, 84, 84)',
                      color: 'white',
                      transition: 'background-color 0.3s',
                      textDecoration: 'none',
                      padding: '10px 20px',
                    }}
                  >
                    Parqueadero
                  </Link>
                </div>
                <UserCard />
              </nav>
            )}

            <Routes>
              <Route path='/' element={isLogin ? <ParkingPage /> : <Navigate to='/login' />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/users' element={<UsersPage />} />
              <Route path='/user/:id' element={<UserDetail />} />
              <Route path='/vehicle' element={<VehiclePage />} />
              <Route path='/vehicle/:plate' element={<VehicleDetail />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
          </ParkingProvider>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
