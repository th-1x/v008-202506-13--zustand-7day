// src/pages/ProductPage.jsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../zudtand/productStore";

function ProductPage() {
  const { productId } = useParams(); // ดึง ID จาก URL
  const { product, loading, error, fetchProduct } = useProductStore();

  const clearProduct = useProductStore((state) => state.clearProduct);

  useEffect(() => {
    fetchProduct(productId);

    // cleanup function จะทำงานเมื่อ component ถูก unmount (ออกจากหน้า)
    return () => {
      clearProduct();
    };
  }, [productId, fetchProduct, clearProduct]);

  //   useEffect(() => {
  //     // เมื่อ component โหลด หรือ productId เปลี่ยน ให้ดึงข้อมูลใหม่
  //     fetchProduct(productId);
  //   }, [productId, fetchProduct]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{product?.name}</h1>
      <p>{product?.description}</p>
      <p>Price: ${product?.price}</p>
    </div>
  );
}
