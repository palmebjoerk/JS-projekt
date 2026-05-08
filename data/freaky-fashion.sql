CREATE TABLE clothes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  color TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  image_url TEXT
);

INSERT INTO clothes (
brand,
model,
color,
description,
price,
image_url
)
VALUES
(
'Freaky Fashion',
'T-Shirt',
'Svart',
"Svart Freaky Fashion i bomull",
399,
'Freaky-Fashion-svart-tshirt.png'
),
(
'Freaky Fashion',
'Sko',
'Camo',
'Camofärgade sneakers från Freaky Fashion',
999,
'Freaky-Fashion-sko-camo.png'
),
(
'Freaky Fashion',
'Pikétröja',
'White',
'Vit pikétröja från Freaky Fashion',
1199,
'Freaky-Fashion-vit-pikétröja.png'
),
(
'Freaky Fashion',
'Hoodie',
'Blå',
'Blå hoodie från Freaky Fashion',
1399,
'Freaky-Fashion-blå-hoodie.png'
),
(
    'Freaky Fashion',
    'Keps',
    'Neon',
    'Neonkepa från Freaky Fashion',
    649,
    'neon-freaky-fashion-keps.png'

);