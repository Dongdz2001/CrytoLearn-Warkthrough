import { cipherCategories } from '../data/ciphers';
import CipherCard from '../components/CipherCard';

export default function Home() {
  return (
    <div className="page-container">
      <div className="page-header fade-in">
        <h1 className="page-title">🔐 Cryptography Learning</h1>

        <p className="page-subtitle">
          Học lý thuyết, thực hành mã hóa & giải mã, và thử thách bản thân với trò chơi đoán thuật toán.
        </p>
      </div>

      {cipherCategories.map((category) => (
        <div key={category.id} className="category-section fade-in">

          {category.subcategories.map((sub) => (
            <div key={sub.id}>
              <div
                className="subcategory-label"
                style={{ color: sub.color, borderLeft: `3px solid ${sub.color}` }}
              >
                {sub.name}
              </div>
              <div className="cipher-grid">
                {sub.ciphers.map((cipher) => (
                  <CipherCard
                    key={cipher.id}
                    cipher={{
                      ...cipher,
                      categoryColor: category.color,
                      subcategoryColor: sub.color,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
