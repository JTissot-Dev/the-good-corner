import styles from './AdCard.module.css'

export type AdCardProps = {
  title: string;
  imgUrl: string;
  price: number;
  link: string;
};


const AdCard: React.FC<AdCardProps> = ({
  title,
  imgUrl,
  price,
  link
}) => {
  return (
    <div className={styles.adCardContainer}>
      <a className={styles.adCardLink} href={ link }>
        <img className={styles.adCardImage} src={ imgUrl } />
        <div className={styles.adCardText}>
          <div className={styles.adCardTitle}>{ title }</div>
          <div className="ad-card-price">{ price } €</div>
        </div>
      </a>
    </div>
  )
};

export default AdCard;