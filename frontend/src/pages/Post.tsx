import React from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import type { PostDTO } from '../dtos/post';
import type { CommentDTO } from '../dtos/comment';
import type { ReplyDTO } from '../dtos/reply';
import { BASE_URL } from '.';
import { toast } from "react-toastify";
import { useAuth } from '../auth/AuthContext';

const CommentSection: React.FC<{ postId: string }> = ({ postId }) => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const replyToId = searchParams.get('replyTo');
  
  const [comments, setComments] = React.useState<CommentDTO[]>([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  const [content, setContent] = React.useState('');
  const [targetComment, setTargetComment] = React.useState<CommentDTO | null>(null);

  const fetchComments = async (pageNum: number) => {
    try {
      const response = await fetch(`${BASE_URL}/comments/post/${postId}?page=${pageNum}`);
      const data: CommentDTO[] = await response.json();
      
      if (data.length < 5) setHasMore(false);
      
      setComments((prev) => {
        // Филтрираме коментарите, за да не се дублира target коментара, ако случайно е на същата страница
        const filteredData = replyToId ? data.filter(c => c.id !== replyToId) : data;
        return pageNum === 1 ? filteredData : [...prev, ...filteredData];
      });
    } catch (err) {
      toast.error("Грешка при зареждане на коментарите");
    }
  };

  // Специален ефект за извличане на целевия коментар (ReplyTo)
  React.useEffect(() => {
    const fetchTargetComment = async () => {
      if (!replyToId) return;
      try {
        const response = await fetch(`${BASE_URL}/comments/${replyToId}`);
        if (response.ok) {
          const data: CommentDTO = await response.json();
          setTargetComment(data);
        }
      } catch (err) {
        console.error("Грешка при извличане на целевия коментар");
      }
    };

    fetchTargetComment();
  }, [replyToId]);

  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Трябва да сте регистрирани!");
    try {
      const response = await fetch(`${BASE_URL}/comments`, {
        credentials: "include",
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, user: user.id, post: postId })
      });
      if (response.ok) {
        toast.success("Коментарът е добавен!");
        setContent('');
        setShowForm(false);
        setComments([]);
        setTargetComment(null); // Нулираме target коментара при нов общ коментар
        setPage(1);
        fetchComments(1);
      }
      else toast.error("Грешка при коментиране.");
    } catch (err) {
      toast.error("Грешка при добавяне");
    }
  };

  React.useEffect(() => {
    fetchComments(page);
  }, [page, postId]);

  // Обединяваме target коментара с останалите
  const allComments = targetComment ? [targetComment, ...comments] : comments;

  return (
    <div className="comments-section active">
      <div className="section-header">
        <h3>Коментари</h3>
        {user && (
          <button className="btn-action" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Откажи' : 'Добави коментар'}
          </button>
        )}
      </div>
      
      {showForm && (
        <form className="comment-form" onSubmit={handleCreateComment}>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Напиши коментар..."
            required 
          />
          <button className="btn-action" type="submit">Изпрати</button>
        </form>
      )}
      
      <div className="comments-list">
        {allComments.map((comment) => (
          <div key={comment.id} className={`comment-item ${replyToId === comment.id ? 'highlighted-comment' : ''}`}>
            <div className="comment-header">
               <div className="comment-user-info">
                 <img 
                   src={comment.user.pictureURL?.startsWith('http') ? comment.user.pictureURL : `${BASE_URL}/uploads/user.png`} 
                   alt={comment.user.username} 
                   className="comment-avatar"
                   onError={(e) => { (e.target as HTMLImageElement).src = '/img/logo.png'; }}
                 />
                 <span className="comment-username" style={{ marginRight: '15px' }}>{comment.user.username}</span>
               </div>
               <span className="comment-date">
                 {new Date(comment.publishDate).toLocaleDateString('bg-BG')}
               </span>
            </div>
            <p className="comment-text">{comment.content}</p>
            <ReplySection commentId={comment.id} autoOpen={replyToId === comment.id} />
          </div>
        ))}
      </div>
      {hasMore && <button className="btn-action mt-15" onClick={() => setPage(p => p + 1)}>Още коментари</button>}
    </div>
  );
};

