import { Link } from 'react-router-dom';

export default function CipherCard({ cipher }) {
  const diffClass =
    cipher.difficulty === 'Dễ' ? 'easy' :
    cipher.difficulty === 'Trung bình' ? 'medium' : 'hard';

  return (
    <Link
      to={`/cipher/${cipher.id}`}
      className="cipher-card"
      style={{ '--card-accent': cipher.subcategoryColor || cipher.categoryColor }}
    >
      <span className="cipher-card-icon">{cipher.icon}</span>
      <div className="cipher-card-name">{cipher.name}</div>
      <div className="cipher-card-desc">{cipher.description}</div>
      <div className="cipher-card-footer">
        <span className={`difficulty-badge ${diffClass}`}>{cipher.difficulty}</span>
        <span className="card-arrow">→</span>
      </div>
    </Link>
  );
}
