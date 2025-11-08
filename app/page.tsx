'use client';

import { useState } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  pages: number;
  description: string;
  createdAt: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    pages: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBook: Book = {
      id: Date.now().toString(),
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
      pages: parseInt(formData.pages) || 0,
      description: formData.description,
      createdAt: new Date().toLocaleDateString(),
    };

    setBooks([...books, newBook]);
    setFormData({ title: '', author: '', genre: '', pages: '', description: '' });
    setShowForm(false);
  };

  const deleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <header style={{
          textAlign: 'center',
          marginBottom: '40px',
          color: 'white',
        }}>
          <h1 style={{
            fontSize: '3rem',
            marginBottom: '10px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}>📚 Book Creator</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Create and manage your book collection</p>
        </header>

        <div style={{
          textAlign: 'center',
          marginBottom: '30px',
        }}>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: '15px 40px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: 'white',
              background: showForm ? '#e53e3e' : '#48bb78',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            }}
          >
            {showForm ? '❌ Cancel' : '➕ Create New Book'}
          </button>
        </div>

        {showForm && (
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '30px',
            marginBottom: '30px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          }}>
            <h2 style={{ marginTop: 0, color: '#667eea' }}>Create a New Book</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '1rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                  }}
                  placeholder="Enter book title"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                  Author *
                </label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '1rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                  }}
                  placeholder="Enter author name"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                    Genre *
                  </label>
                  <select
                    required
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="">Select a genre</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Romance">Romance</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Biography">Biography</option>
                    <option value="History">History</option>
                    <option value="Self-Help">Self-Help</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                    Pages *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.pages}
                    onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      boxSizing: 'border-box',
                    }}
                    placeholder="Number of pages"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '1rem',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    minHeight: '100px',
                    fontFamily: 'inherit',
                  }}
                  placeholder="Brief description of the book"
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: 'white',
                  background: '#667eea',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#5a67d8';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#667eea';
                }}
              >
                Create Book
              </button>
            </form>
          </div>
        )}

        {books.length === 0 ? (
          <div style={{
            background: 'rgba(255,255,255,0.9)',
            borderRadius: '15px',
            padding: '60px 30px',
            textAlign: 'center',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📖</div>
            <h3 style={{ color: '#667eea', marginBottom: '10px' }}>No books yet</h3>
            <p style={{ color: '#718096' }}>Click "Create New Book" to add your first book</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            {books.map((book) => (
              <div
                key={book.id}
                style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '25px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  transition: 'transform 0.3s ease',
                  position: 'relative',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <button
                  onClick={() => deleteBook(book.id)}
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: '#e53e3e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Delete book"
                >
                  ×
                </button>

                <h3 style={{
                  color: '#667eea',
                  marginTop: 0,
                  marginBottom: '10px',
                  fontSize: '1.4rem',
                  paddingRight: '30px',
                }}>{book.title}</h3>

                <p style={{ color: '#718096', marginBottom: '15px', fontSize: '0.95rem' }}>
                  by <strong>{book.author}</strong>
                </p>

                <div style={{
                  display: 'flex',
                  gap: '10px',
                  marginBottom: '15px',
                  flexWrap: 'wrap',
                }}>
                  <span style={{
                    background: '#667eea',
                    color: 'white',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                  }}>
                    {book.genre}
                  </span>
                  <span style={{
                    background: '#48bb78',
                    color: 'white',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                  }}>
                    {book.pages} pages
                  </span>
                </div>

                {book.description && (
                  <p style={{
                    color: '#4a5568',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    marginBottom: '15px',
                  }}>
                    {book.description}
                  </p>
                )}

                <p style={{
                  color: '#a0aec0',
                  fontSize: '0.8rem',
                  marginBottom: 0,
                }}>
                  Created: {book.createdAt}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
