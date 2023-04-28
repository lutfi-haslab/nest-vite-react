import { useMatch } from '@tanstack/react-location';

type Props = {}

const Post = (props: Props) => {
  const {
    data: { post },
  }: any = useMatch();

  return (
    <div>
      <h4>{post?.title}</h4>
      <p>{post?.body}</p>
    </div>
  );
}

export default Post