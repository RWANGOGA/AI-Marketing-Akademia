import { query } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const res = await query("SELECT * FROM content WHERE type = 'news_post' ORDER BY created_at DESC");
  const dbPosts = res.rows;

  return (
    <>
      <section className="hero hero-left" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <h1 style={{ fontSize: '36px' }}>Product updates and company announcements.</h1>
        </div>
      </section>
      
      <section>
        <div className="wrap">
          <div className="post-list">
            {dbPosts.map(post => (
              <div key={post.id} className="post news-item" style={{ cursor: 'default' }}>
                <img src={post.image_url} alt="News image" />
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
