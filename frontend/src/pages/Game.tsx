import React from 'react';
import type { PlayerDTO } from '../dtos/player';
import { BASE_URL } from '.';
import { toast } from 'react-toastify';
import { useAuth } from '../auth/AuthContext';

const Game: React.FC = () => {
  const { user } = useAuth();
  const [players, setPlayers] = React.useState<PlayerDTO[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [userVote, setUserVote] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [playersRes, voteRes] = await Promise.all([
          fetch(`${BASE_URL}/players`),
          user ? fetch(`${BASE_URL}/players/vote/me`, { credentials: "include" }) : Promise.resolve(new Response(JSON.stringify({ ok: false }), { status: 400 }))
        ]);
        
        const playersData = await playersRes.json();
        setPlayers(playersData);
        if (voteRes.ok) {
          const voteData = await voteRes.json();
          setUserVote(voteData.playerId);
        }
      } catch (err) {
        toast.error("Грешка при зареждане на данните");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleVote = async (player: PlayerDTO) => {
    if (!user) return toast.error("Трябва да сте регистрирани, за да гласувате!");
    
    try {
      const response = await fetch(`${BASE_URL}/players/vote`, {
        credentials: "include",
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId: player.id, userId: user.id })
      });
      
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setUserVote(player.id);
      } else {
        toast.error(data.message || "Грешка при гласуване.");
      }
    } catch (err) {
      toast.error("Грешка при изпращане на гласа.");
    }
  };

  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.club.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <title>Игра: Играч на седмицата – FutBrain</title>
      <section className="hero section-header-no-border text-center flex-column">
        <h1 className="text-light-green">Играч на седмицата</h1>
        {userVote ? (
            <div className="alert alert-success">Вече гласувахте за: <strong>{players.find(p => p.id === userVote)?.name}</strong></div>
        ) : (
            <p className="max-w-700 mt-15 mb-0">Гласувай за играча, който според теб се е представил най-добре през изминалата седмица. Ако твоят избор съвпадне с масовото мнение на общността, ще получиш <strong>FutCoins</strong> като награда в понеделник сутрин!</p>
        )}
      </section>

      <div className="search-box mb-10 w-full">
        <input 
          type="text" 
          placeholder="Търси играчи по име или отбор..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button"><i className="fas fa-search"></i></button>
      </div>

      <section className="popular-players bg-none p-0">
        <div className="players-grid">
          {isLoading ? (
            <p className="text-white text-center w-full">Зареждане...</p>
          ) : filteredPlayers.length > 0 ? (
            filteredPlayers.map(player => (
              <div key={player.id} className="player-card">
                <div className="player-img-container">
                  <img 
                    src={player.playerImg ? `${BASE_URL}/players/${player.id}.webp` : '/img/logo.png'} 
                    alt={player.name} 
                    onError={(e) => { (e.target as HTMLImageElement).src = '/img/logo.png'; }}
                  />
                </div>
                <h4>{player.name}</h4>
                <p>{player.club}</p>
                <button 
                  className="btn-register btn-full mt-15"
                  disabled={!!userVote}
                  onClick={() => handleVote(player)}
                >
                  {userVote === player.id ? 'Гласувано' : 'Гласувай'}
                </button>
              </div>
            ))
          ) : (
            <p className="no-results-msg">Няма намерени играчи.</p>
          )}
        </div>
      </section>

      <section className="latest-posts mt-40">
        <h3>Как работи играта?</h3>
        <ul className="game-rules-list">
          <li>Гласуването е отворено до неделя вечер.</li>
          <li>Всеки регистриран потребител има право на един глас.</li>
          <li>Резултатите се изчисляват автоматично в понеделник.</li>
          <li>Наградите варират спрямо трудността на прогнозата.</li>
        </ul>
      </section>
    </>
  );
};

export default Game;
