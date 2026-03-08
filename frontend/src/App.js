import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [photo, setPhoto] = useState(null);

  const API_URL = "http://localhost:5000/users";

  // READ
  const getUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetch:", err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // CREATE
  const addUser = async () => {
    if (!name || !email) {
      alert("Nama dan email harus diisi");
      return;
    }

    let imageUrl = "";

    if (photo) {
      const formData = new FormData();
      formData.append("photo", photo);

      const uploadRes = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();
      imageUrl = uploadData.imageUrl;
    }

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, photo: imageUrl }),
    });

    setName("");
    setEmail("");
    setPhoto(null);
    getUsers();
  };

  // DELETE
  const deleteUser = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    getUsers();
  };

  // UPDATE
  const updateUser = async () => {
    if (!name || !email) {
      alert("Nama dan email harus diisi");
      return;
    }

    await fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    setName("");
    setEmail("");   // reset email setelah update
    setEditId(null);
    getUsers();
  };

  return (
    <div className="container">
      <h1>💗 Halo selamat datang, silahkan isi daftar hadir ya 💗</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Masukkan nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Masukkan email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        {editId ? (
          <button onClick={updateUser}>Update</button>
        ) : (
          <button onClick={addUser}>Tambah</button>
        )}
      </div>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div>
              <p>{user.name}</p>
              <p>{user.email}</p>
              {user.photo && (
                <img
                  src={user.photo}
                  alt="user"
                  style={{
                    width: "120px",
                    borderRadius: "12px",
                    marginTop: "8px",
                  }}
                />
              )}
            </div>

            <div>
              <button
                className="edit"
                onClick={() => {
                  setName(user.name);
                  setEmail(user.email);  // isi form email saat edit
                  setEditId(user.id);
                }}
              >
                Edit
              </button>

              <button
                className="delete"
                onClick={() => deleteUser(user.id)}
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;