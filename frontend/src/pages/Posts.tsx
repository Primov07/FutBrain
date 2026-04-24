import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { PostDTO } from '../dtos/post';
import type { CommentDTO } from '../dtos/comment';
import type { ReplyDTO } from '../dtos/reply';
import { BASE_URL } from '.';
import { toast } from "react-toastify";
import { useAuth } from '../auth/AuthContext';

const CommentSection: React.FC<{ postId: string }> = ({ postId }) => {
  const { user } = useAuth();
  const [comments, setComments] = React.useState<CommentDTO[]>([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const navigate = useNavigate();

  const fetchComments = async (pageNum: number) => {
    try {
      const response = await fetch(`${BASE_URL}/comments/post/${postId}?page=${pageNum}`);
      const data: CommentDTO[] = await response.json();
      if (data.length < 5) setHasMore(false);
      setComments((prev) => {
        const newComments = pageNum === 1 ? data : [...prev, ...data];
        return newComments;
      });
    } catch (err) {
      toast.error("Грешка при зареждане на коментарите");
    }
  };

  const handleLikeComment = async (commentId: string) => {
    if (!user) return toast.error("Трябва да сте влезли в профила си!");
    try {
      const response = await fetch(`${BASE_URL}/comments/like`, {
        credentials: "include",
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId, userId: user.id })
      });
      if (response.ok) {
        setComments(prev => prev.map(c => {
          if (c.id === commentId) {
            const isLiked = c.likedBy.includes(user.id);
            return {
              ...c,
              likedBy: isLiked ? c.likedBy.filter(id => id !== user.id) : [...c.likedBy, user.id]
            };
          }
          return c;
        }));
      }
    } catch (err) {
      toast.error("Грешка при харесване");
    }
  };

  React.useEffect(() => {
    fetchComments(page);
  }, [page, postId]);

  return (
    <div className="comments-section active">
      <div className="section-header">
        <h4 className="text-primary-blue">Коментари</h4>
        <button className="btn-action" onClick={() => navigate(`/post/${postId}`)}>
           Добави коментар
        </button>
      </div>
      
      {comments.map((comment) => {
        const isLiked = user ? comment.likedBy.includes(user.id) : false;
        return (
          <div key={comment.id} className="comment-item">
            <div className="comment-header">
               <div className="comment-user-info">
                 <img 
                   src={comment.user.pictureURL?.startsWith('http') ? comment.user.pictureURL : `${BASE_URL}/user.png`} 
                   alt={comment.user.username} 
                   className="comment-avatar"
                   onError={(e) => { (e.target as HTMLImageElement).src = '/img/logo.png'; }}
                 />
                 <span className="comment-username">{comment.user.username}</span>
               </div>
               <span className="comment-date">
                 {new Date(comment.publishDate).toLocaleDateString('bg-BG')}
               </span>
            </div>
            <p className="comment-text">{comment.content}</p>
            <div className="comment-footer" style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
              <span 
                onClick={() => handleLikeComment(comment.id)} 
                style={{ cursor: 'pointer', fontSize: '0.9rem', color: isLiked ? 'var(--primary-blue)' : 'inherit', fontWeight: isLiked ? 'bold' : 'normal' }}
              >
                <i className={`${isLiked ? 'fas' : 'far'} fa-thumbs-up`}></i> {comment.likedBy.length}
              </span>
            </div>
            <ReplySection commentId={comment.id} postId={postId} />
          </div>
        );
      })}
      {hasMore && <button className="btn-action mt-15" onClick={() => setPage(p => p + 1)}>Още коментари</button>}
    </div>
  );
};

const ReplySection: React.FC<{ commentId: string; postId: string }> = ({ commentId, postId }) => {
  const { user } = useAuth();
  const [replies, setReplies] = React.useState<ReplyDTO[]>([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();

  const fetchReplies = async (pageNum: number) => {
    try {
      const response = await fetch(`${BASE_URL}/replies/comment/${commentId}?page=${pageNum}`);
      const data: ReplyDTO[] = await response.json();
      if (data.length < 5) setHasMore(false);
      setReplies((prev) => pageNum === 1 ? data : [...prev, ...data]);
    } catch (err) {
      toast.error("Грешка при зареждане на отговорите");
    }
  };

  const handleLikeReply = async (replyId: string) => {
    if (!user) return toast.error("Трябва да сте влезли в профила си!");
    try {
      const response = await fetch(`${BASE_URL}/replies/like`, {
        credentials: "include",
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyId, userId: user.id })
      });
      if (response.ok) {
        setReplies(prev => prev.map(r => {
          if (r.id === replyId) {
            const isLiked = r.likedBy.includes(user.id);
            return {
              ...r,
              likedBy: isLiked ? r.likedBy.filter(id => id !== user.id) : [...r.likedBy, user.id]
            };
          }
          return r;
        }));
      }
    } catch (err) {
      toast.error("Грешка при харесване");
    }
  };

  const toggle = () => {
    if (!show && replies.length === 0) fetchReplies(1);
    setShow(!show);
  };

  return (
    <div className="replies-section">
      <div className="reply-actions">
        <button className="btn-toggle-comments" onClick={toggle}>
          <i className="far fa-comment"></i> Отговори ({replies.length})
        </button>
        <button className="btn-toggle-comments" onClick={() => navigate(`/post/${postId}?replyTo=${commentId}`)}>
           <i className="fas fa-reply"></i>
        </button>
      </div>
      
      {show && (
        <div className="replies-list" style={{ marginLeft: '20px', borderLeft: '1px solid #ddd', paddingLeft: '10px' }}>
          {replies.map((reply) => {
            const isLiked = user ? reply.likedBy.includes(user.id) : false;
            return (
              <div key={reply.id} className="reply-item mb-10">
                 <p className="comment-text" style={{ fontSize: '0.85rem' }}>{reply.content}</p>
                 <div className="reply-footer" style={{ display: 'flex', gap: '15px' }}>
                    <span 
                      onClick={() => handleLikeReply(reply.id)} 
                      style={{ cursor: 'pointer', fontSize: '0.75rem', color: isLiked ? 'var(--primary-blue)' : 'inherit', fontWeight: isLiked ? 'bold' : 'normal' }}
                    >
                      <i className={`${isLiked ? 'fas' : 'far'} fa-thumbs-up`}></i> {reply.likedBy.length}
                    </span>
                 </div>
              </div>
            );
          })}
          {hasMore && <button className="btn-action" onClick={() => setPage(p => p + 1)}>Още отговори</button>}
        </div>
      )}
    </div>
  );
};

