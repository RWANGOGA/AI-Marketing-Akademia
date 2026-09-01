"use client";

import { useState } from "react";
import { toggleContentStatus, deleteContentRecord } from "./actions";

export default function ContentClient({ initialContent }: { initialContent: any[] }) {
  const [contentTab, setContentTab] = useState("blogs");
  const [isPending, setIsPending] = useState(false);

  const getTabData = () => {
    switch(contentTab) {
      case 'blogs': return initialContent.filter(c => c.type === 'blog_post');
      case 'news': return initialContent.filter(c => c.type === 'news_post');
      case 'quotes': return initialContent.filter(c => c.type === 'daily_quote');
      default: return [];
    }
  };

  const getLabels = () => {
    switch(contentTab) {
      case 'blogs': return 'Blog post';
      case 'news': return 'News item';
      case 'quotes': return 'Daily quote';
      default: return 'Item';
    }
  };

  const handleToggle = async (id: string, currentStatus: string) => {
    setIsPending(true);
    await toggleContentStatus(id, currentStatus);
    setIsPending(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this content?')) {
      setIsPending(true);
      await deleteContentRecord(id);
      setIsPending(false);
    }
  };

  return (
    <div className="view">
      <div className="view-header">
        <div>
          <h1>Content</h1>
          <p>What's shown on the public AI Pod website.</p>
        </div>
        <button className="btn btn-primary" onClick={() => alert('Opens the content editor.')}>
          + New {getLabels().toLowerCase()}
        </button>
      </div>
      
      <div className="tabs">
        <button className={`tab ${contentTab === 'blogs' ? 'active' : ''}`} onClick={() => setContentTab('blogs')}>Blog</button>
        <button className={`tab ${contentTab === 'news' ? 'active' : ''}`} onClick={() => setContentTab('news')}>News</button>
        <button className={`tab ${contentTab === 'quotes' ? 'active' : ''}`} onClick={() => setContentTab('quotes')}>Daily quotes</button>
        <button className={`tab ${contentTab === 'images' ? 'active' : ''}`} onClick={() => setContentTab('images')}>Images</button>
      </div>

      {contentTab === 'images' ? (
        <div className="card pad">
          <div className="empty">Image library — upload and manage images used across products, blog posts and news.</div>
        </div>
      ) : (
        <div className="card pad">
          {getTabData().map(item => (
            <div className="clist-row" key={item.id}>
              <div className="thumb">{contentTab === 'quotes' ? '❝' : '▤'}</div>
              <div>
                <div className="clist-title">{item.title}</div>
                <div className="clist-sub">{item.date}</div>
              </div>
              <span className={`pill pill-${item.status === 'published' ? 'published' : 'unpublished'}`}>
                {item.status}
              </span>
              <div className="clist-actions">
                <button className="btn btn-sm" onClick={() => alert('Opens the content editor.')} disabled={isPending}>Edit</button>
                <button className="btn btn-sm" onClick={() => handleToggle(item.id, item.status)} disabled={isPending}>
                  {item.status === 'published' ? 'Unpublish' : 'Publish'}
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)} disabled={isPending}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
