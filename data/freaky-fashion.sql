CREATE TABLE clothes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  color TEXT NOT NULL,
  description TEXT NOT NULL,
  sku TEXT NOT NULL UNIQUE,
  price INTEGER NOT NULL,
  image_url TEXT
);

INSERT INTO clothes (
brand,
model,
color,
description,
sku,
price,
image_url
)
VALUES
(
'Freaky Fashion',
'Hoodie',
'Svart',
"Svart Freaky Fashion-hoodie",
"AAA000",
999,
'FF_Svart_Hoodie.png'
),
(
'Freaky Fashion',
'Hoodie',
'Blå',
'Blå Freaky Fashion-hoodie',
"AAA001",
999,
'FF_Blå_Hoodie.png'
),
(
'Freaky Fashion',
'Pikétröja',
'Blå',
'Vit pikétröja från Freaky Fashion',
"AAA002",
799,
'FF_Blå_Piké.png'
),
(
'Freaky Fashion',
'Hoodie',
'Grön',
'Grön hoodie från Freaky Fashion',
"AAA003",
999,
'FF_Grön_Hoodie.png'
)
,
(
'Freaky Fashion',
'Keps',
'Neon',
'Neonkepa från Freaky Fashion',
"AAA004",
649,
'FF_Neon_Kepa.png'

),
(
'Freaky Fashion',
'Hoodie',
'Gul',
'Gul hoodie från Freaky Fashion',
"AAA005",
999,
'FF_Gul_Hoodie.png'
),
(
'Freaky Fashion',
'Pikétröja',
'Gul',
'Gul pikétröja från Freaky Fashion',
"AAA006",
799,
'FF_Gul_Piké.png'
),
(
'Freaky Fashion',
'Pikétröja',
'Grön',
'Grön pikétröja från Freaky Fashion',
"AAA007",
799,
'FF_Grön_Piké.png'
),
(
'Freaky Fashion',
'Pikétröja',
'Svart',
'Svart pikétröja från Freaky Fashion',
"AAA008",
799,
'FF_Svart_Piké.png'
),
('Freaky Fashion',
'Keps',
'Guld',
'Guldkepa från Freaky Fashion',
"AAA009",
649,
'FF_Guld_Kepa.png'),
('Freaky Fashion',
'Keps',
'Rosa',
'Rosakepa från Freaky Fashion',
"AAA010",
649,
'FF_Rosa_Kepa.png'),
('Freaky Fashion',
'Keps',
'Camo',
'Camokepa från Freaky Fashion',
"AAA011",
649,
'FF_Camo_Kepa.png');