const Posts: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = React.useState<PostDTO[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [showComments, setShowComments] = React.useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  const postsUrl = `${BASE_URL}/posts`;

  React.useEffect(() => {
    fetch(postsUrl)
      .then((response) => response.json())
      .then((data: PostDTO[]) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((err) => toast.error((err as any).message));
  }, []);

  const handleLikePost = async (postId: string) => {
    if (!user) return toast.error("Трябва да сте влезли в профила си!");
    try {
      const response = await fetch(`${BASE_URL}/posts/like`, {
        credentials: "include",
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, userId: user.id })
      });
      if (response.ok) {
        setPosts(prev => prev.map(p => {
          if (p.id === postId) {
            const isLiked = p.likedBy.includes(user.id);
            return {
              ...p,
              likedBy: isLiked ? p.likedBy.filter(id => id !== user.id) : [...p.likedBy, user.id]
            };
          }
          return p;
        }));
      }
    } catch (err) {
      toast.error("Грешка при харесване");
    }
  };

  const toggleComments = (postId: string) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <title>Публикации – FutBrain</title>
      <section className="section-header section-header-no-border mb-0">
        <div className="header-with-action">
          <h1 className="text-light-green">Всички публикации</h1>
          {user && (
            <Link to="/posts/add" className="btn-create-post">
              <i className="fas fa-plus-circle"></i> Създай публикация
            </Link>
          )}
        </div>
      </section>

      <div className="search-box mb-10 w-full">
        <input 
          type="text" 
          placeholder="Търси в публикациите..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button"><i className="fas fa-search"></i></button>
      </div>

      <div className="posts-grid">
        {isLoading ? (
          <div className="admin-content">Зареждане...</div>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
            const isLiked = user ? post.likedBy.includes(user.id) : false;
            return (
              <article key={post.id} className="post-card">
                <div className="post-header" onClick={() => navigate(`/post/${post.id}`)} style={{ cursor: 'pointer' }}>
                  <img 
                    src={post.user.pictureURL?.startsWith('http') ? post.user.pictureURL : `${BASE_URL}/user.png`} 
                    alt={post.user.username} 
                    className="user-avatar"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/img/logo.png'; }}
                  />
                  <Link to={`/profile/${post.user.username}`} className="user-name">{post.user.username}</Link>
                  <span className="post-date">{new Date(post.publishDate).toLocaleDateString('bg-BG')}</span>
                </div>
                <div className="post-body" onClick={() => navigate(`/post/${post.id}`)} style={{ cursor: 'pointer' }}>
                  <h3 className="text-primary-blue mb-10">{post.title}</h3>
                  <p>{post.content.length > 200 ? post.content.substring(0, 200) + '...' : post.content}</p>
                </div>
                <div className="post-footer">
                  <span 
                    onClick={(e) => { e.stopPropagation(); handleLikePost(post.id); }} 
                    style={{ cursor: 'pointer', color: isLiked ? 'var(--primary-blue)' : 'inherit', fontWeight: isLiked ? 'bold' : 'normal' }}
                  >
                    <i className={`${isLiked ? 'fas' : 'far'} fa-thumbs-up`}></i> {post.likedBy.length} харесвания
                  </span>
                  <button className="btn-toggle-comments" onClick={() => toggleComments(post.id)}>
                    <i className="far fa-comment"></i> {post.comments.length} коментара
                  </button>
                  {user?.id === post.user.id && (
                    <Link to={`/post/update/${post.id}`} className="btn-edit-header" title="Редактирай" onClick={(e) => e.stopPropagation()}>
                      <i className="fas fa-edit"></i>
                    </Link>
                  )}
                  <Link to={`/post/${post.id}`} className="view-all" style={{ fontSize: '0.9rem' }} onClick={(e) => e.stopPropagation()}>
                    Виж целия пост <i className="fas fa-external-link-alt"></i>
                  </Link>
                </div>
                {showComments[post.id] && <CommentSection postId={post.id} />}
              </article>
            );
          })
        ) : (
          <p className="no-results-msg">Няма намерени публикации.</p>
        )}
      </div>
    </>
  );
};

export default Posts;
