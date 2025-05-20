"use client"

import { useState } from "react";
import styles from "./MySearchInput.module.css";

interface MySearchInputProps {
  onSearch: (query: string) => void;
}

export default function MySearchInput({ onSearch }: MySearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className={styles.search_container}>
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Pesquisar</button>
    </div>
  );
}
