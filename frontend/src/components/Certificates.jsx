import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Award,
  ExternalLink,
  RefreshCw,
  Calendar,
  ShieldCheck,
  ArrowUpRight,
  Eye,
  X,
  Sparkles,
  BadgeCheck,
  FileCheck2,
  Layers3
} from 'lucide-react'

const FALLBACK_IMAGE =
  'https://dummyimage.com/1200x750/101016/ffffff&text=Certificate'

export default function Certificates() {
  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCertificate, setSelectedCertificate] =
    useState(null)

  const fetchCertificates = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await axios.get('/api/certificates')

      console.log(
        'Certificates API response:',
        response.data
      )

      if (Array.isArray(response.data)) {
        setCerts(response.data)
      } else if (
        response.data?.data &&
        Array.isArray(response.data.data)
      ) {
        setCerts(response.data.data)
      } else {
        setCerts([])
        setError('No certificates found.')
      }
    } catch (err) {
      console.error(
        'Certificate fetch failed:',
        err
      )

      setCerts([])
      setError(
        'Unable to load certificates. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCertificates()
  }, [])

  /*
   * Escape key closes certificate preview
   */
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedCertificate(null)
      }
    }

    document.addEventListener(
      'keydown',
      handleEscape
    )

    return () => {
      document.removeEventListener(
        'keydown',
        handleEscape
      )
    }
  }, [])

  /*
   * Prevent page scrolling while modal is open
   */
  useEffect(() => {
    if (selectedCertificate) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedCertificate])

  return (
    <>
      <section
        id="certificates"
        className="certificates-section"
      >
        {/* =========================================
            BACKGROUND DECORATION
        ========================================== */}

        <div className="cert-bg-grid" />

        <div className="cert-glow cert-glow-one" />
        <div className="cert-glow cert-glow-two" />

        <div className="cert-orbit cert-orbit-one" />
        <div className="cert-orbit cert-orbit-two" />

        <div className="container cert-container">

          {/* =========================================
              HEADER
          ========================================== */}

          <div className="section-header certificate-header">

            <div className="section-tag">
              <Award size={13} />
              <span>Professional Credentials</span>
            </div>

            <h2 className="section-title">
              Certifications{' '}
              <span className="gradient-text">
                & Achievements
              </span>
            </h2>

            <p className="section-subtitle">
              A collection of professional certifications
              and technical credentials that represent my
              continuous learning and commitment to
              software development.
            </p>

          </div>

          {/* =========================================
              TOP CREDENTIAL SUMMARY
          ========================================== */}

          {!loading &&
            !error &&
            certs.length > 0 && (
              <div className="credential-summary">

                <div className="summary-item">
                  <div className="summary-icon purple">
                    <Award size={19} />
                  </div>

                  <div>
                    <strong>{certs.length}</strong>
                    <span>
                      {certs.length === 1
                        ? 'Credential'
                        : 'Credentials'}
                    </span>
                  </div>
                </div>

                <div className="summary-divider" />

                <div className="summary-item">
                  <div className="summary-icon green">
                    <BadgeCheck size={19} />
                  </div>

                  <div>
                    <strong>100%</strong>
                    <span>Verified</span>
                  </div>
                </div>

                <div className="summary-divider" />

                <div className="summary-item">
                  <div className="summary-icon blue">
                    <FileCheck2 size={19} />
                  </div>

                  <div>
                    <strong>Active</strong>
                    <span>Credentials</span>
                  </div>
                </div>

                <div className="summary-message">
                  <Sparkles size={15} />
                  <span>
                    Always learning. Always building.
                  </span>
                </div>

              </div>
            )}

          {/* =========================================
              LOADING STATE
          ========================================== */}

          {loading && (
            <div className="certificates-grid">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="certificate-skeleton"
                >
                  <div className="skeleton-image" />

                  <div className="skeleton-content">

                    <div className="skeleton-line tiny" />

                    <div className="skeleton-line" />

                    <div className="skeleton-line short" />

                    <div className="skeleton-date" />

                    <div className="skeleton-buttons">
                      <div />
                      <div />
                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}

          {/* =========================================
              ERROR STATE
          ========================================== */}

          {!loading && error && (
            <div className="certificate-error">

              <div className="error-icon">
                <Award size={22} />
              </div>

              <div className="error-content">
                <span className="error-label">
                  CERTIFICATE SERVICE
                </span>

                <h3>
                  Certificates unavailable
                </h3>

                <p>{error}</p>
              </div>

              <button
                type="button"
                className="retry-button"
                onClick={fetchCertificates}
              >
                <RefreshCw size={15} />
                Retry
              </button>

            </div>
          )}

          {/* =========================================
              EMPTY STATE
          ========================================== */}

          {!loading &&
            !error &&
            certs.length === 0 && (
              <div className="certificate-empty">

                <div className="empty-icon">
                  <Award size={34} />
                </div>

                <span className="empty-label">
                  CREDENTIALS
                </span>

                <h3>
                  No certificates yet
                </h3>

                <p>
                  Professional certifications will appear
                  here once they are added.
                </p>

              </div>
            )}

          {/* =========================================
              CERTIFICATE CONTENT
          ========================================== */}

          {!loading &&
            !error &&
            certs.length > 0 && (
              <>

                <div className="certificate-toolbar">

                  <div className="toolbar-left">
                    <div className="verified-status">
                      <ShieldCheck size={15} />
                      <span>
                        Verified Credentials
                      </span>
                    </div>

                    <span className="toolbar-dot">
                      •
                    </span>

                    <span className="toolbar-description">
                      Professional learning milestones
                    </span>
                  </div>

                  <div className="certificate-count">
                    <Layers3 size={14} />
                    {certs.length}{' '}
                    {certs.length === 1
                      ? 'Certificate'
                      : 'Certificates'}
                  </div>

                </div>

                {/* =====================================
                    CERTIFICATE GRID
                ====================================== */}

                <div className="certificates-grid">

                  {certs.map(
                    (certificate, index) => (
                      <article
                        key={certificate._id}
                        className="certificate-card"
                        style={{
                          '--card-delay': `${index * 0.08}s`
                        }}
                      >

                        {/* Card top accent */}
                        <div className="card-accent" />

                        {/* =================================
                            IMAGE
                        ================================== */}

                        <div className="certificate-image-container">

                          <div className="image-background-grid" />

                          <img
                            src={
                              certificate.imageUrl ||
                              FALLBACK_IMAGE
                            }
                            alt={`${certificate.title} certificate`}
                            className="certificate-image"
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.onerror =
                                null

                              event.currentTarget.src =
                                FALLBACK_IMAGE
                            }}
                          />

                          <div className="image-overlay" />

                          {/* Verified */}
                          <div className="verified-badge">
                            <ShieldCheck size={13} />
                            <span>Verified</span>
                          </div>

                          {/* Certificate number */}
                          <div className="certificate-number">
                            #{String(index + 1).padStart(2, '0')}
                          </div>

                          {/* View */}
                          <button
                            type="button"
                            className="image-view-button"
                            onClick={() =>
                              setSelectedCertificate(
                                certificate
                              )
                            }
                            aria-label={`View ${certificate.title}`}
                          >
                            <Eye size={16} />
                            <span>
                              View Certificate
                            </span>
                          </button>

                        </div>

                        {/* =================================
                            CONTENT
                        ================================== */}

                        <div className="certificate-content">

                          {/* Issuer */}

                          <div className="certificate-issuer">

                            <span className="issuer-icon">
                              <BadgeCheck size={12} />
                            </span>

                            <span>
                              {certificate.issuer ||
                                'Professional Certification'}
                            </span>

                          </div>

                          {/* Title */}

                          <h3 className="certificate-title">
                            {certificate.title}
                          </h3>

                          {/* Date */}

                          <div className="certificate-date">
                            <Calendar size={14} />

                            <span>
                              Issued{' '}
                              {formatCertificateDate(
                                certificate.date
                              )}
                            </span>
                          </div>

                          <div className="certificate-divider" />

                          {/* Actions */}

                          <div className="certificate-actions">

                            {certificate.credentialUrl &&
                              certificate.credentialUrl !==
                                '#' && (
                                <a
                                  href={
                                    certificate.credentialUrl
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="verify-button"
                                >
                                  <ShieldCheck
                                    size={14}
                                  />

                                  <span>
                                    Verify
                                  </span>

                                  <ArrowUpRight
                                    size={14}
                                  />
                                </a>
                              )}

                            <button
                              type="button"
                              className="view-certificate-button"
                              onClick={() =>
                                setSelectedCertificate(
                                  certificate
                                )
                              }
                            >
                              <Eye size={14} />

                              <span>
                                Preview
                              </span>
                            </button>

                          </div>

                        </div>

                      </article>
                    )
                  )}

                </div>

              </>
            )}

        </div>
      </section>

      {/* ============================================
          CERTIFICATE MODAL
      ============================================= */}

      {selectedCertificate && (
        <div
          className="certificate-modal"
          onClick={() =>
            setSelectedCertificate(null)
          }
        >

          <div
            className="certificate-modal-content"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Modal Header */}

            <div className="modal-header">

              <div className="modal-heading">

                <div className="modal-heading-icon">
                  <Award size={17} />
                </div>

                <div>
                  <span className="modal-label">
                    VERIFIED CREDENTIAL
                  </span>

                  <h3>
                    {selectedCertificate.title}
                  </h3>
                </div>

              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() =>
                  setSelectedCertificate(null)
                }
                aria-label="Close certificate preview"
              >
                <X size={19} />
              </button>

            </div>

            {/* Image */}

            <div className="modal-image-wrapper">

              <div className="modal-image-grid" />

              <img
                src={
                  selectedCertificate.imageUrl ||
                  FALLBACK_IMAGE
                }
                alt={
                  selectedCertificate.title
                }
                className="modal-certificate-image"
              />

            </div>

            {/* Footer */}

            <div className="modal-footer">

              <div className="modal-info">

                <div className="modal-issuer">
                  <BadgeCheck size={15} />
                  <span>
                    {selectedCertificate.issuer}
                  </span>
                </div>

                <div className="modal-date">
                  <Calendar size={13} />
                  <span>
                    Issued{' '}
                    {formatCertificateDate(
                      selectedCertificate.date
                    )}
                  </span>
                </div>

              </div>

              {selectedCertificate.credentialUrl &&
                selectedCertificate.credentialUrl !==
                  '#' && (
                  <a
                    href={
                      selectedCertificate.credentialUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-verify-button"
                  >
                    <ShieldCheck size={15} />
                    Verify Credential
                    <ExternalLink size={14} />
                  </a>
                )}

            </div>

          </div>

        </div>
      )}

      {/* ============================================
          STYLES
      ============================================= */}

      <style>{`

        /* ==================================================
           MAIN SECTION
        ================================================== */

        .certificates-section {
          position: relative;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(124, 58, 237, 0.08),
              transparent 28%
            ),
            radial-gradient(
              circle at 85% 70%,
              rgba(6, 182, 212, 0.055),
              transparent 30%
            ),
            linear-gradient(
              180deg,
              #08080d 0%,
              #0a0a11 50%,
              #08080d 100%
            );
        }

        .cert-container {
          position: relative;
          z-index: 3;
        }

        /* ==================================================
           PROFESSIONAL BACKGROUND
        ================================================== */

        .cert-bg-grid {
          position: absolute;
          inset: 0;

          opacity: 0.22;

          background-image:
            linear-gradient(
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            );

          background-size: 55px 55px;

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 18%,
              black 82%,
              transparent
            );

          pointer-events: none;
        }

        .cert-glow {
          position: absolute;

          width: 420px;
          height: 420px;

          border-radius: 50%;

          filter: blur(80px);

          pointer-events: none;

          opacity: 0.16;
        }

        .cert-glow-one {
          top: -180px;
          left: -180px;

          background:
            rgba(124,58,237,0.8);
        }

        .cert-glow-two {
          right: -200px;
          bottom: -180px;

          background:
            rgba(6,182,212,0.55);
        }

        .cert-orbit {
          position: absolute;

          border: 1px solid
            rgba(139,92,246,0.08);

          border-radius: 50%;

          pointer-events: none;
        }

        .cert-orbit-one {
          width: 480px;
          height: 480px;

          top: -240px;
          right: -180px;
        }

        .cert-orbit-two {
          width: 340px;
          height: 340px;

          bottom: -210px;
          left: -170px;

          border-color:
            rgba(6,182,212,0.07);
        }

        /* ==================================================
           HEADER
        ================================================== */

        .certificate-header {
          position: relative;
          z-index: 2;
        }

        .certificate-header .section-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        /* ==================================================
           SUMMARY
        ================================================== */

        .credential-summary {
          display: flex;
          align-items: center;

          width: 100%;

          margin-bottom: 34px;
          padding: 18px 22px;

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.045),
              rgba(255,255,255,0.018)
            );

          border: 1px solid
            rgba(255,255,255,0.075);

          border-radius: 16px;

          backdrop-filter: blur(14px);

          box-shadow:
            0 18px 50px rgba(0,0,0,0.18);
        }

        .summary-item {
          display: flex;
          align-items: center;
          gap: 11px;

          min-width: 155px;
        }

        .summary-icon {
          width: 39px;
          height: 39px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;
        }

        .summary-icon.purple {
          color: #c4b5fd;

          background:
            rgba(124,58,237,0.12);

          border: 1px solid
            rgba(124,58,237,0.2);
        }

        .summary-icon.green {
          color: #6ee7b7;

          background:
            rgba(16,185,129,0.1);

          border: 1px solid
            rgba(16,185,129,0.2);
        }

        .summary-icon.blue {
          color: #67e8f9;

          background:
            rgba(6,182,212,0.1);

          border: 1px solid
            rgba(6,182,212,0.2);
        }

        .summary-item div:last-child {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .summary-item strong {
          color: var(--text-primary);

          font-size: 0.95rem;
          font-weight: 700;
        }

        .summary-item span {
          color: var(--text-muted);

          font-size: 0.68rem;
        }

        .summary-divider {
          width: 1px;
          height: 34px;

          margin: 0 22px;

          background:
            rgba(255,255,255,0.08);
        }

        .summary-message {
          display: flex;
          align-items: center;
          gap: 7px;

          margin-left: auto;

          color: var(--text-muted);

          font-size: 0.72rem;
        }

        .summary-message svg {
          color: #a78bfa;
        }

        /* ==================================================
           TOOLBAR
        ================================================== */

        .certificate-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-bottom: 18px;
        }

        .toolbar-left {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .verified-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;

          color: #6ee7b7;

          font-size: 0.73rem;
          font-weight: 600;
        }

        .toolbar-dot {
          color: var(--text-muted);

          opacity: 0.5;
        }

        .toolbar-description {
          color: var(--text-muted);

          font-size: 0.72rem;
        }

        .certificate-count {
          display: inline-flex;
          align-items: center;
          gap: 6px;

          color: var(--text-muted);

          font-size: 0.72rem;
        }

        /* ==================================================
           GRID
        ================================================== */

        .certificates-grid {
          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap: 22px;
        }

        /* ==================================================
           CARD
        ================================================== */

        .certificate-card {
          position: relative;

          display: flex;
          flex-direction: column;

          min-width: 0;

          overflow: hidden;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.055),
              rgba(255,255,255,0.014)
            );

          border:
            1px solid rgba(255,255,255,0.08);

          border-radius: 18px;

          box-shadow:
            0 18px 50px
            rgba(0,0,0,0.22);

          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;

          animation:
            certificateAppear 0.55s ease both;

          animation-delay:
            var(--card-delay);
        }

        .certificate-card:hover {
          transform: translateY(-7px);

          border-color:
            rgba(139,92,246,0.38);

          box-shadow:
            0 28px 65px
            rgba(0,0,0,0.38),
            0 0 35px
            rgba(124,58,237,0.08);
        }

        @keyframes certificateAppear {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ==================================================
           CARD ACCENT
        ================================================== */

        .card-accent {
          position: absolute;

          top: 0;
          left: 18px;
          right: 18px;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(139,92,246,0.6),
              rgba(6,182,212,0.35),
              transparent
            );

          opacity: 0.7;

          z-index: 5;
        }

        /* ==================================================
           IMAGE
        ================================================== */

        .certificate-image-container {
          position: relative;

          height: 225px;

          display: flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;

          padding: 20px;

          background:
            radial-gradient(
              circle at center,
              rgba(124,58,237,0.13),
              transparent 58%
            ),
            #0b0b12;
        }

        .image-background-grid {
          position: absolute;
          inset: 0;

          opacity: 0.24;

          background-image:
            linear-gradient(
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            );

          background-size: 26px 26px;

          pointer-events: none;
        }

        .certificate-image {
          position: relative;
          z-index: 2;

          width: 100%;
          height: 100%;

          object-fit: contain;

          border-radius: 7px;

          filter:
            drop-shadow(
              0 12px 25px
              rgba(0,0,0,0.48)
            );

          transition:
            transform 0.45s ease,
            filter 0.45s ease;
        }

        .certificate-card:hover
        .certificate-image {
          transform: scale(1.045);

          filter:
            drop-shadow(
              0 16px 30px
              rgba(0,0,0,0.58)
            );
        }

        .image-overlay {
          position: absolute;
          inset: 0;

          z-index: 3;

          pointer-events: none;

          background:
            linear-gradient(
              to bottom,
              transparent 45%,
              rgba(5,5,9,0.72) 100%
            );
        }

        /* ==================================================
           VERIFIED BADGE
        ================================================== */

        .verified-badge {
          position: absolute;

          top: 13px;
          right: 13px;

          z-index: 6;

          display: flex;
          align-items: center;
          gap: 5px;

          padding: 6px 10px;

          border-radius: 999px;

          color: #6ee7b7;

          background:
            rgba(7,31,25,0.72);

          border:
            1px solid
            rgba(16,185,129,0.3);

          backdrop-filter: blur(10px);

          font-size: 0.67rem;
          font-weight: 700;
        }

        /* ==================================================
           CERTIFICATE NUMBER
        ================================================== */

        .certificate-number {
          position: absolute;

          top: 15px;
          left: 15px;

          z-index: 6;

          color: rgba(255,255,255,0.45);

          font-size: 0.64rem;

          font-family:
            ui-monospace,
            SFMono-Regular,
            Menlo,
            monospace;

          letter-spacing: 0.08em;
        }

        /* ==================================================
           IMAGE VIEW BUTTON
        ================================================== */

        .image-view-button {
          position: absolute;

          left: 50%;
          bottom: 16px;

          z-index: 7;

          display: flex;
          align-items: center;
          gap: 7px;

          padding: 9px 14px;

          border:
            1px solid
            rgba(255,255,255,0.16);

          border-radius: 9px;

          background:
            rgba(8,8,13,0.76);

          color: white;

          backdrop-filter: blur(12px);

          cursor: pointer;

          opacity: 0;

          transform:
            translate(-50%, 9px);

          transition:
            opacity 0.25s ease,
            transform 0.25s ease,
            background 0.25s ease;

          font-size: 0.7rem;
          font-weight: 600;
        }

        .certificate-card:hover
        .image-view-button {
          opacity: 1;

          transform:
            translate(-50%, 0);
        }

        .image-view-button:hover {
          background:
            rgba(124,58,237,0.8);

          border-color:
            rgba(167,139,250,0.5);
        }

        /* ==================================================
           CONTENT
        ================================================== */

        .certificate-content {
          display: flex;
          flex-direction: column;

          flex: 1;

          padding: 20px 20px 19px;
        }

        /* ==================================================
           ISSUER
        ================================================== */

        .certificate-issuer {
          display: flex;
          align-items: center;
          gap: 7px;

          margin-bottom: 9px;

          color: #a78bfa;

          font-size: 0.67rem;
          font-weight: 700;

          text-transform: uppercase;

          letter-spacing: 0.09em;
        }

        .issuer-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          width: 21px;
          height: 21px;

          border-radius: 6px;

          background:
            rgba(124,58,237,0.12);

          border:
            1px solid
            rgba(124,58,237,0.22);
        }

        /* ==================================================
           TITLE
        ================================================== */

        .certificate-title {
          min-height: 48px;

          margin: 0;

          color: var(--text-primary);

          font-family:
            var(--font-display);

          font-size: 1.02rem;

          font-weight: 700;

          line-height: 1.42;
        }

        /* ==================================================
           DATE
        ================================================== */

        .certificate-date {
          display: flex;
          align-items: center;
          gap: 7px;

          margin-top: 12px;

          color: var(--text-muted);

          font-size: 0.73rem;
        }

        /* ==================================================
           DIVIDER
        ================================================== */

        .certificate-divider {
          height: 1px;

          margin: 16px 0 15px;

          background:
            linear-gradient(
              90deg,
              rgba(255,255,255,0.09),
              transparent
            );
        }

        /* ==================================================
           ACTIONS
        ================================================== */

        .certificate-actions {
          display: flex;
          gap: 8px;

          margin-top: auto;
        }

        .verify-button,
        .view-certificate-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 6px;

          min-height: 37px;

          padding: 0 11px;

          border-radius: 9px;

          font-size: 0.7rem;
          font-weight: 600;

          text-decoration: none;

          cursor: pointer;

          transition:
            transform 0.2s ease,
            background 0.2s ease,
            border-color 0.2s ease,
            color 0.2s ease;
        }

        .verify-button {
          flex: 1;

          color: white;

          background:
            linear-gradient(
              135deg,
              var(--accent),
              var(--accent-2)
            );

          border:
            1px solid transparent;
        }

        .verify-button:hover {
          transform: translateY(-2px);

          box-shadow:
            0 8px 20px
            rgba(124,58,237,0.22);
        }

        .view-certificate-button {
          flex: 1;

          color: var(--text-secondary);

          background:
            rgba(255,255,255,0.035);

          border:
            1px solid
            rgba(255,255,255,0.09);
        }

        .view-certificate-button:hover {
          color: white;

          background:
            rgba(255,255,255,0.075);

          border-color:
            rgba(255,255,255,0.18);
        }

        /* ==================================================
           SKELETON
        ================================================== */

        .certificate-skeleton {
          overflow: hidden;

          border-radius: 18px;

          background:
            rgba(255,255,255,0.025);

          border:
            1px solid
            rgba(255,255,255,0.06);
        }

        .skeleton-image {
          height: 225px;

          background:
            linear-gradient(
              90deg,
              rgba(255,255,255,0.025),
              rgba(255,255,255,0.08),
              rgba(255,255,255,0.025)
            );

          background-size: 200% 100%;

          animation:
            skeletonLoading 1.5s infinite;
        }

        .skeleton-content {
          padding: 20px;
        }

        .skeleton-line {
          width: 80%;
          height: 13px;

          margin-bottom: 11px;

          border-radius: 6px;

          background:
            rgba(255,255,255,0.06);
        }

        .skeleton-line.tiny {
          width: 30%;
        }

        .skeleton-line.short {
          width: 55%;
        }

        .skeleton-date {
          width: 38%;
          height: 10px;

          margin-top: 15px;

          border-radius: 5px;

          background:
            rgba(255,255,255,0.045);
        }

        .skeleton-buttons {
          display: flex;
          gap: 8px;

          margin-top: 22px;
        }

        .skeleton-buttons div {
          flex: 1;

          height: 37px;

          border-radius: 8px;

          background:
            rgba(255,255,255,0.055);
        }

        @keyframes skeletonLoading {
          0% {
            background-position: 200% 0;
          }

          100% {
            background-position: -200% 0;
          }
        }

        /* ==================================================
           ERROR
        ================================================== */

        .certificate-error {
          display: flex;
          align-items: center;

          gap: 14px;

          padding: 18px 20px;

          border-radius: 15px;

          background:
            rgba(239,68,68,0.045);

          border:
            1px solid
            rgba(239,68,68,0.15);
        }

        .error-icon {
          width: 43px;
          height: 43px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 11px;

          color: #f87171;

          background:
            rgba(239,68,68,0.1);
        }

        .error-content {
          flex: 1;
        }

        .error-label {
          display: block;

          margin-bottom: 3px;

          color: #f87171;

          font-size: 0.62rem;
          font-weight: 700;

          letter-spacing: 0.08em;
        }

        .error-content h3 {
          margin: 0 0 3px;

          color: var(--text-primary);

          font-size: 0.88rem;
        }

        .error-content p {
          margin: 0;

          color: var(--text-muted);

          font-size: 0.76rem;
        }

        .retry-button {
          display: inline-flex;
          align-items: center;

          gap: 6px;

          padding: 8px 13px;

          border-radius: 8px;

          border:
            1px solid
            rgba(255,255,255,0.1);

          background:
            rgba(255,255,255,0.04);

          color: var(--text-secondary);

          cursor: pointer;

          font-size: 0.73rem;
        }

        .retry-button:hover {
          color: white;

          background:
            rgba(255,255,255,0.08);
        }

        /* ==================================================
           EMPTY
        ================================================== */

        .certificate-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;

          padding: 70px 20px;

          border:
            1px dashed
            rgba(255,255,255,0.1);

          border-radius: 18px;

          background:
            rgba(255,255,255,0.015);
        }

        .empty-icon {
          width: 66px;
          height: 66px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 15px;

          border-radius: 18px;

          color: #a78bfa;

          background:
            rgba(124,58,237,0.09);

          border:
            1px solid
            rgba(124,58,237,0.18);
        }

        .empty-label {
          margin-bottom: 6px;

          color: var(--accent-light);

          font-size: 0.63rem;
          font-weight: 700;

          letter-spacing: 0.12em;
        }

        .certificate-empty h3 {
          margin: 0 0 6px;

          color: var(--text-primary);

          font-size: 1.05rem;
        }

        .certificate-empty p {
          max-width: 400px;

          margin: 0;

          color: var(--text-muted);

          font-size: 0.8rem;

          line-height: 1.6;
        }

        /* ==================================================
           MODAL
        ================================================== */

        .certificate-modal {
          position: fixed;

          inset: 0;

          z-index: 9999;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 24px;

          background:
            rgba(0,0,0,0.84);

          backdrop-filter: blur(14px);

          animation:
            modalFadeIn 0.2s ease;
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        .certificate-modal-content {
          width: min(950px, 100%);

          max-height: 94vh;

          overflow: auto;

          background:
            #0e0e15;

          border:
            1px solid
            rgba(255,255,255,0.12);

          border-radius: 19px;

          box-shadow:
            0 35px 110px
            rgba(0,0,0,0.7);

          animation:
            modalSlideUp 0.25s ease;
        }

        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform:
              translateY(18px)
              scale(0.985);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }

        /* ==================================================
           MODAL HEADER
        ================================================== */

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;

          padding: 18px 21px;

          border-bottom:
            1px solid
            rgba(255,255,255,0.07);
        }

        .modal-heading {
          display: flex;
          align-items: center;

          gap: 11px;
        }

        .modal-heading-icon {
          width: 36px;
          height: 36px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 9px;

          color: #c4b5fd;

          background:
            rgba(124,58,237,0.12);

          border:
            1px solid
            rgba(124,58,237,0.22);
        }

        .modal-label {
          display: block;

          margin-bottom: 3px;

          color: var(--accent-light);

          font-size: 0.6rem;
          font-weight: 700;

          letter-spacing: 0.11em;
        }

        .modal-header h3 {
          margin: 0;

          color: var(--text-primary);

          font-size: 0.98rem;
        }

        .modal-close {
          width: 36px;
          height: 36px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 9px;

          border:
            1px solid
            rgba(255,255,255,0.09);

          background:
            rgba(255,255,255,0.035);

          color: var(--text-secondary);

          cursor: pointer;

          transition:
            background 0.2s ease,
            color 0.2s ease;
        }

        .modal-close:hover {
          color: white;

          background:
            rgba(255,255,255,0.09);
        }

        /* ==================================================
           MODAL IMAGE
        ================================================== */

        .modal-image-wrapper {
          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          min-height: 420px;

          padding: 28px;

          overflow: hidden;

          background:
            radial-gradient(
              circle at center,
              rgba(124,58,237,0.1),
              transparent 62%
            );
        }

        .modal-image-grid {
          position: absolute;
          inset: 0;

          opacity: 0.18;

          background-image:
            linear-gradient(
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            );

          background-size: 35px 35px;

          pointer-events: none;
        }

        .modal-certificate-image {
          position: relative;
          z-index: 2;

          max-width: 100%;
          max-height: 62vh;

          object-fit: contain;

          border-radius: 8px;

          box-shadow:
            0 25px 60px
            rgba(0,0,0,0.55);
        }

        /* ==================================================
           MODAL FOOTER
        ================================================== */

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 18px;

          padding: 16px 21px;

          border-top:
            1px solid
            rgba(255,255,255,0.07);
        }

        .modal-info {
          display: flex;
          flex-direction: column;

          gap: 5px;
        }

        .modal-issuer {
          display: flex;
          align-items: center;

          gap: 6px;

          color: var(--text-secondary);

          font-size: 0.77rem;
          font-weight: 600;
        }

        .modal-issuer svg {
          color: #6ee7b7;
        }

        .modal-date {
          display: flex;
          align-items: center;

          gap: 6px;

          color: var(--text-muted);

          font-size: 0.7rem;
        }

        .modal-verify-button {
          display: inline-flex;
          align-items: center;

          gap: 7px;

          padding: 9px 14px;

          border-radius: 9px;

          color: white;

          background:
            linear-gradient(
              135deg,
              var(--accent),
              var(--accent-2)
            );

          text-decoration: none;

          font-size: 0.73rem;
          font-weight: 600;

          white-space: nowrap;

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .modal-verify-button:hover {
          transform: translateY(-2px);

          box-shadow:
            0 8px 22px
            rgba(124,58,237,0.25);
        }

        /* ==================================================
           TABLET
        ================================================== */

        @media (max-width: 1050px) {

          .certificates-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .summary-message {
            display: none;
          }

          .summary-divider {
            margin: 0 15px;
          }

        }

        /* ==================================================
           MOBILE
        ================================================== */

        @media (max-width: 700px) {

          .certificates-grid {
            grid-template-columns: 1fr;
          }

          .credential-summary {
            display: grid;

            grid-template-columns:
              repeat(2, 1fr);

            gap: 15px;
          }

          .summary-divider {
            display: none;
          }

          .summary-item {
            min-width: 0;
          }

          .certificate-toolbar {
            flex-direction: column;

            align-items: flex-start;

            gap: 9px;
          }

          .toolbar-description,
          .toolbar-dot {
            display: none;
          }

          .certificate-image-container {
            height: 245px;
          }

          .certificate-actions {
            flex-direction: row;
          }

          .certificate-error {
            flex-wrap: wrap;
          }

          .retry-button {
            width: 100%;

            justify-content: center;
          }

          .certificate-modal {
            padding: 10px;
          }

          .modal-image-wrapper {
            min-height: 300px;

            padding: 15px;
          }

          .modal-certificate-image {
            max-height: 55vh;
          }

          .modal-footer {
            flex-direction: column;

            align-items: stretch;
          }

          .modal-verify-button {
            justify-content: center;
          }

        }

        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (max-width: 430px) {

          .credential-summary {
            grid-template-columns: 1fr;
          }

          .summary-item {
            width: 100%;
          }

          .certificate-actions {
            flex-direction: column;
          }

          .verify-button,
          .view-certificate-button {
            width: 100%;
          }

          .certificate-image-container {
            height: 220px;
          }

        }

        /* ==================================================
           TOUCH DEVICES
        ================================================== */

        @media (hover: none) {

          .image-view-button {
            opacity: 1;

            transform:
              translate(-50%, 0);
          }

          .certificate-card:hover {
            transform: none;
          }

          .certificate-card:hover
          .certificate-image {
            transform: none;
          }

        }

        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (prefers-reduced-motion: reduce) {

          .certificate-card,
          .certificate-image,
          .image-view-button {
            animation: none;
            transition: none;
          }

        }

      `}</style>
    </>
  )
}

/* =========================================================
   DATE FORMATTER
========================================================= */

function formatCertificateDate(date) {
  if (!date) {
    return 'Date not available'
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return parsedDate.toLocaleDateString(
    'en-US',
    {
      month: 'long',
      year: 'numeric'
    }
  )
}