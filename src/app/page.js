"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        setPosts(data); // Save fetched data to state
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []); // Empty array ensures it only runs once after the component mounts

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Blog Viewer</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {post.title}
              </h2>
              <p className="text-gray-600 mt-2">{post.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
