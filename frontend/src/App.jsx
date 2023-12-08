// Impor React dan React Hooks
import React, { useState, useEffect } from "react";

// Impor Axios untuk permintaan API
import axios from "axios";

// Definisikan sebuah komponen kustom untuk aplikasi CRUD
function App() {
  // Definisikan variabel state untuk data, loading, error, dan input form
  // Variabel state digunakan untuk menyimpan nilai yang dapat berubah seiring waktu dan mempengaruhi tampilan komponen
  // useState hook digunakan untuk membuat dan mengubah variabel state dalam komponen fungsi
  // Elemen pertama dari array yang dikembalikan oleh useState adalah variabel state, dan elemen kedua adalah fungsi pengubah
  // Parameter yang dilewatkan ke useState adalah nilai awal dari variabel state
  
  // data adalah sebuah array dari objek user, setData adalah sebuah fungsi untuk mengubah data
  const [data, setData] = useState([]); 

  // loading adalah sebuah nilai boolean yang menunjukkan apakah aplikasi sedang mengambil data, setLoading adalah sebuah fungsi untuk mengubah loading
  const [loading, setLoading] = useState(false); 

  // error adalah sebuah nilai string yang menyimpan pesan kesalahan, setError adalah sebuah fungsi untuk mengubah error
  const [error, setError] = useState(null); 
  
  // name adalah sebuah nilai string yang menyimpan input nama user, setName adalah sebuah fungsi untuk mengubah name
  const [name, setName] = useState(""); 

  // age adalah sebuah nilai string yang menyimpan input umur user, setAge adalah sebuah fungsi untuk mengubah age
  const [age, setAge] = useState(""); 
  
  // id adalah sebuah nilai number yang menyimpan id user yang dipilih, setId adalah sebuah fungsi untuk mengubah id
  const [id, setId] = useState(null); 

  // Definisikan sebuah fungsi untuk mengambil data dari API
  const fetchData = async () => {
    try {
      setLoading(true); // Ubah loading menjadi true untuk menunjukkan bahwa aplikasi sedang mengambil data
      // Gunakan axios.get untuk mengirim permintaan GET ke API dan dapatkan responsnya
      const response = await axios.get("http://localhost:3000/api/users"); 
      setData(response.data); // Ubah data dengan data yang dikembalikan oleh API
      setLoading(false); // Ubah loading menjadi false untuk menunjukkan bahwa aplikasi selesai mengambil data
    } catch (err) {
      setError(err.message); // Ubah error dengan pesan kesalahan yang ditangkap oleh blok catch
      setLoading(false); // Ubah loading menjadi false untuk menunjukkan bahwa aplikasi selesai mengambil data
    }
  };

  // Definisikan sebuah fungsi untuk membuat user baru
  const createUser = async () => {
    try {
      setLoading(true); // Ubah loading menjadi true untuk menunjukkan bahwa aplikasi sedang mengirim data
      // Gunakan axios.post untuk mengirim permintaan POST ke API dengan data name dan age sebagai badan permintaan, dan dapatkan responsnya
      const response = await axios.post("http://localhost:3000/api/users", {
        name,
        age,
      }); 
      setData([...data, response.data]); // Ubah data dengan menambahkan data yang dikembalikan oleh API ke akhir array data
      setLoading(false); // Ubah loading menjadi false untuk menunjukkan bahwa aplikasi selesai mengirim data
      setName(""); // Kosongkan name untuk mengosongkan input form
      setAge(""); // Kosongkan age untuk mengosongkan input form
    } catch (err) {
      setError(err.message); // Ubah error dengan pesan kesalahan yang ditangkap oleh blok catch
      setLoading(false); // Ubah loading menjadi false untuk menunjukkan bahwa aplikasi selesai mengirim data
    }
  };

  // Definisikan sebuah fungsi untuk memperbarui user yang ada
  const updateUser = async () => {
    try {
      setLoading(true); // Ubah loading menjadi true untuk menunjukkan bahwa aplikasi sedang mengirim data
      // Gunakan axios.put untuk mengirim permintaan PUT ke API dengan data name dan age sebagai badan permintaan, 
      // dan id sebagai parameter rute, dan dapatkan responsnya
      const response = await axios.put(`http://localhost:3000/api/users/${id}`, {
        name,
        age,
      });
      setData(
        data.map((user) => (user.id === id ? response.data : user))
      ); // Ubah data dengan mengganti user yang memiliki id yang sama dengan id yang dipilih dengan data yang dikembalikan oleh API
      setLoading(false); // Ubah loading menjadi false untuk menunjukkan bahwa aplikasi selesai mengirim data
      setName(""); // Kosongkan name untuk mengosongkan input form
      setAge(""); // Kosongkan age untuk mengosongkan input form
      setId(null); // Kosongkan id untuk mengosongkan user yang dipilih
    } catch (err) {
      setError(err.message); // Ubah error dengan pesan kesalahan yang ditangkap oleh blok catch
      setLoading(false); // Ubah loading menjadi false untuk menunjukkan bahwa aplikasi selesai mengirim data
    }
  };

  // Definisikan sebuah fungsi untuk menghapus user
  const deleteUser = async (id) => {
    try {
      setLoading(true); // Ubah loading menjadi true untuk menunjukkan bahwa aplikasi sedang menghapus data
      // Gunakan axios.delete untuk mengirim permintaan DELETE ke API dengan id sebagai parameter rute
      await axios.delete(`http://localhost:3000/api/users/${id}`); 
      setData(data.filter((user) => user.id !== id)); // Ubah data dengan menghapus user yang memiliki id yang sama dengan id yang dipilih
      setLoading(false); // Ubah loading menjadi false untuk menunjukkan bahwa aplikasi selesai menghapus data
    } catch (err) {
      setError(err.message); // Ubah error dengan pesan kesalahan yang ditangkap oleh blok catch
      setLoading(false); // Ubah loading menjadi false untuk menunjukkan bahwa aplikasi selesai menghapus data
    }
  };

  // Definisikan sebuah fungsi untuk menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah perilaku default dari event submit, yaitu merefresh halaman
    if (id) {
      updateUser(); // Jika id ada, panggil fungsi updateUser untuk memperbarui user yang dipilih
    } else {
      createUser(); // Jika id tidak ada, panggil fungsi createUser untuk membuat user baru
    }
  };

  // Definisikan sebuah fungsi untuk menangani perubahan form
  const handleChange = (e) => {
    const { name, value } = e.target; // Dapatkan name dan value dari elemen yang memicu event change
    if (name === "name") {
      setName(value); // Jika name adalah "name", ubah name dengan value
    } else if (name === "age") {
      setAge(value); // Jika name adalah "age", ubah age dengan value
    }
  };

  // Definisikan sebuah fungsi untuk menangani klik tombol edit
  const handleEdit = (user) => {
    setName(user.name); // Ubah name dengan name dari user yang dipilih
    setAge(user.age); // Ubah age dengan age dari user yang dipilih
    setId(user.id); // Ubah id dengan id dari user yang dipilih
  };

  // Gunakan useEffect hook untuk mengambil data saat komponen dimuat
  // useEffect hook dapat menerima dua parameter, yaitu fungsi yang akan dijalankan setelah render, 
  // dan array yang berisi dependensi yang akan memicu fungsi tersebut
  // Jika array kosong, maka fungsi hanya akan dijalankan sekali saat komponen dimuat
  useEffect(() => {
    fetchData(); // Panggil fungsi fetchData untuk mengambil data dari API
  }, []); // Array kosong sebagai dependensi

  // Kembalikan elemen JSX untuk komponen
  return (
    <div className="crud-app">
      <h1>CRUD App with React JS</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          onChange={handleChange}
          required
        />
        <button type="submit">{id ? "Update" : "Create"}</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>} 
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}> 
              <td>{user.id}</td> 
              <td>{user.name}</td> 
              <td>{user.age}</td> 
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button> 
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Ekspor komponen
export default App;
