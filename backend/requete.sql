CREATE TABLE ad
(
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(250) NOT NULL,
  owner VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  picture VARCHAR(100) NOT NULL,
  location VARCHAR(50) NOT NULL,
  createdAt VARCHAR(50) NOT NULL
);

INSERT INTO ad (title, description, owner, price, picture, location, createdAt) VALUES
("SnowBoard to sell", "Beautiful SnowBoard to sell", "snow.seller@gmail.com", 50, "https://149359637.v2.pressablecdn.com/wp-content/uploads/2017/10/Snowboard-Wallpaper-About-Murals.jpg", "Bordeau", "2023-10-05T10:14:15.922Z"),
("Bike to sell", "Beautiful Bike to sell", "snow.seller@gmail.com", 300, "https://149359637.v2.pressablecdn.com/wp-content/uploads/2017/10/Snowboard-Wallpaper-About-Murals.jpg", "Bordeau", "2023-10-05T10:14:15.922Z"),
("Dog to sell", "Beautiful Dog to sell", "snow.seller@gmail.com", 1000, "https://149359637.v2.pressablecdn.com/wp-content/uploads/2017/10/Snowboard-Wallpaper-About-Murals.jpg", "Bordeau", "2023-10-05T10:14:15.922Z"),
("Cat to sell", "Beautiful Cat to sell", "snow.seller@gmail.com", 1200, "https://149359637.v2.pressablecdn.com/wp-content/uploads/2017/10/Snowboard-Wallpaper-About-Murals.jpg", "Bordeau", "2023-10-05T10:14:15.922Z"),
("Wheel to sell", "Beautiful Wheel to sell", "snow.seller@gmail.com", 30, "https://149359637.v2.pressablecdn.com/wp-content/uploads/2017/10/Snowboard-Wallpaper-About-Murals.jpg", "Bordeau", "2023-10-05T10:14:15.922Z"),
("Garage", "Beautiful Garage to sell", "snow.seller@gmail.com", 10000, "https://149359637.v2.pressablecdn.com/wp-content/uploads/2017/10/Snowboard-Wallpaper-About-Murals.jpg", "Bordeau", "2023-09-05T10:13:14.755Z"),
("Bottel to sell", "Beautiful Bottel to sell", "snow.seller@gmail.com", 5, "https://149359637.v2.pressablecdn.com/wp-content/uploads/2017/10/Snowboard-Wallpaper-About-Murals.jpg", "Bordeau", "2023-09-05T10:13:14.755Z"),
("Smartphone to sell", "Beautiful Smartphone to sell", "snow.seller@gmail.com", 200, "https://149359637.v2.pressablecdn.com/wp-content/uploads/2017/10/Snowboard-Wallpaper-About-Murals.jpg", "Paris", "2023-09-05T10:13:14.755Z"),
("Computer to sell", "Beautiful Computer to sell", "snow.seller@gmail.com", 950, "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg", "Paris", "2023-09-05T10:13:14.755Z"),
("TV to sell", "Beautiful TV to sell", "snow.seller@gmail.com", 120, "https://149359637.v2.pressablecdn.com/wp-content/uploads/2017/10/Snowboard-Wallpaper-About-Murals.jpg", "Paris", "2023-09-05T10:13:14.755Z"),
("Bed to sell", "Beautiful Bed to sell", "snow.seller@gmail.com", 100, "https://149359637.v2.pressablecdn.com/wp-content/uploads/2017/10/Snowboard-Wallpaper-About-Murals.jpg", "Paris", "2023-09-05T10:13:14.755Z"),
("Car to sell", "Beautiful Car to sell", "snow.seller@gmail.com", 12000, "https://149359637.v2.pressablecdn.com/wp-content/uploads/2017/10/Snowboard-Wallpaper-About-Murals.jpg", "Paris", "2023-09-05T10:13:14.755Z"),
("Truck to sell", "Beautiful Truck to sell", "snow.seller@gmail.com", 15000, "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg", "Paris", "2023-09-05T10:13:14.755Z"),
("Ski to sell", "Beautiful Ski to sell", "snow.seller@gmail.com", 200, "https://149359637.v2.pressablecdn.com/wp-content/uploads/2017/10/Snowboard-Wallpaper-About-Murals.jpg", "Paris", "2023-09-05T10:13:14.755Z"),
("Glass to sell", "Beautiful Glass to sell", "snow.seller@gmail.com", 20, "https://149359637.v2.pressablecdn.com/wp-content/uploads/2017/10/Snowboard-Wallpaper-About-Murals.jpg", "Paris", "2023-09-05T10:13:14.755Z"),
("House to sell", "Beautiful House to sell", "snow.seller@gmail.com", 1000000, "https://149359637.v2.pressablecdn.com/wp-content/uploads/2017/10/Snowboard-Wallpaper-About-Murals.jpg", "Lyon", "2023-09-05T10:13:14.755Z"),
("Tea to sell", "Beautiful Tea to sell", "snow.seller@gmail.com", 1, "https://149359637.v2.pressablecdn.com/wp-content/uploads/2017/10/Snowboard-Wallpaper-About-Murals.jpg", "Lyon", "2023-09-05T10:13:14.755Z"),
("Cafe to sell", "Beautiful Cafe to sell", "snow.seller@gmail.com",20 , "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg", "Lyon", "2023-09-05T10:13:14.755Z"),
("Skateboard to sell", "Beautiful Skateboard to sell", "snow.seller@gmail.com", 100, "https://149359637.v2.pressablecdn.com/wp-content/uploads/2017/10/Snowboard-Wallpaper-About-Murals.jpg", "Lyon", "2023-10-05T10:14:15.922Z"),
("Rollers to sell", "Beautiful Rollers to sell", "snow.seller@gmail.com", 30, "https://149359637.v2.pressablecdn.com/wp-content/uploads/2017/10/Snowboard-Wallpaper-About-Murals.jpg", "Lyon", "2023-10-05T10:14:15.922Z");

SELECT* FROM ad;

SELECT* FROM ad WHERE location = 'Bordeaux';

DELETE FROM ad WHERE price > 40;

UPDATE ad SET price = 0 WHERE createdAt = '2023-09-01T10:00:00.000Z';

SELECT AVG(price) from ad GROUP BY location HAVING location = 'paris';

CREATE TABLE category
(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE ad
(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    title VARCHAR(100),
    description VARCHAR(250),
    owner VARCHAR(100),
    price INTEGER,
    picture VARCHAR(100),
    location VARCHAR(50),
    createdAt DATE,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES category (id)
);

select ad.id, ad.title, ad.description, ad.owner, ad.price, ad.picture, ad.location, ad.createdAt, ca.name as category
FROM ad
INNER JOIN category ca on ad.category_id = ca.id
WHERE ca.name = 'vêtement';

select ad.id, ad.title, ad.description, ad.owner, ad.price, ad.picture, ad.location, ad.createdAt, ca.name as category
FROM ad
INNER JOIN category ca on ad.category_id = ca.id
WHERE ca.name IN ('vêtement', 'voiture');

select AVG(ad.price)
FROM ad
INNER JOIN category ca on ad.category_id = ca.id
WHERE ca.name = 'autre';

select ad.id, ad.title, ad.description, ad.owner, ad.price, ad.picture, ad.location, ad.createdAt, ca.name as category
FROM ad
INNER JOIN category ca on ad.category_id = ca.id
WHERE ca.name like 'v%';