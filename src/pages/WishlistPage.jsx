// src/pages/WishlistPage.jsx - Day 7: Mini Wishlist App
import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuthStore, useProductStore, useWishlistStore } from '../store';

function WishlistPage() {
  // Protected Route: ต้องล็อกอินก่อน
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const userProfile = useAuthStore(state => state.userProfile);

  // Wishlist state
  const itemIds = useWishlistStore(state => state.itemIds);
  const removeFromWishlist = useWishlistStore(state => state.removeFromWishlist);
  const clearWishlist = useWishlistStore(state => state.clearWishlist);

  // Products state
  const products = useProductStore(state => state.products);
  const fetchProducts = useProductStore(state => state.fetchProducts);
  const loading = useProductStore(state => state.loading);

  // ดึงข้อมูลสินค้าถ้ายังไม่มี
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  // Protected Route: redirect ถ้ายังไม่ล็อกอิน
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // ฟิลเตอร์สินค้าที่อยู่ใน wishlist
  const wishlistProducts = products.filter(product => 
    itemIds.includes(product.id)
  );

  if (loading) {
    return (
      <div>
        <h1>💖 My Wishlist</h1>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>กำลังโหลดข้อมูลสินค้า...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h1>💖 My Wishlist</h1>
        <div>
          <span style={{ marginRight: '1rem', color: '#666' }}>
            สวัสดี, {userProfile?.name}!
          </span>
          {itemIds.length > 0 && (
            <button 
              onClick={clearWishlist}
              style={{ 
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              🗑️ ล้าง Wishlist
            </button>
          )}
        </div>
      </div>

      {/* Wishlist Stats */}
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <h3>📊 สถิติ Wishlist</h3>
        <p>จำนวนสินค้าที่ชื่นชอب: <strong>{itemIds.length}</strong> รายการ</p>
        {wishlistProducts.length > 0 && (
          <p>มูลค่ารวม: <strong>${wishlistProducts.reduce((sum, product) => sum + product.price, 0).toFixed(2)}</strong></p>
        )}
      </div>

      {/* Empty State */}
      {itemIds.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <h2>💔 Wishlist ว่างเปล่า</h2>
          <p>คุณยังไม่ได้เพิ่มสินค้าใดๆ ลงใน Wishlist</p>
          <Link to="/products">
            <button style={{ 
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              🛍️ ไปเลือกสินค้า
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* Wishlist Products Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '1rem'
          }}>
            {wishlistProducts.map((product) => (
              <div 
                key={product.id} 
                style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '8px', 
                  padding: '1rem',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  position: 'relative'
                }}
              >
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                  title="ลบออกจาก Wishlist"
                >
                  ✕
                </button>

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
                    cursor: 'pointer'
                  }}>
                    {product.title}
                  </h3>
                </Link>
                
                <p style={{ 
                  color: '#666', 
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem'
                }}>
                  หมวดหมู่: {product.category}
                </p>
                
                <p style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  color: '#4CAF50',
                  marginBottom: '1rem'
                }}>
                  ${product.price}
                </p>

                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '1rem'
                }}>
                  <span style={{ color: '#ff9800' }}>⭐</span>
                  <span style={{ marginLeft: '0.25rem', fontSize: '0.9rem' }}>
                    {product.rating?.rate} ({product.rating?.count} รีวิว)
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link to={`/products/${product.id}`} style={{ flex: 1 }}>
                    <button style={{ 
                      backgroundColor: '#2196F3',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      width: '100%'
                    }}>
                      📦 ดูรายละเอียด
                    </button>
                  </Link>
                  
                  <button 
                    onClick={() => removeFromWishlist(product.id)}
                    style={{ 
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      minWidth: '120px'
                    }}
                  >
                    💔 ลบออก
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '2rem',
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <h3>🎯 ต่อไปคุณต้องการทำอะไร?</h3>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/products">
                <button style={{ 
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 1.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  🛍️ เลือกสินค้าเพิ่ม
                </button>
              </Link>
              
              <button 
                onClick={clearWishlist}
                style={{ 
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 1.5rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                🗑️ ล้าง Wishlist ทั้งหมด
              </button>
            </div>
          </div>
        </>
      )}

      {/* Day 7 Info */}
      <div style={{ 
        marginTop: '3rem', 
        padding: '2rem', 
        backgroundColor: '#e8f5e8', 
        borderRadius: '8px' 
      }}>
        <h3>🎉 Day 7: Mini Wishlist App Complete!</h3>
        <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li><strong>Protected Route:</strong> ต้องล็อกอินก่อนเข้าหน้านี้</li>
          <li><strong>Wishlist Store:</strong> ใช้ persist + devtools</li>
          <li><strong>Product Filtering:</strong> แสดงเฉพาะสินค้าใน wishlist</li>
          <li><strong>State Management:</strong> รวม 4 stores (auth, product, counter, wishlist)</li>
          <li><strong>Persistence:</strong> Wishlist ไม่หายเมื่อ refresh</li>
          <li><strong>Performance:</strong> ใช้ selectors อย่างถูกต้อง</li>
        </ul>
      </div>
    </div>
  );
}

export default WishlistPage;
