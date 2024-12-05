import './App.css';
import SearchHook from './components/hooks/SearchHook';
import RouteModules from './routing/RouteModules';

function App() {
  return (
    <div className="App">
        <SearchHook>
       <RouteModules />
       </SearchHook>
   
    </div>
  );
}
export default App;
