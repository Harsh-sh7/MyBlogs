import React, { useEffect, useState } from "react";
import { allNews } from "../assets/mockData";
import "./Home.css";

export default function Home({ searchQuery }) {

  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);


  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=64fce6c88e654ad09d0c54abefa41974"
        );

        if (!response.ok) {
          setArticles(allNews.articles);
          // throw new Error(`HTTP Error: ${response.status}`);
        }else{

        const data = await response.json();
        if (!data.articles || data.articles.length === 0) {
          throw new Error("No articles found");
        }

        setArticles(data.articles);
      }
      } catch (error) {
        console.error("Error fetching news articles:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []); 

  useEffect(() => {
    if (searchQuery) {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [searchQuery, articles]);

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header">
        <h1>Explore Blogs</h1>
        <p>Stay updated with the latest news.</p>
      </div>

      {/* Loading and Error Handling */}
      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        // News Grid Section
        <div className="news-grid">
          {filteredArticles?.map((article, index) => (
            <div key={index} className="news-card">
              {/* Article Image */}
              <img
                src={article.urlToImage || "https://via.placeholder.com/300"} 
                alt={article.title}
                className="news-image"
              />
              {/* Article Content */}
              <div className="news-content">
                <h2>{article.title || "No Title Available"}</h2>
                <p className="news-date">
                  {article.publishedAt ? new Date(article.publishedAt).toDateString() : "No Date"}
                </p>
                <p className="news-description">
                  {article.description || "No description available."}
                </p>
                {/* Read-More Button - Opens modal */}
                <button className="read-more" onClick={() => setSelectedArticle(article)}>
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Selected Article */}
      {selectedArticle && (
        <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <span className="close-modal" onClick={() => setSelectedArticle(null)}>x</span>
            {/* Article Title */}
            <h2>{selectedArticle.title}</h2>
            {/* Article Image */}
            <img
              src={selectedArticle.urlToImage || "https://via.placeholder.com/400"}
              alt={selectedArticle.title}
              className="modal-image"
            />
            {/* Article Date */}
            <p className="modal-date">
              {selectedArticle.publishedAt ? new Date(selectedArticle.publishedAt).toDateString() : "No Date"}
            </p>
            {/* Article Content */}
            <p>{selectedArticle.content || selectedArticle.description || "No additional content available."}</p>
            {/* Read Full Article Link */}
            <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer" className="modal-read-full">
              Read Full Article
            </a>
          </div>
        </div>
      )}
    </div>
  );
}