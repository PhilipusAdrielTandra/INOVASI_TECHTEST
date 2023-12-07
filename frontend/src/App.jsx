import Transaction from './components/Transactions'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateTransactions from './components/CreateTransactions'
import EditTransaction from './components/EditTransaction';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Transaction/>}/>
          <Route path="/create" element={<CreateTransactions/>}/>
          <Route path="/edit/:id" element={<EditTransaction/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App