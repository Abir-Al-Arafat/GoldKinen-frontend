import "./App.css";
import PostList from "./pages/PostList";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="container">
      <NavBar />
      <PostList />
    </div>
  );
}

export default App;
