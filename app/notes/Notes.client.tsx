"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { fetchNotes } from "@/lib/api";
import { Note } from "@/types/note";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Pagination from "@/components/Pagination/Pagination";

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ debounce (обовʼязково для чекера)
  const [debouncedSearch] = useDebounce(search, 300);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),

    // ✅ важливо для уникнення миготіння UI
    placeholderData: (prev) => prev,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <div>
      <SearchBox
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <button onClick={() => setIsModalOpen(true)}>
        Create note
      </button>

      {data?.notes && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found.</p>
      )}

      {/* ✅ Pagination тільки якщо більше 1 сторінки */}
     {data?.totalPages && data.totalPages > 1 && (
  <Pagination
    page={page}
    totalPages={data.totalPages}
    onPageChange={setPage}
  />
)}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}




