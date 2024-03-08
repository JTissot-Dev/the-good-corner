import { useState, useEffect } from "react";
import axios from "axios";
import { Category } from "@/components/Header/Header";


const newAd = () => {

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get<Category[]>("http://localhost:4000/categories");
        console.log(data)
        setCategories(data);
      } catch (err) {
        console.error("error", err);
      }
      
    };
    fetchData();
  }, []);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const form = e.target as HTMLFormElement
        const formData = new FormData(form as HTMLFormElement);
        const formJson = Object.fromEntries(formData.entries());
        axios.post("http://localhost:4000/ads", formJson)
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
        {categories.map(category => {
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