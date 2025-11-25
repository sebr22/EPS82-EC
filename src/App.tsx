import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import OceanDashboard from './components/OceanDashboard'

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <OceanDashboard />
      </main>
      <Footer />
    </div>
  )
}

export default App
