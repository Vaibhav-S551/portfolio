import { useState } from "react";
import axios from "axios";

export default function AdminCertificateUpload() {
  const [form, setForm] = useState({
    title: "",
    issuer: "",
    date: "",
    credentialUrl: "",
  });

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || ''

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please select a certificate image.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("issuer", form.issuer);
      formData.append("date", form.date);
      formData.append(
        "credentialUrl",
        form.credentialUrl
      );

      formData.append("image", image);

     const res = await axios.post(
  `${API_URL}/api/certificates`,
  formData
)

      console.log(
        "Certificate uploaded:",
        response.data
      );

      setMessage(
        "Certificate uploaded successfully!"
      );

      setForm({
        title: "",
        issuer: "",
        date: "",
        credentialUrl: "",
      });

      setImage(null);

      document.getElementById(
        "certificate-image"
      ).value = "";
    } catch (error) {
      console.error(
        "Certificate upload failed:",
        error
      );

      setMessage(
        error.response?.data?.message ||
          "Certificate upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Certificate</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Certificate title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="issuer"
          placeholder="Issuer"
          value={form.issuer}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="date"
          placeholder="Date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="credentialUrl"
          placeholder="Credential URL"
          value={form.credentialUrl}
          onChange={handleChange}
        />

        <input
          id="certificate-image"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleImageChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Uploading..."
            : "Upload Certificate"}
        </button>

        {message && (
          <p>{message}</p>
        )}
      </form>
    </div>
  );
}