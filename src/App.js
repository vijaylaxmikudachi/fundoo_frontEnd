import './App.css';
import { SearchProvider } from './hook/SearchContext'; 
import RouteModules from './routing/RouteModules';

function App() {
  return (
    <SearchProvider>
      <RouteModules />
    </SearchProvider>
  );
}

export default App;
