import { createBrowserRouter } from "react-router-dom";
import Aboutus from "./components/Aboutus";
import App from "./App";
import Register from "./components/auth/register";
import ListPosts from "./components/crud/ListPost";
import CreatePost from "./components/crud/CreatePost";
import EditPost from "./components/crud/EditPost";
import Login from "./components/auth/Login";
import ViewPost from "./components/crud/Viewpost";




const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'aboutus', element: <Aboutus/> },
    { path: 'register', element: <Register/> },
    { path: 'login', element: <Login/>},
    { path: 'blog/posts', element: <ListPosts/> },
    { path: 'blog/posts/create', element: <CreatePost/> },
    { path : 'blog/posts/:postId/', element: <ViewPost/>},
    { path : 'blog/posts/:postId/edit', element: <EditPost/>}
]);

export default router;