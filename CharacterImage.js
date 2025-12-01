import React, { useEffect, useState } from "react";
const API_BASE = "http://localhost:7000";
export default function CharacterImage() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/info`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setInfo(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("API Error:", err);
        setInfo([]);
      }
    };
    loadProducts();
  }, []);

  const handleNameClick = (id) => {
    const jsonUrl = `${API_BASE}/info/${id}`;
    window.open(jsonUrl, "_blank");
  };

  return (
    <div style={{ backgroundColor: "#282828ff", minHeight: "100vh", padding: 24 }}>
      <style>{`
        .grid {
          display: grid;
          gap: 24px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .card {
          display: flex;
          gap: 18px;
          padding: 18px;
          border-radius: 12px;
          box-shadow: 0 8px 18px rgba(0,0,0,0.12);
          background: #3f4043;
          color: white;
          align-items: stretch;
          overflow: hidden;
          min-height: 180px;
        }

        .cardImage {
          flex: 0 0 160px;
          border-radius: 8px;
          object-fit: cover;
          background: black;
          display: block;
          cursor: pointer;
        }

        .cardContent {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 10px;
          min-width: 0;
        }

        .cardHeader {
          display: flex;
          justify-content: space-between;
          gap: 12px;
        }

        .name {
          font-size: 22px;
          font-weight: 800;
          margin: 0;
        }

        .statusRow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #e6e6e6;
          margin-top: 6px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .detail {
          font-size: 13px;
          color: #e6e6e6;
        }

        .detail strong {
          display: block;
          font-weight: 700;
          margin-bottom: 6px;
        }
      `}</style>

      <div style={{ maxWidth: 1900, margin: "0 auto" }}>
        <h1
          style={{
            textAlign: "center",
            color: "black",
            backgroundColor: "white",
            padding: "10px 0",
            borderRadius: 8,
            marginBottom: 18,
          }}
        >
          The Rick and Morty API
        </h1>

        <div className="grid">
          {info.map((p) => {
            const statusColor =
              p.status === "Alive"
                ? "#2ecc71"
                : p.status === "Dead"
                ? "#e74c3c"
                : "#95a5a6";

            return (
              <article key={p.id} className="card">
                <img
                  className="cardImage"
                  style={{
                    height: "200px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  src={p.image}
                  alt={p.name}
                  
                />

                <div className="cardContent">
                  <div className="cardHeader">
                    <div className="name" onClick={() => handleNameClick(p.id)}
                  title="Click to open character JSON">{p.name}</div>
                    
                  </div>

                  <div className="detail">
                    <div className="statusRow">
                      <span className="dot" style={{ background: statusColor }} />
                      {p.status} - {p.gender}
                    </div>

                    <div style={{ marginTop: 12 }}>
                      <strong>Last known location:</strong>
                      <div>{p.location?.name}</div>
                    </div>

                    <div style={{ marginTop: 12 }}>
                      <strong>First seen in:</strong>
                      <div style={{ color: "#f0b347" }}>{p.episode}</div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

