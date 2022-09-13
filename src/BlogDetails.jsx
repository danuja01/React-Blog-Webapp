import { useNavigate, useParams } from 'react-router-dom';
import useFetch from './useFetch';

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    isPending,
    error,
  } = useFetch(`http://localhost:8000/blogs/${id}`);

  const navigate = useNavigate();

  const handleCLick = () => {
    fetch(`http://localhost:8000/blogs/${blog.id}`, {
      method: 'DELETE',
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div className='blog-details'>
      {error && <p>{error}</p>}
      {isPending && (
        <div className='loading'>
          <div className='snippet' data-title='.dot-pulse'>
            <div className='stage'>
              <div className='dot-pulse'></div>
            </div>
          </div>
        </div>
      )}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleCLick}>delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
