import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AdCardProps } from "@/components/AdCard/AdCard";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const GET_AD = gql`
  query Ad($id: Float!) {
    ad(id: $id) {
      id
      title
      picture
      price
      description
      owner
      createdAt
      location
      category {
        id
        name
      }
    }
  }
`;

const DEL_AD = gql`
  mutation DelAd($delAdId: Float!) {
    delAd(id: $delAdId) {
      id
    }
  }
`

const AdDetailComponent = () => {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_AD, {
    variables: { id: Number(router.query.id) }
  });

  const [delAd] = useMutation(DEL_AD, {
    variables: { delAdId: Number(router.query.id) },
    update(cache, { data: { delAd } }) {
      cache.modify({
        fields: {
          ads(existingAds = []) {
            return existingAds.filter(
              (adRef: any) => adRef.__ref !== `Ad:${delAd.id}`
            );
          }
        }
      });
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : { error.message }</p>;
  
  return (
    <>
      <h2 className="ad-details-title">{ data.ad.title }</h2>
      <section className="ad-details">
        <div className="ad-details-image-container">
          <img className="ad-details-image" src="/images/table.webp" />
        </div>
        <div className="ad-details-info">
          <div className="ad-details-price">{ data.ad.price } €</div>
          <div className="ad-details-description">
            { data.ad.description }
          </div>
          <hr className="separator" />
          <div className="ad-details-owner">
            Annoncée publiée par <b>{data.ad.owner}</b> le { data.ad.createdAt }.
          </div>
          <a
            href="mailto:serge@serge.com"
            className="button button-primary link-button"
            ><svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
              fill="none"
              stroke-width="2.5"
              stroke="currentcolor"
            >
              <path
                d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"
              ></path>
            </svg>
            Envoyer un email
          </a>
          <button
            onClick={async () => {
              await delAd();
              router.push("/");
            }}
            className="button button-danger"
          >
            Supprimer l'annonce
          </button>
        </div>
      </section>
    </>
  )
}

export default AdDetailComponent;