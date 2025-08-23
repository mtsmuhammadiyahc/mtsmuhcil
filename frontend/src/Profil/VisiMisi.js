import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./VisiMisi.css";

const VisiMisi = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/admin/profil")
      .then((res) => {
        setData(res.data.filter((item) => item.type === "visi-misi"));
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true }); // animasi 800ms, hanya sekali saat muncul
  }, []);

  const formatContent = (content) => {
    if (!content) return { visi: "", misi: [] };

    const [visiPart, ...misiPart] = content.split(/Misi/i);
    const misiList = misiPart
      .join(" ")
      .split(/\n|(?=\d+\.)/) // pecah di setiap newline atau angka tanpa membuangnya
      .map((m) => m.replace(/^\d+\.\s*/, "").trim()) // hapus angka manual di depan
      .filter(Boolean);

    return {
      visi: visiPart.trim(),
      misi: misiList.map((m) => m.trim())
    };
  };

  return (
    <div className="visimisi-container" data-aos="fade-up">
      <h1 className="visimisi-title">Visi & Misi</h1>
      {data.length > 0 ? (
        data.map((item, index) => {
          const { visi, misi } = formatContent(item.content);
          return (
            <div
              key={index}
              className="visimisi-content"
              data-aos="fade-up"
              data-aos-delay={index * 150} // jeda animasi antar item
            >
              <h2 className="visimisi-subtitle">{item.title}</h2>

              {/* Bagian Visi */}
              <h3 data-aos="fade-right">Visi</h3>
              <p data-aos="fade-right">{visi}</p>

              {/* Bagian Misi */}
              <h3 data-aos="fade-left">Misi</h3>
              <ol>
                {misi.map((point, i) => (
                  <li key={i} data-aos="fade-left" data-aos-delay={i * 100}>
                    {point}
                  </li>
                ))}
              </ol>

              {/* Gambar jika ada */}
              {item.image && (
                <img
                  src={`http://localhost:5001/uploads/${item.image}`}
                  alt={item.title}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    marginTop: "15px",
                    borderRadius: "8px"
                  }}
                  data-aos="zoom-in"
                />
              )}
            </div>
          );
        })
      ) : (
        <p>Belum ada data Visi & Misi.</p>
      )}
    </div>
  );
};

export default VisiMisi;
