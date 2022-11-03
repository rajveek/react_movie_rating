
import './App.css';
import Main from './components/Main';
import { ErrorBoundary } from "react-error-boundary"

function App() {
  return (
    // <ErrorBoundary fallback={<h1>Something went wrong!!</h1>}>
    <Main/>
    // </ErrorBoundary>
  );
}

export default App;
