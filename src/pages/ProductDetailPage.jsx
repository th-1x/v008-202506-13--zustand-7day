// src/pages/ProductDetailPage.jsx - Day 4: Route Params
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProductStore } from '../store';

function ProductDetailPage() {
  // ดึง productId จาก URL parameters
  const { productId } = useParams();
  const navigate = useNavigate();
  
  // ดึง state และ actions จาก Product Store
  const { 
    currentProduct, 
    productLoading, 
    productError, 
    fetchProductById, 
    clearCurrentProduct 
  } = useProductStore();

  // ใช้ useEffect เพื่อดึงข้อมูลเมื่อ productId เปลี่ยน
  useEffect(() => {
    if (productId) {
      fetchProductById(productId);
    }
    
    // Cleanup function เมื่อออกจากหน้าหรือ productId เปลี่ยน
    return () => {
      clearCurrentProduct();
    };
  }, [productId, fetchProductById, clearCurrentProduct]);

  // แสดง Loading state
  if (productLoading) {
    return (
      <div>
        <h1>📦 รายละเอียดสินค้า</h1>
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          border: '2px solid #2196F3',
          borderRadius: '8px',
          backgroundColor: '#f0f8ff'
        }}>
          <h2>⏳ กำลังโหลดข้อมูลสินค้า...</h2>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '5px solid #f3f3f3',
            borderTop: '5px solid #2196F3',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '1rem auto'
          }}></div>
          <p>Product ID: {productId}</p>
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
  if (productError) {
    return (
      <div>
        <h1>📦 รายละเอียดสินค้า</h1>
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          border: '2px solid #f44336',
          borderRadius: '8px',
          backgroundColor: '#fff8f8'
        }}>
          <h2>❌ ไม่พบสินค้า</h2>
          <p style={{ color: '#f44336' }}>{productError}</p>
          <p>Product ID: {productId}</p>
          <div style={{ marginTop: '1rem' }}>
            <button 
              onClick={() => fetchProductById(productId)}
              style={{ 
                backgroundColor: '#2196F3',
                color: 'white',
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '1rem'
              }}
            >
              🔄 ลองใหม่
            </button>
            <Link to="/products">
              <button style={{ 
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                🛍️ กลับไปดูสินค้าทั้งหมด
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ถ้าไม่มีข้อมูลสินค้า
  if (!currentProduct) {
    return (
      <div>
        <h1>📦 รายละเอียดสินค้า</h1>
        <p>ไม่พบข้อมูลสินค้า</p>
        <Link to="/products">
          <button>🛍️ กลับไปดูสินค้าทั้งหมด</button>
        </Link>
      </div>
    );
  }

  // แสดงรายละเอียดสินค้า
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={() => navigate(-1)}
          style={{ 
            backgroundColor: '#666',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '1rem'
          }}
        >
          ← กลับ
        </button>
        <Link to="/products">
          <button style={{ 
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            🛍️ ดูสินค้าทั้งหมด
          </button>
        </Link>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '2rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* รูปภาพสินค้า */}
        <div style={{ textAlign: 'center' }}>
          <img 
            src={currentProduct.image} 
            alt={currentProduct.title}
            style={{ 
              width: '100%', 
              maxWidth: '400px',
              height: 'auto',
              objectFit: 'contain',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              backgroundColor: '#fff'
            }}
          />
        </div>

        {/* ข้อมูลสินค้า */}
        <div>
          <h1 style={{ marginBottom: '1rem' }}>{currentProduct.title}</h1>
          
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ 
              backgroundColor: '#e3f2fd',
              color: '#1976d2',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.9rem'
            }}>
              {currentProduct.category}
            </span>
          </div>

          <div style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#4CAF50',
            marginBottom: '1rem'
          }}>
            ${currentProduct.price}
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1.5rem'
          }}>
            <span style={{ color: '#ff9800', fontSize: '1.2rem' }}>⭐</span>
            <span style={{ marginLeft: '0.5rem', fontSize: '1.1rem' }}>
              {currentProduct.rating?.rate} 
            </span>
            <span style={{ marginLeft: '0.5rem', color: '#666' }}>
              ({currentProduct.rating?.count} รีวิว)
            </span>
          </div>

          <div style={{ 
            lineHeight: '1.6',
            color: '#555',
            marginBottom: '2rem'
          }}>
            <h3>รายละเอียด:</h3>
            <p>{currentProduct.description}</p>
          </div>

          <button style={{ 
            backgroundColor: '#ff9800',
            color: 'white',
            padding: '1rem 2rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            width: '100%'
          }}>
            🛒 เพิ่มลงตะกร้า
          </button>
        </div>
      </div>

      <div style={{ 
        marginTop: '3rem', 
        padding: '2rem', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '8px' 
      }}>
        <h3>🎯 สิ่งที่เกิดขึ้นใน Day 4:</h3>
        <ol style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li><strong>useParams:</strong> ดึง productId จาก URL (/products/{productId})</li>
          <li><strong>Dynamic Route:</strong> URL เปลี่ยน → useEffect ทำงาน → ดึงข้อมูลใหม่</li>
          <li><strong>fetchProductById:</strong> ดึงข้อมูลสินค้าชิ้นเดียวจาก API</li>
          <li><strong>URL Sync:</strong> State ซิงค์กับ URL parameters</li>
          <li><strong>Navigation:</strong> ใช้ useNavigate เพื่อกลับหน้าก่อนหน้า</li>
          <li><strong>Cleanup:</strong> ล้างข้อมูลเมื่อออกจากหน้า</li>
        </ol>
        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
          Current Product ID from URL: <code>{productId}</code>
        </p>
      </div>
    </div>
  );
}

export default ProductDetailPage;
