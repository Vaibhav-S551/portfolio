// AdminCertificateUpload.jsx
import { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://portfolio-o3jz.onrender.com";

export default function AdminCertificateUpload() {
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [date, setDate] = useState("");
  const [credentialUrl, setCredentialUrl] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !issuer || !date || !file) {
      setMessage("All required fields must be filled.");
      return;
    }

   const formData = new FormData();

formData.append("title", title.trim());
formData.append("issuer", issuer.trim());
formData.append("date", date);
formData.append("credentialUrl", credentialUrl.trim());
formData.append("image", file);

console.log([...formData.entries()]);

    try {
      const res = await axios.post(
        `${BASE_URL}/api/certificates`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Certificate uploaded successfully!");

      setTitle("");
      setIssuer("");
      setDate("");
      setCredentialUrl("");
      setFile(null);

      console.log(res.data);
    } catch (err) {
      console.error("UPLOAD ERROR:", err.response?.data || err.message);
      setMessage(
        err.response?.data?.message || "Upload failed. Check backend."
      );
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Upload Certificate</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Certificate Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Issuer"
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="url"
          placeholder="Credential URL (optional)"
          value={credentialUrl}
          onChange={(e) => setCredentialUrl(e.target.value)}
        />

        <br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <br /><br />

        <button type="submit">Upload Certificate</button>
      </form>

      {message && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
          {message}
        </p>
      )}
    </div>
  );
}