const ReplySection: React.FC<{ commentId: string; autoOpen?: boolean }> = ({ commentId, autoOpen }) => {
  const { user } = useAuth();
  const [replies, setReplies] = React.useState<ReplyDTO[]>([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [show, setShow] = React.useState(false);
  const [showForm, setShowForm] = React.useState(autoOpen || false);
  const [content, setContent] = React.useState('');

  React.useEffect(() => {
    if (autoOpen) {
      setShowForm(true);
      setShow(true); 
      if (replies.length === 0) {
        fetchReplies(1);
      }
    }
  }, [autoOpen]);

  const fetchReplies = async (pageNum: number) => {
    try {
      const response = await fetch(`${BASE_URL}/replies/comment/${commentId}?page=${pageNum}`);
      const data: ReplyDTO[] = await response.json();
      if (data.length <= 5) setHasMore(false);
      setReplies((prev) => pageNum === 1 ? data : [...prev, ...data]);
    } catch (err) {
      toast.error("Грешка при зареждане на отговорите");
    }
  };

  const handleCreateReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Трябва да сте регистрирани!");
    try {
      const response = await fetch(`${BASE_URL}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, user: user.id, comment: commentId })
      });
      if (response.ok) {
        toast.success("Отговорът е добавен!");
        setContent('');
        setShowForm(false);
        setReplies([]);
        setPage(1);
        fetchReplies(1);
      }
    } catch (err) {
      toast.error("Грешка при добавяне");
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
          <i className="far fa-comment"></i> Отговори
        </button>
        {user && (
          <button className="btn-toggle-comments" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Откажи' : <i className="fas fa-reply"></i>}
          </button>
        )}
      </div>
      
      {showForm && (
        <form className="comment-form" onSubmit={handleCreateReply}>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Напиши отговор..."
            required 
          />
          <button className="btn-action" type="submit">Изпрати</button>
        </form>
      )}
      
      {show && (
        <div className="replies-list" style={{ marginLeft: '20px', borderLeft: '2px solid #eee', paddingLeft: '15px' }}>
          {replies.map((reply) => (
            <div key={reply.id} className="reply-item mb-15">
               <div className="comment-header">
                 <div className="comment-user-info">
                   <img 
                     src={reply.user.pictureURL?.startsWith('http') ? reply.user.pictureURL : `${BASE_URL}/uploads/user.png`} 
                     alt={reply.user.username} 
                     className="comment-avatar"
                     style={{ width: '25px', height: '25px' }}
                     onError={(e) => { (e.target as HTMLImageElement).src = '/img/logo.png'; }}
                   />
                   <span className="comment-username" style={{ fontSize: '0.85rem', marginRight: '10px' }}>{reply.user.username}</span>
                 </div>
                 <span className="comment-date" style={{ fontSize: '0.75rem' }}>
                   {new Date(reply.publishDate).toLocaleDateString('bg-BG')}
                 </span>
               </div>
               <p className="comment-text" style={{ fontSize: '0.85rem' }}>{reply.content}</p>
            </div>
          ))}
          {hasMore && <button className="btn-action" onClick={() => setPage(p => p + 1)}>Още отговори</button>}
        </div>
      )}
    </div>
  );
};

const Post: React.FC = () => {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = React.useState<PostDTO | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!id) return;
    
    fetch(`${BASE_URL}/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setIsLoading(false);
      })
      .catch(err => {
        toast.error("Грешка при зареждане на публикацията");
        navigate('/posts');
      });
  }, [id, navigate]);

  if (isLoading) return <div className="admin-content">Зареждане...</div>;
  if (!post) return <div className="admin-content">Публикацията не е намерена.</div>;

  return (
    <div className="profile-container">
      <article className="post-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="post-header">
          <img 
            src={post.user.pictureURL?.startsWith('http') ? post.user.pictureURL : `${BASE_URL}/uploads/user.png`} 
            alt={post.user.username} 
            className="user-avatar"
            onError={(e) => { (e.target as HTMLImageElement).src = '/img/logo.png'; }}
          />
          <div className="user-info">
            <span className="user-name" style={{ fontSize: '1.1rem', marginRight: '20px' }}>{post.user.username}</span>
            <span className="post-date">{new Date(post.publishDate).toLocaleDateString('bg-BG')}</span>
          </div>
        </div>
        
        <div className="post-body">
          <h3 className="text-primary-blue mb-10">{post.title}</h3>
          <p>{post.content}</p>
        </div>
        
        <div className="post-footer">
          <span><i className="far fa-thumbs-up"></i> {post.likedBy.length} харесвания</span>
          <span><i className="far fa-comment"></i> {post.comments.length} коментара</span>
          {user?.id === post.user.id && (
            <Link to={`/post/update/${post.id}`} className="btn-edit-header" title="Редактирай" style={{ marginLeft: '15px', color: 'var(--primary-blue)' }}>
              <i className="fas fa-edit"></i> Редактирай
            </Link>
          )}
        </div>

        <CommentSection postId={post.id} />
      </article>
      
      <div className="text-center mt-40">
        <button className="btn-cancel" onClick={() => navigate('/posts')}>Назад към всички публикации</button>
      </div>
    </div>
  );
};

export default Post;
