import styles from "./RecentAds.module.css";
import AdCard, { AdCardProps } from "../AdCard/AdCard";

const ads: AdCardProps[] = [
  {
    imgUrl: "/images/table.webp",
    link: "/ads/table",
    price: 120,
    title: "Table",
  },
  {
    imgUrl: "/images/dame-jeanne.webp",
    link: "/ads/vide-poche",
    price: 75,
    title: "Dame-jeanne",
  },
  {
    imgUrl: "/images/vide-poche.webp",
    link: "/ads/vide-poche",
    price: 4,
    title: "Vide-poche",
  },
  {
    imgUrl: "/images/vaisselier.webp",
    link: "/ads/vaisselier",
    price: 900,
    title: "Vaisselier",
  },
  {
    imgUrl: "/images/bougie.webp",
    link: "/ads/bougie",
    price: 8,
    title: "Bougie",
  },
  {
    imgUrl: "/images/porte-magazine.webp",
    link: "/ads/porte-magazine",
    price: 45,
    title: "Porte-magazine",
  },
]


const RecentAds = () => {
  return (
    <>
      <h2>Annonces récentes</h2>
      <section className={styles.recentAds}>
        {
          ads.map(ad => {
            return (
              <AdCard
                key={ad.title}
                imgUrl={ad.imgUrl}
                link={ad.link}
                price={ad.price}
                title={ad.title}
              />
            )
          })
        }
      </section>
    </>
  )
}

export default RecentAds;
