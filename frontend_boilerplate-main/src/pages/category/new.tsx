import axios from "axios";


const newCategory: React.FC = () => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const form = e.target as HTMLFormElement
        const formData = new FormData(form as HTMLFormElement);
        const formJson = Object.fromEntries(formData.entries());
        axios.post("http://localhost:4000/categories", formJson)
        form.reset();
      }}
    >
      <label>
        Nom de la catégorie: <br />
        <input type="text" className="text-field" name="name">
        </input>
      </label> <br />
      <button type="submit" className="button">Créer</button>
    </form>
  )
}

export default newCategory;