import React from 'react';
import type { AccessoryDTO } from '../dtos/accessory';
import { BASE_URL } from '.';
import { toast } from 'react-toastify';

const Store: React.FC = () => {
  const [accessories, setAccessories] = React.useState<AccessoryDTO[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('Всички');

  React.useEffect(() => {
    fetch(`${BASE_URL}/accessories`)
      .then(res => res.json())
      .then(data => {
        setAccessories(data);
        setIsLoading(false);
        console.log(data);
      })
      .catch(err => {
        toast.error("Грешка при зареждане на аксесоарите");
        setIsLoading(false);
      });
  }, []);

  const getTypeName = (type: number) => {
    switch(type) {
      case 1: return 'Топка';
      case 2: return 'Значка';
      case 3: return 'Обувки';
      default: return 'Аксесоар';
    }
  };

  const getIcon = (type: number) => {
    switch(type) {
      case 0: return 'fas fa-image';
      case 1: return 'fas fa-magic';
      case 2: return 'fas fa-shield-halved';
      default: return 'fas fa-box';
    }
  };

  const filteredAccessories = accessories.filter(acc => {
    const matchesSearch = acc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'Всички' || getTypeName(acc.type) + 'и' === activeFilter || (getTypeName(acc.type) === 'Значка' && activeFilter === 'Значки');
    // Simplified filter logic for the demonstration labels
    if (activeFilter === 'Всички') return matchesSearch;
    if (activeFilter === 'Банери') return matchesSearch && acc.type === 0;
    if (activeFilter === 'Ефекти') return matchesSearch && acc.type === 1;
    if (activeFilter === 'Значки') return matchesSearch && acc.type === 2;
    return matchesSearch;
  });

  return (
    <>
      <title>Магазин за аксесоари – FutBrain</title>
      <section className="section-header section-header-no-border">
        <h1 className="text-light-green">Магазин за аксесоари</h1>
        <p className="text-light-green">Персонализирай своя профил с уникални банери и ефекти.</p>
      </section>

      <div className="search-box mb-10 w-full">
        <input 
          type="text" 
          placeholder="Търси аксесоари по име..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button"><i className="fas fa-search"></i></button>
      </div>

      <div className="filters">
        {['Всички', 'Банери', 'Ефекти', 'Значки'].map(filter => (
          <button 
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="store-grid">
        {isLoading ? (
          <p className="text-white">Зареждане...</p>
        ) : filteredAccessories.length > 0 ? (
          filteredAccessories.map(acc => (
            <div key={acc.id} className="item-card">
              <div className={`item-preview ${acc.type === 1 ? 'item-preview-gradient' : ''}`}>
                {acc.photo ? (
                   <img src={`${BASE_URL}/accessories/${acc.id}.webp`} alt={acc.name} style={{maxWidth: '100%', maxHeight: '100%'}} />
                ) : (
                  <i className={`${getIcon(acc.type)} ${acc.type === 1 ? 'text-white' : ''}`}></i>
                )}
                <span className="item-tag">{getTypeName(acc.type)}</span>
              </div>
              <div className="item-info">
                <h3>{acc.name}</h3>
                <p>Ексклузивен {getTypeName(acc.type).toLowerCase()} за твоя профил.</p>
                <span className="item-price">{acc.price.toLocaleString()} FC</span>
                <button className="btn-buy">Купи сега</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results-msg">Няма намерени аксесоари.</p>
        )}
      </div>
    </>
  );
};

export default Store;
