import './App.scss'
import Visualizer from './components/Visualizer/Visualizer';

const App = () => {
  return (
    <>
      <h1>Sorting Algorithms Visualized</h1>
      <Visualizer/>
      <footer>&copy; {new Date().getFullYear()} jqvelin</footer>
    </>
  );
};

export default App;