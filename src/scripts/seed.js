import { connectDB } from "../../lib/mongodb.js";
import Product from "./models/Product.js";

const seedProducts = async () => {
  await connectDB();

  const products = [
    {
      name: "Sample Product 1",
      price: 99.99,
      image: "https://via.placeholder.com/300x200?text=Sample+Product+1"
    },
    {
      name: "Sample Product 2",
      price: 149.99,
      image: "https://via.placeholder.com/300x200?text=Sample+Product+2"
    },
    {
      name: "Sample Product 3",
      price: 199.99,
      image: "https://via.placeholder.com/300x200?text=Sample+Product+3"
    }
  ];

  await Product.deleteMany(); // purana data delete karega
  await Product.insertMany(products);

  console.log("✅ Products inserted successfully");
  process.exit();
};

seedProducts();
