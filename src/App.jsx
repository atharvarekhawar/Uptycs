import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import EmployeeDetails from './components/employeeDetails'
import './index.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:employeeId" element={<EmployeeDetails/>}/>
      </Routes>
    </>
  )
}

export default App
