import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import EmployeeDetailsPage from './components/EmployeeDetailsPage'
import './index.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:employeeId" element={<EmployeeDetailsPage/>}/>
      </Routes>
    </>
  )
}

export default App
