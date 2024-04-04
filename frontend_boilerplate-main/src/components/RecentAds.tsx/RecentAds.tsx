import styles from "./RecentAds.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import AdCard, { AdCardProps } from "../AdCard/AdCard";
import { gql, useQuery } from "@apollo/client";

const GET_ADS = gql`
  query Ads {
    ads {
      id
      title
      price
      picture
    }
  }
`;

const RecentAds = () => {

  const [total, setTotal] = useState(0);
  const { loading, error, data } = useQuery(GET_ADS);
  // const [ads, setAds] = useState<AdCardProps[]>([]);
  const router = useRouter();


  // useEffect(() => {
    
  //   const fetchData = async () => {
  //     try {
  //       let response;
  //       if (router.query.categories) {
  //         response = await axios.get<AdCardProps[]>(`http://localhost:4000/ads?category=${router.query.categories}`)
  //       } else if (router.query.title) {
  //         console.log('toto')
  //         response = await axios.get<AdCardProps[]>(`http://localhost:4000/ads?title=${router.query.title}`)
  //       } else {
  //         response = await axios.get<AdCardProps[]>("http://localhost:4000/ads");
  //       }
  //       setAds(response.data);
  //     } catch (err) {
  //       console.error("error", err);
  //     }
  //   };
  //   fetchData();
  // }, [router]);

  const handleUpdate = (adId: number) => {
    router.push(`/ad/update/${adId}`);
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : { error.message }</p>;
  console.log(data)
  return (
    <>
      <h2>Annonces récentes</h2>
      <p>prix total: {total} €</p>
      <section className={styles.recentAds}>
        {
          
          data.ads.map((ad: AdCardProps) => {
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
