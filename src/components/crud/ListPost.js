import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import PostListItem from "./PostListItem";
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";

function ListPosts() {
  const [allPosts, setAllPosts] = useState([]); // Store all the fetched posts from the API
  const [filteredPosts, setFilteredPosts] = useState([]); // Store the filtered posts based on search term
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector(store => store.auth.user);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filteredItems = allPosts.filter(item =>
      item.name.toLowerCase().startsWith(searchTermLowerCase)
    );
    setFilteredPosts(filteredItems);
  };
  
  function fetchPosts() {
    // Check if user is available
    if (user && user.token) {
      axios.get('https://medicalstore.mashupstack.com/api/medicine', {
        headers: { 'Authorization': "Bearer " + user.token }
      }).then(response => {
        setAllPosts(response.data);
        setFilteredPosts(response.data); // Initialize filteredPosts with all the fetched posts
      }).catch(error => {
        console.error("Error fetching posts:", error);
      });
    } else {
      console.error("User object or token is null.");
    }
  }
  

  useEffect(() => {
    fetchPosts();
  }, []); // Fetch posts only once on component mount

  return (
    <div>
      <Navbar />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <form onSubmit={handleSearch}>
              <label>Search medicine: </label>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
              <button
                type="submit"
                className="btn btn-small btn-success"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4">MEDICINE DETAILS</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            <Link to="/blog/posts/create" className="btn btn-info mb-2">
              Create Post
            </Link>
            {filteredPosts.length === 0 ? (
              <p>No matching posts found.</p>
            ) : (
              filteredPosts.map(post => (
                <PostListItem key={post.id} post={post} refresh={fetchPosts} />
              ))
            )}
          </div>
        </div>
      </div>
   
  );
}

export default checkAuth(ListPosts);
