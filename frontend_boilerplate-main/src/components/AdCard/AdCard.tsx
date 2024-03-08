import styles from './AdCard.module.css'
import Link from 'next/link';
import { Category } from '../Header/Header';

export type AdCardProps = {
  id: number,
  title: string;
  picture: string;
  price: number;
  description?: string;
  owner?: string;
  createdAt?: string;
  location?: string;
  category?: Category;
};


const AdCard: React.FC<AdCardProps> = ({
  id,
  title,
  picture,
  price,
}) => {
  return (
    <div className={styles.adCardContainer}>
      <Link className={styles.adCardLink} href={ `ad/${id}` }>
        <img className={styles.adCardImage} src={ picture } />
        <div className={styles.adCardText}>
          <div className={styles.adCardTitle}>{ title }</div>
          <div className="ad-card-price">{ price } €</div>
        </div>
      </Link>
    </div>
  )
};

export default AdCard;