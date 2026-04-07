// import React from 'react'
// import Navbar from './components/Navbar'
// import { Route, Routes, useLocation } from 'react-router-dom'
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Footer from './components/Footer';
// import Routecard from './pages/Routecard';

// const App = () => {

//   const isOwnerPath = useLocation().pathname.includes("owner");
//   return (
//     <div>
//       {!isOwnerPath && <Navbar />}
//       <div className='min-h-[70vh]'>
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/login' element={<Login/>} />
//           <Route path='/Routecard' element={<Routecard/>}/>
//         </Routes>
//       </div>
//       <Footer />
//     </div>
//   )
// }

// export default App



import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Footer from './components/Footer';
import Routecard from './pages/Routecard';
import Loader from './components/Loader';
import Draft from './pages/Draft';

const App = () => {
  const [loading, setLoading] = useState(true);
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      {loading && <Loader onFinish={() => setLoading(false)} />}

      {!isOwnerPath && <Navbar />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Routecard' element={<Routecard />} />
           <Route path='/Draft' element={<Draft/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App