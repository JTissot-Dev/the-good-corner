import styles from './Header.module.css';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

// const categories = [
//   {
//     title: "Ameublement",
//     link: "/categories/ameublement",
//   },
//   {
//     title: "Electroménager",
//     link: "/categories/electroménager",
//   },
//   {
//     title: "Photographie",
//     link: "/categories/photographie",
//   },
//   {
//     title: "Informatique",
//     link: "/categories/informatique",
//   },
//   {
//     title: "Téléphonie",
//     link: "/categories/téléphonie",
//   },
//   {
//     title: "Vélos",
//     link: "/categories/velos",
//   },
//   {
//     title: "Véhicules",
//     link: "/categories/véhicules",
//   },
//   {
//     title: "Sport",
//     link: "/categories/sport",
//   },
//   {
//     title: "Habillement",
//     link: "/categories/habilllement",
//   },
//   {
//     title: "Bébé",
//     link: "/categories/bébé",
//   },
//   {
//     title: "Outillage",
//     link: "/categories/outillage",
//   },
//   {
//     title: "Services",
//     link: "/categories/services",
//   },
//   {
//     title: "Vacances",
//     link: "/categories/vacances",
//   },
// ];

export type Category = {
  id: number,
  name: string,
};

const Header = () => {

  const [categories, setCategories] = useState<Category[]>([]);
  // const [searchTitle, setSearchTitle] = useState<string>("");
  const router = useRouter();

  // const handleSearchTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTitle(e.target.value);
  // };

  const titleRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    console.log(titleRef.current?.value);
    router.push(`/ad/search?title=${titleRef.current?.value}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get<Category[]>("http://localhost:4000/categories");
        setCategories(data);
      } catch (err) {
        console.error("error", err);
      }
    }
    fetchData();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.mainMenu}>
        <h1>
          <Link href="/" className={`${styles.button} ${styles.logo} ${styles.linkButton}`}
            ><span className={styles.mobileShortLabel}>TGC</span
            ><span className={styles.desktopLongLabel}>THE GOOD CORNER</span>
          </Link>
        </h1>
        <form className={styles.textFieldWithButton}>
          <input 
            ref={titleRef}
            className={`${styles.textField} ${styles.mainSearchField}`} 
            type="search" 
          />
          <button 
            type="button"
            className={`${styles.button} ${styles.buttonPrimary}`}
            onClick={handleSearch}
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-50 -50 530 550"
              transform="scale(-1,1)"
              fill="currentColor"
              xmlSpace="preserve"
              className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
            >
              <path
                d="m464.524 412.846-97.929-97.925c23.6-34.068 35.406-72.047 35.406-113.917 0-27.218-5.284-53.249-15.852-78.087-10.561-24.842-24.838-46.254-42.825-64.241-17.987-17.987-39.396-32.264-64.233-42.826C254.246 5.285 228.217.003 200.999.003c-27.216 0-53.247 5.282-78.085 15.847C98.072 26.412 76.66 40.689 58.673 58.676c-17.989 17.987-32.264 39.403-42.827 64.241C5.282 147.758 0 173.786 0 201.004c0 27.216 5.282 53.238 15.846 78.083 10.562 24.838 24.838 46.247 42.827 64.234 17.987 17.993 39.403 32.264 64.241 42.832 24.841 10.563 50.869 15.844 78.085 15.844 41.879 0 79.852-11.807 113.922-35.405l97.929 97.641c6.852 7.231 15.406 10.849 25.693 10.849 9.897 0 18.467-3.617 25.694-10.849 7.23-7.23 10.848-15.796 10.848-25.693.003-10.082-3.518-18.651-10.561-25.694zM291.363 291.358c-25.029 25.033-55.148 37.549-90.364 37.549-35.21 0-65.329-12.519-90.36-37.549-25.031-25.029-37.546-55.144-37.546-90.36 0-35.21 12.518-65.334 37.546-90.36 25.026-25.032 55.15-37.546 90.36-37.546 35.212 0 65.331 12.519 90.364 37.546 25.033 25.026 37.548 55.15 37.548 90.36 0 35.216-12.519 65.331-37.548 90.36z"
              ></path>
            </svg>
          </button>
        </form>
        <Link href="/ad/new" className={`${styles.button} ${styles.linkButton}`}
          ><span className={styles.mobileShortLabel}>Publier</span
          ><span className={styles.desktopLongLabel}>Publier une annonce</span>
        </Link>
      </div>
      <nav className={styles.categoryNavigation}>
        {
          categories.map(category => {
            return (
              <Link 
                key={category.id}
                href={`/?categories=${category.name}`}
                className={styles.categoryNavigationLink}>{category.name}
              </Link>
            )
          })
        }
      </nav>
    </header>
  )
}

export default Header;