"use client";

import React, { useState, useEffect } from "react";
import { Entry, EntryFormData } from "../types";
import EntryList from "./EntryList";
import EntryForm from "./EntryForm";
import EntryDetail from "./EntryDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function DataManager() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<Entry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState<"list" | "form" | "detail">(
    "list"
  );

  useEffect(() => {
    const savedEntries = localStorage.getItem("entries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (formData: EntryFormData) => {
    const newEntry: Entry = {
      id: Date.now(),
      ...formData,
    };
    setEntries([...entries, newEntry]);
    setCurrentPage("list");
  };

  const handleUpdate = (updatedEntry: Entry) => {
    setEntries(
      entries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
    setIsEditing(false);
    setCurrentEntry(updatedEntry);
    setCurrentPage("list");
  };

  const handleDelete = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id));
    setCurrentPage("list");
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Data Manager</h1>
          {currentPage !== "list" && (
            <Button
              variant="ghost"
              onClick={() => setCurrentPage("list")}
              className="text-gray-500 hover:text-gray-600 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to List
            </Button>
          )}
        </div>
        {currentPage === "list" && (
          <EntryList
            entries={entries}
            onView={(entry) => {
              setCurrentEntry(entry);
              setCurrentPage("detail");
            }}
            onEdit={(entry) => {
              setCurrentEntry(entry);
              setIsEditing(true);
              setCurrentPage("detail");
            }}
            onDelete={handleDelete}
            onAdd={() => setCurrentPage("form")}
          />
        )}
        {currentPage === "form" && (
          <EntryForm
            onSubmit={handleSubmit}
            onCancel={() => setCurrentPage("list")}
          />
        )}
        {currentPage === "detail" && currentEntry && (
          <EntryDetail
            entry={currentEntry}
            isEditing={isEditing}
            onEdit={() => setIsEditing(true)}
            onUpdate={handleUpdate}
            onDelete={() => handleDelete(currentEntry.id)}
            onCancel={() => {
              setIsEditing(false);
              setCurrentPage("list");
            }}
          />
        )}
      </div>
    </div>
  );
}
