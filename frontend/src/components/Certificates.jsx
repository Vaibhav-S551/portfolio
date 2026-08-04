
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Award, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react'

const demoCerts = [
  {
    _id: '1',
    title: 'AWS Certified Developer – Associate',
    issuer: 'Hackerrank',
    imageUrl:
      'https://images.credly.com/size/340x340/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png',
    date: '2023-09-15',
    credentialUrl: '#'
  },
  {
    _id: '2',
    title: 'TensorFlow Developer Certificate',
    issuer: 'Google',
    imageUrl:
      'https://images.credly.com/size/340x340/images/99289602-861e-4929-8277-773e63a2fa6f/image.png',
    date: '2023-04-20',
    credentialUrl: '#'
  },
  {
    _id: '3',
    title: 'MongoDB Professional Developer',
    issuer: 'MongoDB University',
    imageUrl:
      'https://webimages.mongodb.com/_com_assets/cms/koih1fkpnxozbfpj6-MongoDB_University_Certification_Badge_White_BG.png',
    date: '2022-11-10',
    credentialUrl: '#'
  }
]

const FALLBACK_IMAGE =
  'https://dummyimage.com/300x200/1a1a2e/ffffff&text=Certificate'

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://portfolio-o3jz.onrender.com'

export default function Certificates() {
  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [usingDemo, setUsingDemo] = useState(false)

  const normalizeCerts = (certificates) => {
    return certificates.map((cert) => ({
      ...cert,
      imageUrl: cert.imageUrl
        ? cert.imageUrl.startsWith('http')
          ? cert.imageUrl
          : `${BASE_URL}${cert.imageUrl}`
        : FALLBACK_IMAGE
    }))
  }

  const fetchCerts = async () => {
    setLoading(true)
    setError(null)
    setUsingDemo(false)

    try {
      const res = await axios.get(`${BASE_URL}/api/certificates`)

      if (
        res.data?.success &&
        Array.isArray(res.data.data) &&
        res.data.data.length > 0
      ) {
        setCerts(normalizeCerts(res.data.data))
      } else {
        setCerts(demoCerts)
        setUsingDemo(true)
      }
    } catch (err) {
      console.error('Certificate fetch failed:', err)
      setError('Unable to load certificates from backend.')
      setCerts(demoCerts)
      setUsingDemo(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCerts()
  }, [])

  return (
    <section id="certificates">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Award size={12} style={{ display: 'inline', marginRight: '6px' }} />
            Credentials
          </div>

          <h2 className="section-title">
            Certifi<span className="gradient-text">cations</span>
          </h2>

          <p className="section-subtitle">
            Professional certifications validating my expertise
          </p>
        </div>

        {usingDemo && (
          <div className="demo-notice">
            <AlertCircle size={16} />
            <span>
              {error || 'Showing demo data. Connect backend to load real certificates.'}
            </span>

            <button
              className="btn btn-ghost"
              onClick={fetchCerts}
            >
              <RefreshCw size={13} />
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="certs-loading">
            {[1, 2, 3].map((i) => (
              <div key={i} className="cert-skeleton" />
            ))}
          </div>
        ) : (
          <div className="certs-grid">
            {certs.map((cert, i) => (
              <div
                key={cert._id}
                className="cert-card card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="cert-img-wrap">
                  <img
                    src={cert.imageUrl || FALLBACK_IMAGE}
                    alt={cert.title}
                    className="cert-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = FALLBACK_IMAGE
                    }}
                  />
                  <div className="cert-img-overlay" />
                </div>

                <div className="cert-body">
                  <div className="cert-issuer">
                    <span className="issuer-dot" />
                    {cert.issuer}
                  </div>

                  <h3 className="cert-title">{cert.title}</h3>

                  <div className="cert-footer">
                    <span className="cert-date">
                      {new Date(cert.date).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>

                    {cert.credentialUrl &&
                      cert.credentialUrl !== '#' && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cert-link"
                        >
                          <ExternalLink size={14} />
                          Verify
                        </a>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    
      <style>{`
        .demo-notice {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(245,158,11,0.08);
          border: 1px solid rgba(245,158,11,0.2);
          color: #fbbf24;
          padding: 12px 20px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .certs-grid,
        .certs-loading {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .cert-skeleton {
          height: 320px;
          background: linear-gradient(
            90deg,
            var(--bg-card) 25%,
            var(--bg-card-hover) 50%,
            var(--bg-card) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: var(--radius);
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        .cert-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 0;
        }

        .cert-img-wrap {
          position: relative;
          height: 180px;
          background: linear-gradient(135deg, #1a1a2e, #0f0f1a);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .cert-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
          transition: var(--transition);
        }

        .cert-card:hover .cert-img {
          transform: scale(1.05);
        }

        .cert-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 50%,
            var(--bg-card) 100%
          );
        }

        .cert-body {
          padding: 20px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cert-issuer {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--accent-light);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .issuer-dot {
          width: 6px;
          height: 6px;
          background: var(--accent-light);
          border-radius: 50%;
        }

        .cert-title {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .cert-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
        }

        .cert-date {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .cert-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--accent-light);
          text-decoration: none;
          transition: var(--transition);
        }

        .cert-link:hover {
          color: var(--accent-2);
        }

        @media (max-width: 900px) {
          .certs-grid,
          .certs-loading {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 560px) {
          .certs-grid,
          .certs-loading {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
