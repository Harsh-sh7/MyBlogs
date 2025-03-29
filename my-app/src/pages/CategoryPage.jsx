import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CategoryPage.css";

export default function CategoryPage({ categorySearchQuery }) {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let apiUrl = `https://newsapi.org/v2/everything?q=${category}&sortBy=publishedAt&apiKey=64fce6c88e654ad09d0c54abefa41974`;

        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();
        if (!data.articles || data.articles.length === 0) throw new Error("No articles found");

        setArticles(data.articles);
        setFilteredArticles(data.articles);
      } catch (error) {
        console.error("Error fetching news articles:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  } , [category]);

  useEffect(() => {
    if (categorySearchQuery) {
      const filtered = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
          (article.description && article.description.toLowerCase().includes(categorySearchQuery.toLowerCase()))
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [categorySearchQuery, articles]);

  return (
    <div className="container">
      <div className="header">
        <h1>{category.charAt(0).toUpperCase() + category.slice(1)} News</h1>
        <p>Latest updates in {category}.</p>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="news-grid">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <div key={index} className="news-card">
                <img src={article.urlToImage || "https://via.placeholder.com/300"} alt={article.title} className="news-image" />
                <div className="news-content">
                  <h2>{article.title || "No Title Available"}</h2>
                  <p className="news-date">
                    {article.publishedAt ? new Date(article.publishedAt).toDateString() : "No Date"}
                  </p>
                  <p className="news-description">
                    {article.description || "No description available."}
                  </p>
                  <button className="read-more" onClick={() => setSelectedArticle(article)}>
                    Read More
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No articles found.</p>
          )}
        </div>
      )}

      {/* Modal */}
      {selectedArticle && (
        <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={() => setSelectedArticle(null)}>×</span>
            <h2>{selectedArticle.title}</h2>
            <img
              src={selectedArticle.urlToImage || "https://via.placeholder.com/400"}
              alt={selectedArticle.title}
              className="modal-image"
            />
            <p className="modal-date">
              {selectedArticle.publishedAt ? new Date(selectedArticle.publishedAt).toDateString() : "No Date"}
            </p>
            <p>{selectedArticle.content || selectedArticle.description || "No additional content available."}</p>
            <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer" className="modal-read-full">
              Read Full Article
            </a>
          </div>
        </div>
      )}
    </div>
  );
}