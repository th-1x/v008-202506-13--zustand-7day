// src/pages/ProductsPage.jsx - Day 7: Mini Wishlist App
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore, useWishlistStore } from '../store';

function ProductsPage() {
  // ดึง state และ actions จาก Product Store
  const { products, loading, error, fetchProducts, clearProducts } = useProductStore();

  // Day 7: Wishlist functionality
  const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
  const isInWishlist = useWishlistStore(state => state.isInWishlist);

  // ใช้ useEffect เพื่อดึงข้อมูลเมื่อ component โหลด
  useEffect(() => {
    fetchProducts();
    
    // Cleanup function เมื่อออกจากหน้า
    return () => {
      clearProducts();
    };
  }, [fetchProducts, clearProducts]);

  // แสดง Loading state
  if (loading) {
    return (
      <div>
        <h1>🛍️ Products Page</h1>
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          border: '2px solid #2196F3',
          borderRadius: '8px',
          backgroundColor: '#f0f8ff'
        }}>
          <h2>⏳ กำลังโหลดข้อมูล...</h2>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '5px solid #f3f3f3',
            borderTop: '5px solid #2196F3',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '1rem auto'
          }}></div>
          <p>กรุณารอสักครู่ ระบบกำลังดึงข้อมูลสินค้าจาก API</p>
        </div>
        
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // แสดง Error state
  if (error) {
    return (
      <div>
        <h1>🛍️ Products Page</h1>
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          border: '2px solid #f44336',
          borderRadius: '8px',
          backgroundColor: '#fff8f8'
        }}>
          <h2>❌ เกิดข้อผิดพลาด</h2>
          <p style={{ color: '#f44336' }}>{error}</p>
          <button 
            onClick={fetchProducts}
            style={{ 
              backgroundColor: '#2196F3',
              color: 'white',
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            🔄 ลองใหม่
          </button>
        </div>
      </div>
    );
  }

  // แสดงข้อมูลสินค้า
  return (
    <div>
      <h1>🛍️ Products Page</h1>
      <p>ยินดีต้อนรับสู่ Day 3: Async Actions!</p>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>📊 สถิติ:</h3>
        <p>จำนวนสินค้าทั้งหมด: <strong>{products.length}</strong> รายการ</p>
        <button 
          onClick={fetchProducts}
          style={{ 
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🔄 รีเฟรชข้อมูล
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '1rem',
        marginTop: '2rem'
      }}>
        {products.map((product) => (
          <div 
            key={product.id} 
            style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '1rem',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <img 
              src={product.image} 
              alt={product.title}
              style={{ 
                width: '100%', 
                height: '200px', 
                objectFit: 'contain',
                marginBottom: '1rem'
              }}
            />
            <Link
              to={`/products/${product.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <h3 style={{
                fontSize: '1rem',
                marginBottom: '0.5rem',
                height: '3rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                cursor: 'pointer',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#2196F3'}
              onMouseLeave={(e) => e.target.style.color = 'inherit'}
              >
                {product.title}
              </h3>
            </Link>
            <p style={{ 
              color: '#666', 
              fontSize: '0.9rem',
              marginBottom: '0.5rem'
            }}>
              หCategory: {product.category}
            </p>
            <p style={{ 
              fontSize: '1.2rem', 
              fontWeight: 'bold', 
              color: '#4CAF50',
              marginBottom: '0.5rem'
            }}>
              ${product.price}
            </p>
            <p style={{ 
              fontSize: '0.8rem', 
              color: '#888',
              height: '4rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {product.description}
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '0.5rem'
            }}>
              <div>
                <span style={{ color: '#ff9800' }}>⭐</span>
                <span style={{ marginLeft: '0.25rem', fontSize: '0.9rem' }}>
                  {product.rating?.rate} ({product.rating?.count} รีวิว)
                </span>
              </div>
            </div>

            {/* Day 7: Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginTop: '1rem'
            }}>
              <Link to={`/products/${product.id}`} style={{ flex: 1 }}>
                <button style={{
                  backgroundColor: '#2196F3',
                  color: 'white',
                  padding: '0.5rem',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  width: '100%'
                }}>
                  📦 ดูรายละเอียด
                </button>
              </Link>

              <button
                onClick={() => toggleWishlist(product.id)}
                style={{
                  backgroundColor: isInWishlist(product.id) ? '#f44336' : '#4CAF50',
                  color: 'white',
                  padding: '0.5rem',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  minWidth: '100px'
                }}
              >
                {isInWishlist(product.id) ? '💔 ลบออก' : '💖 ชื่นชอบ'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>🎯 สิ่งที่เกิดขึ้นใน Day 3-4:</h3>
        <ol style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li><strong>useEffect:</strong> เรียก fetchProducts() เมื่อ component โหลด</li>
          <li><strong>Loading State:</strong> แสดง spinner ขณะรอข้อมูล</li>
          <li><strong>API Call:</strong> ดึงข้อมูลจาก fakestoreapi.com</li>
          <li><strong>Success:</strong> แสดงรายการสินค้าในรูปแบบ grid</li>
          <li><strong>Error Handling:</strong> แสดงข้อความผิดพลาดและปุ่มลองใหม่</li>
          <li><strong>Product Links:</strong> คลิกชื่อสินค้าหรือปุ่มเพื่อดูรายละเอียด (Day 4)</li>
          <li><strong>Dynamic Routes:</strong> ลิงก์ไปยัง /products/:productId (Day 4)</li>
        </ol>
        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
          💡 ลองคลิกที่ชื่อสินค้าหรือปุ่ม "ดูรายละเอียด" เพื่อไปยังหน้ารายละเอียด!
        </p>
      </div>
    </div>
  );
}

export default ProductsPage;
