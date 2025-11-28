import React, { useEffect, useState } from "react";
const API_BASE = "http://localhost:7000";

export default function CharacterCard() {
  const [info, setInfo] = useState([]);
  const [error, setError] = useState(""); // new error state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("http://localhost:7000/info")
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setInfo(Array.isArray(data) ? data : []);
      } catch (err) {
        // don't call console.error; store the error message instead
        setError(err?.message ? String(err.message) : "Unknown API error");
        setInfo([]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

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

        .statusRow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #e6e6e6;
          margin-top: 6px;
        }

        .name {
          font-size: 22px;
          font-weight: 800;
          margin: 0;
          line-height: 1.05;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 0 3px rgba(0,0,0,0.12) inset;
        }

        .detail {
          font-size: 13px;
          color: #e6e6e6;
        }

        .detail strong {
          display: block;
          color: #dcdcdc;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .error {
          background: rgba(231, 76, 60, 0.12);
          color: #f1c0bf;
          border: 1px solid rgba(231,76,60,0.2);
          padding: 8px 12px;
          border-radius: 8px;
          margin-bottom: 18px;
          max-width: 900px;
        }

        .loading {
          margin-bottom: 18px;
          color: #cfcfcf;
        }
      `}</style>

      <div style={{ maxWidth: 1900 }}>
        <img
          src="/logo.jpg"
          alt="Logo"
          style={{
            width: "100%",
            marginRight: "10px",
            marginTop: 0,
            marginBottom: 75,
          }}
        />

        {loading && <div className="loading">Loading characters…</div>}
        {error && <div className="error">Error loading data: {error}</div>}

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
                  style={{
                    height: "200px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  className="cardImage"
                  src={p.image}
                  alt={p.name}
                  onError={(e) => {
                    // graceful image fallback
                    e.currentTarget.src = "/fallback.jpg";
                  }}
                />

                <div className="cardContent">
                  <div className="cardHeader">
                    <div className="name">{p.name}</div>
                  </div>

                  <div className="detail">
                    <div className="statusRow" style={{ gap: "8px" }}>
                      <span className="dot" style={{ background: statusColor }} />
                      {p.status} - {p.gender}
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <strong style={{ color: "#8e8e92ff" }}>Last known location:</strong>
                      <div>{p.location?.name || "Unknown"}</div>
                    </div>

                    <div style={{ marginTop: 12 }}>
                      <strong style={{ color: "#8a8686ff" }}>First seen in:</strong>
                      <div style={{ color: "#f0b347" }}>{p.episode || "Unknown"}</div>
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
