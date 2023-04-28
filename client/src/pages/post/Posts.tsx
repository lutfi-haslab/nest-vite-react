import React from 'react'
import { useMatch } from '@tanstack/react-location';
import { LocationGenerics } from '../../routes';
import { Link, Outlet } from '@tanstack/react-location';

const Posts = () => {
  const {
    data: { posts }
  }: any = useMatch();
  return (
    <div>
      <div>
        {posts?.map((post: any) => {
          return (
            <div key={post.id}>
              <Link to={post.id}>
                <pre>{post.title}</pre>
              </Link>
            </div>
          );
        })}
      </div>
      <hr />
      <Outlet />
    </div>
  )
}

export default Posts