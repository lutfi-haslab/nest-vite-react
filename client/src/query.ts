import axios from "axios";

export const fetchPosts = async () => {
  await new Promise((r) => setTimeout(r, 300));
  return await axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((r) => r.data.slice(0, 5));
}

export const fetchPostById = async (postId: string) => {
  await new Promise((r) => setTimeout(r, 300));

  return await axios
    .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((r) => r.data);
}