import "./App.css";
import TodoList from "./react-query/TodoList";
import PostList from "./react-query/PostList";
import NavBar from "./routing/NavBar";

function App() {
  return (
    <div className="container ">
      <NavBar />
      <PostList />
    </div>
  );
}

export default App;
