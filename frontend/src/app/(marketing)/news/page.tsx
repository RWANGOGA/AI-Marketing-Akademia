import { NEWS_POSTS } from "../_lib/marketing-config";

export default function NewsPage() {
  return (
    <>
      <section className="hero hero-left" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <h1>Product updates and company announcements.</h1>
        </div>
      </section>
      
      <section>
        <div className="wrap">
          <div className="post-list">
            {NEWS_POSTS.map((post) => (
              <div key={post.id} className="post news-item" style={{ cursor: 'default' }}>
                <img src={post.image} alt={post.title} />
                <div>
                  <div className="post-top">
                    <h3>{post.title}</h3>
                    <span className="tag">{post.tag}</span>
                  </div>
                  <div className="date">{post.date}</div>
                  <p className="excerpt">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
