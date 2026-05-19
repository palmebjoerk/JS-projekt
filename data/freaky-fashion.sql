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
'Hoodie',
'Svart',
"Svart Freaky Fashion-hoodie",
399,
'FF_svart_hoodie.png'
),
(
'Freaky Fashion',
'Hoodie',
'Blå',
'Blå Freaky Fashion-hoodie',
999,
'FF_blå_hoodie.png'
),
(
'Freaky Fashion',
'Pikétröja',
'Blå',
'Vit pikétröja från Freaky Fashion',
1199,
'FF_blå_pike.png'
),
(
'Freaky Fashion',
'Hoodie',
'Grön',
'Grön hoodie från Freaky Fashion',
1399,
'FF_grön_hoodie.png'
),
(
'Freaky Fashion',
'Keps',
'Neon',
'Neonkepa från Freaky Fashion',
649,
'FF_neon_keps.png'

),
(
'Freaky Fashion',
'Hoodie',
'Gul',
'Gul hoodie från Freaky Fashion',
1399,
'FF_gul_hoodie.png'
),
(
'Freaky Fashion',
'Pikétröja',
'Gul',
'Gul pikétröja från Freaky Fashion',
1199,
'FF_gul_pike.png'
),
(
'Freaky Fashion',
'Pikétröja',
'Grön',
'Grön pikétröja från Freaky Fashion',
1199,
'FF_grön_pike.png'
),
(
'Freaky Fashion',
'Pikétröja',
'Svart',
'Svart pikétröja från Freaky Fashion',
1199,
'FF_svart_pike.png'
);