import { Routes, Route, Navigate } from 'react-router-dom';
import {useSelector} from 'react-redux'

import './App.css';

import { publicRoutes ,authProtectedRoutes } from "./routes";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


function App() {

  const  token  = useSelector(state => state.auth.token);


  return (
    <>
      {token && <Header />}

      <Routes>
        {
          publicRoutes.map((route, idx) => {
            if (!token) {
                return <Route path={route.path} element={<route.element />} key={idx} />
            }
            else {
              return <Route path={route.path} element={<Navigate to='/dashboard'/>} key={idx} />
            }
              
          })
        }

        {
          authProtectedRoutes.map((route, idx) => {
            if (token) {
                return <Route path={route.path} element={<route.element />} key={idx} />
            }
            else {
              return <Route path={route.path} element={<Navigate to='/login' />} key={idx} />
            }
            
          })
        }
      </Routes>
  
      {token&& <Footer />}
    </>
  );
}

export default App;
