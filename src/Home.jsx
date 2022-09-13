import BlogList from './BlogList';
import useFetch from './useFetch';

const Home = () => {
  const { data, isPending, error } = useFetch('http://localhost:8000/blogs');

  return (
    <div className='home'>
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
      {data && <BlogList blogs={data} title={'All Blogs!'} />}

      {/* <BlogList
        blogs={blogs.filter((blog) => blog.author === 'mario')}
        title={"Marios's Blogs"}
      /> */}
    </div>
  );
};

export default Home;
