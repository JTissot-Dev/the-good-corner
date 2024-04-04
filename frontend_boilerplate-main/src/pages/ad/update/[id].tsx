import { useEffect, useState } from "react";
import axios from "axios";
import { AdCardProps } from "@/components/AdCard/AdCard";
import { Category } from "@/components/Header/Header";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";

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

const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`;

const UP_AD = gql`
  mutation UpAd($updata: AdInput!, $upAdId: Float!) {
    upAd(data: $updata, id: $upAdId) {
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


const updateAd = () => {

  const router = useRouter();
  const [ad, setAd] = useState<AdCardProps>({
    id: 0,
    title: "",
    picture: "",
    price: 0,
    description: "",
    owner: "",
    createdAt: "",
    location: "",
    category: {
      id: 0,
      name: ""
    }
  });

  const { loading, error, data: dataAd } = useQuery(GET_AD, {
    variables: { id: Number(router.query.id) },
  });

  const { data: dataCategories } = useQuery(GET_CATEGORIES);
  const [upAd] = useMutation(UP_AD);

  useEffect(() => {
    if (dataAd) {
      setAd(dataAd.ad);
    }
  }, [dataAd]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : { error.message }</p>;

  const handleAd = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setAd({
      ...ad,
      [e.target.name]: e.target.value
    })
  };

  return (
    <form
    onSubmit={async e => {
      e.preventDefault();
      const form = e.target as HTMLFormElement
      const formData = new FormData(form as HTMLFormElement);
      const formJson = Object.fromEntries(formData.entries());

      const formMutationData = {
        title: formJson.title,
        description: formJson.description,
        owner: formJson.owner,
        price: Number(formJson.price),
        picture: formJson.picture,
        location: formJson.location,
        categoryName: formJson.category
      };

      await upAd({
        variables: {
          updata: formMutationData,
          upAdId: Number(ad.id)
        }
      });
      router.push("/");
    }}
  >
    <label>
      Titre de l&apos;annonce: <br />
      <input onChange={handleAd} value={ ad.title } type="text" className="text-field" name="title">
      </input>
    </label> <br />
    <label>
      description: <br />
      <textarea onChange={handleAd} value={ad.description} className="text-field" name="description">{ ad.description }</textarea>
      
    </label> <br />
    <label>
      Propriétaire: <br />
      <input onChange={handleAd} value={ ad.owner } type="email" className="text-field" name="owner">
      </input>
    </label> <br />
    <label>
      Prix: <br />
      <input onChange={handleAd} value={ ad.price } type="number" className="text-field" name="price">
      </input>
    </label> <br />
    <label>
      Image: <br />
      <input onChange={handleAd} value={ ad.picture } type="text" className="text-field" name="picture">
      </input>
    </label> <br />
    <label>
      Localisation: <br />
      <input onChange={handleAd} value={ ad.location } type="text" className="text-field" name="location">
      </input>
    </label>  <br />
    <select 
      onChange={handleAd}
      value={ad.category?.name}
      name="category"
    >
      {dataCategories && dataCategories.categories.map((category: any) => {
        return (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        )
      })}
    </select>
    <button type="submit" className="button">Submit</button>
  </form>  
  )
}

export default updateAd;