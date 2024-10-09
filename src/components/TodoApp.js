import React from "react";
import Nav from "./Nav";
import { Route, Routes, useSearchParams } from "react-router-dom";
import HomePageWrapper from "../pages/HomePage";
import AddPage from "../pages/AddPage";
import DetailPage from "../pages/DetailPage";
import NotFoundPage from "../pages/NotFoundPage";

// Komponen utama untuk aplikasi Todo
function TodoApp() {
  // Menggunakan hook useSearchParams untuk mendapatkan dan mengatur parameter pencarian dari URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Mendapatkan nilai dari parameter pencarian 'keyword' jika ada, atau memberikan nilai default sebagai string kosong
  const keyword = searchParams.get("keyword")
    ? searchParams.get("keyword")
    : "";

  // Fungsi untuk mengubah parameter pencarian 'keyword' di URL
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <div>
      {/* Menampilkan komponen Nav dengan meneruskan properti 'keyword' dan 'keywordChange' */}
      <Nav keyword={keyword} keywordChange={changeSearchParams} />

      {/* Menentukan rute untuk halaman yang berbeda di aplikasi menggunakan react-router-dom */}
      <Routes>
        {/* Rute ke halaman beranda yang juga menerima keyword sebagai properti */}
        <Route exact path="/" element={<HomePageWrapper keyword={keyword} />} />

        {/* Rute ke halaman tambah (AddPage) */}
        <Route path="/add" element={<AddPage />} />

        {/* Rute ke halaman detail dengan parameter id */}
        <Route path="/detail/:id" element={<DetailPage />} />

        {/* Rute untuk halaman tidak ditemukan */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default TodoApp;
