import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8 dark:bg-white dark:text-gray-800">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank" className="block">
          <img src={viteLogo} className="h-24 w-24 hover:drop-shadow-lg transition-all duration-300 hover:brightness-125" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="block">
          <img src={reactLogo} className="h-24 w-24 animate-spin-slow hover:drop-shadow-lg transition-all duration-300" alt="React logo" />
        </a>
      </div>

      <h1 className="text-5xl font-bold leading-tight mb-8">Vite + React</h1>

      <div className="bg-gray-800 dark:bg-gray-100 p-8 rounded-lg mb-8">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="bg-gray-700 dark:bg-gray-200 hover:border-blue-500 border border-transparent rounded-lg px-5 py-3 text-base font-medium cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50 mb-4"
        >
          count is {count}
        </button>
        <p>
          Edit <code className="bg-gray-700 dark:bg-gray-300 px-1 rounded">src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="text-gray-400 dark:text-gray-600 text-sm">
        Click on the Vite and React logos to learn more
      </p>

      <h1 className="text-3xl font-bold underline mt-4">Hello world!</h1>
    </div>
  )
}

export default App