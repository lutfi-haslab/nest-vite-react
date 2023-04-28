import {
  MakeGenerics,
  ReactLocation,
  Route
} from "@tanstack/react-location";
import Index from "@/pages";
import PostIndex from "@/pages/post";
import Post from "@/pages/post/Post";
import Posts from "@/pages/post/Posts";

import { fetchPostById, fetchPosts } from "@/query";

type PostType = {
  id: string;
  title: string;
  body: string;
};

export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    posts: PostType[];
    post: PostType;
  };
}>;

export const location = new ReactLocation();
export const routes: Route[] = [
  { path: "/", element: <Index /> },
  {
    path: "posts",
    element: <Posts />,
    loader: async () => {
      return {
        posts: await fetchPosts(),
      };
    },
    children: [
      { path: "/", element: <PostIndex /> },
      {
        path: ":postId",
        element: <Post />,
        loader: async ({ params: { postId } }) => {
          return {
            post: await fetchPostById(postId),
          };
        },
      },
    ],
  },
]