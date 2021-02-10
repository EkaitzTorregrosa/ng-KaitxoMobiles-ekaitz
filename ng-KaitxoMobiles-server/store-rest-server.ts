var express = require('express');
const bodyParser = require('body-parser');
const app = express();

class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public shortDescription: string,
    public description: string,
    public categories: string[],
    public images: string
  ) { }
}

const products: Product[] = [
  new Product(
    0,
    "Huawei P40",
    464,
    4.3,
    "Huawei P40 - Smartphone",
    "Huawei P40 - Smartphone 128GB 8GB RAM Dual Sim Silver",
    ["electronics", "hardware"],
    "https://img01.huaweifile.com/eu/es/huawei/pms/product/6901443378951/428_428_59A45A930B1C9F4B26F7D437DA5B8B994F8CC108CD3A4EC0mp.png"
  ),
  new Product(
    1,
    "Iphone 12",
    1320.99,
    3.5,
    "Apple iPhone 12 Pro",
    "Nuevo Apple iPhone 12 Pro (512 GB) - Grafito",
    ["electronics", "hardware"],
    "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;op_usm=0.5,0.5&amp;.v=1604021663000"
  ),
  new Product(
    2,
    "Galaxy S21",
    859,
    5,
    "Samsung Galaxy S21",
    `Samsung Galaxy S21 5G, Gris, 128 GB, 8 GB RAM, 6.2" Dynamic AMOLED 120Hz, Exynos 2100, 4000 mAh`,
    ["electronics", "hardware"],
    "https://www.maxmovil.com/media/catalog/product/cache/1/small_image/9df78eab33525d08d6e5fb8d27136e95/c/o/comprar-samsung-galaxy-s10-verde_1.jpg"
  ),
  new Product(
    3,
    "Xiaomi Mi 10T",
    469,
    4.4,
    "Xiaomi Mi 10T 5G",
    `Xiaomi Mi 10T 5G, Plata, 128GB, 6GB RAM, 6.67" FHD+, Snapdragon 865 + Mi True Wireless Earphones Lite`,
    ["electronics", "hardware"],
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoqxrS0ZvdhEDJ1edwWQUzg6of1nTp95lZ8PZyjaSne4ikHqbVXFMCkYNMlB5oYjJ04uKfyTU&usqp=CAc"
  ),
  new Product(
    4,
    "Realme 7 Pro",
    269,
    4.2,
    "Realme 7 Pro Libre",
    "Realme 7 Pro 8/128GB Azul Libre",
    ["electronics", "hardware"],
    "data:image/jpeg;base64,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"
  )
]





function getProducts(): any[] {
  return products;
}

app.use(function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

app.post('/products', bodyParser.json(), (req: any, res: any) => {

  let pNew = new Product(
    products.length + 1,
    req.body.title,
    req.body.price,
    req.body.rating,
    req.body.shortDescription,
    req.body.description,
    req.body.categories,
    req.body.images
  );
  products.push(pNew);
  res.status(200).send({
    id: pNew.id,
    title: pNew.title,
    price: pNew.price,
    rating: pNew.rating,
    shortDescription: pNew.shortDescription,
    description: pNew.description,
    categories: pNew.categories,
    images: pNew.images
  });

})

app.get('/', (req: any, res: any) => {
  res.send('The URL of products is http://localhost:8000/products');
});

app.get('/products', (req: any, res: any) => {
  res.json(getProducts());
});


function getProductsById(productId: number): any {
  let p: any;
  p = products.find(p => p.id == productId);
  return p;
}

app.get('/products/:id', (req: any, res: any) => {
  res.json(getProductsById(parseInt(req.params.id)));
});



function updateProductsById(req: any, productId: number): any {
  let p: any;
  p = products.find(p => p.id == productId);
  let index = products.indexOf(p);

  p.title = req.body.title,
    p.price = req.body.price,
    p.rating = req.body.rating,
    p.shortDescription = req.body.shortDescription,
    p.description = req.body.description,
    p.categories = req.body.categories,
    p.images = req.body.images

  products[index] = p;
  return p;
}

app.put('/products/:id', function (req: any, res: any) {
  res.json(updateProductsById(req, parseInt(req.params.id)));
  res.send('Got a UPDATE request at /user');
});


function deleteProductsById(productId: number): any {
  let p: any;
  p = products.find(p => p.id == productId);
  let index = products.indexOf(p);
  delete products[index];
  return p;
}

app.delete('/products/:id', function (req: any, res: any) {
  res.json(deleteProductsById(parseInt(req.params.id)));
  res.send('Got a DELETE request at /user');
});



const server = app.listen(8000, "localhost", () => {
  const { address, port } = server.address();

  console.log('Listening on %s %s', address, port);
});



