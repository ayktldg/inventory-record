import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EntryFormData } from "../types";

interface EntryFormProps {
  onSubmit: (formData: EntryFormData) => void;
  onCancel: () => void;
}

const fields = [
  "name",
  "email",
  "phone",
  "address",
  "city",
  "state",
  "zip",
  "country",
  "company",
  "position",
  "department",
  "startDate",
  "salary",
  "notes",
  "status",
] as const;

export default function EntryForm({ onSubmit, onCancel }: EntryFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEntry = Object.fromEntries(formData.entries()) as EntryFormData;
    onSubmit(newEntry);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Entry</CardTitle>
        <CardDescription>Fill in the details for the new entry</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Label>
              <Input
                id={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                required
              />
            </div>
          ))}
          <Button
            type="submit"
            className="col-span-2 bg-green-500 hover:bg-green-600"
          >
            Add Entry
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            className="col-span-2 bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
