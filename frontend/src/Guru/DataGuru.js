import React, { useEffect, useState } from "react";
import axios from "axios";

const DataGuru = () => {
  const [guru, setGuru] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/admin/guru")
      .then((res) => {
        const onlyGuru = res.data.filter(
          (item) => item.type === "Data Guru" // Sesuaikan field type di database
        );
        setGuru(onlyGuru);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Data Guru</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {guru.map((g, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
            <img
              src={`http://localhost:5001/uploads/${g.foto}`}
              alt={g.nama}
              style={{ width: "100%", height: "auto" }}
            />
            <h3>{g.nama}</h3>
            <p>Jabatan: {g.jabatan}</p>
            <p>Tahun Masuk: {g.tahun}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataGuru;
