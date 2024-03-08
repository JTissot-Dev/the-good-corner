import { useEffect, useState } from "react";
import axios from "axios";
import { AdCardProps } from "@/components/AdCard/AdCard";
import { Category } from "@/components/Header/Header";
import { useRouter } from "next/router";


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
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get<Category[]>("http://localhost:4000/categories");
        setCategories(data);
      } catch (err) {
        console.error("error", err);
      }
      
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const {data} = await axios.get<AdCardProps>(`http://localhost:4000/ads/${router.query.id}`);
        setAd(data);
      } catch (err) {
        console.error("error", err);
      }

    };
    fetchData();
  
  }, [])

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
      await axios.put(`http://localhost:4000/ads/${ad.id}`, formJson)
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
      {categories.map(category => {
        return (
          <option  key={category.id} value={category.name}>
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