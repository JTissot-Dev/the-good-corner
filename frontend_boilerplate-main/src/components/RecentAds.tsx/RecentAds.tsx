import styles from "./RecentAds.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import AdCard, { AdCardProps } from "../AdCard/AdCard";

// const ads: AdCardProps[] = [
//   {
//     id: 1,
//     imgUrl: "/images/table.webp",
//     link: "/ads/table",
//     price: 120,
//     title: "Table",
//   },
//   {
//     id: 2,
//     imgUrl: "/images/dame-jeanne.webp",
//     link: "/ads/vide-poche",
//     price: 75,
//     title: "Dame-jeanne",
//   },
//   {
//     id: 3,
//     imgUrl: "/images/vide-poche.webp",
//     link: "/ads/vide-poche",
//     price: 4,
//     title: "Vide-poche",
//   },
//   {
//     id: 4,
//     imgUrl: "/images/vaisselier.webp",
//     link: "/ads/vaisselier",
//     price: 900,
//     title: "Vaisselier",
//   },
//   {
//     id: 5,
//     imgUrl: "/images/bougie.webp",
//     link: "/ads/bougie",
//     price: 8,
//     title: "Bougie",
//   },
//   {
//     id: 6,
//     imgUrl: "/images/porte-magazine.webp",
//     link: "/ads/porte-magazine",
//     price: 45,
//     title: "Porte-magazine",
//   },
// ]


const RecentAds = () => {

  const [total, setTotal] = useState(0);
  const [ads, setAds] = useState<AdCardProps[]>([]);
  const router = useRouter();


  useEffect(() => {
    
    const fetchData = async () => {
      try {
        let response;
        if (router.query.categories) {
          response = await axios.get<AdCardProps[]>(`http://localhost:4000/ads?category=${router.query.categories}`)
        } else if (router.query.title) {
          console.log('toto')
          response = await axios.get<AdCardProps[]>(`http://localhost:4000/ads?title=${router.query.title}`)
        } else {
          response = await axios.get<AdCardProps[]>("http://localhost:4000/ads");
        }
        setAds(response.data);
      } catch (err) {
        console.error("error", err);
      }
    };
    fetchData();
  }, [router]);

  const handleUpdate = (adId: number) => {
    router.push(`/ad/update/${adId}`);
  };

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>prix total: {total} €</p>
      <section className={styles.recentAds}>
        {
          ads.map(ad => {
            return (
              <div key={ad.id}>
                <AdCard
                  id={ad.id}
                  picture={ad.picture}
                  price={ad.price}
                  title={ad.title}
                />
                <div className={styles.buttonContainer}>
                  <button 
                    className={styles.button}
                    onClick={() => setTotal(total + ad.price)}
                  >
                    Add price to total
                  </button>
                  <button 
                    className={styles.button}
                    onClick={() => handleUpdate(ad.id)}
                  >
                    Update
                  </button>

                </div>

              </div>
            )
          })
        }
      </section>
    </>
  )
}

export default RecentAds;
