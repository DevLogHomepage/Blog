import * as React from "react"
import './App.css';
import AppRouter from '@/router/AppRouter';

function App() {
  const toggleDark = () => {
    console.log("dark");
    (document.getElementById('root') as HTMLElement).classList.toggle('dark')
  }
  
  return (
    <AppRouter/>
  );
}

export default App;
