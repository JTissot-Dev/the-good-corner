import { useState, useEffect } from "react";
import axios from "axios";
import { Category } from "@/components/Header/Header";
import { gql, useQuery, useMutation } from "@apollo/client";

const ADD_AD = gql`
  mutation addAd($data: AdInput!) {
    addAd(data: $data) {
      id
      title
      price
      picture
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

const newAd = () => {

  const { data } = useQuery(GET_CATEGORIES);
  const [addAd] = useMutation(ADD_AD, {
    update(cache, { data: { addAd } }) {
      cache.modify({
        fields: {
          ads(existingAds = []) {
            const newAdRef = cache.writeFragment({
              data: addAd,
              fragment: gql`
                fragment NewAd on Ads {
                  id
                  title
                  price
                  picture
                }
              `
            });
            return [...existingAds, newAdRef];
          }
        }
      });
    }
  });

  return (
    <form
      onSubmit={e => {
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
        addAd({
          variables: {
            data: formMutationData
          }
        });
        form.reset();
      }}
    >
      <label>
        Titre de l&apos;annonce: <br />
        <input type="text" className="text-field" name="title">
        </input>
      </label> <br />
      <label>
        description: <br />
        <textarea className="text-field" name="description">
        </textarea>
      </label> <br />
      <label>
        Propriétaire: <br />
        <input type="email" className="text-field" name="owner">
        </input>
      </label> <br />
      <label>
        Prix: <br />
        <input type="number" className="text-field" name="price">
        </input>
      </label> <br />
      <label>
        Image: <br />
        <input type="text" className="text-field" name="picture">
        </input>
      </label> <br />
      <label>
        Localisation: <br />
        <input type="text" className="text-field" name="location">
        </input>
      </label>  <br />
      <select name="category">
        {data && data.categories.map((category: any) => {
          return (
            <option  key={category.id} value={category.name}>
              {category.name}
            </option>
          )
        })}
      </select>
      {/* <label>
        Tags: <br />
        <input type="text" className="text-field" name="tags">
        </input>
      </label>  <br /> */}
      <button type="submit" className="button">Submit</button>
    </form>  
  )
}

export default newAd;