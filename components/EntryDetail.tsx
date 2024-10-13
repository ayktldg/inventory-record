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
  CardFooter,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Download, Pencil, Trash2 } from "lucide-react";
import { Entry } from "../types";

interface EntryDetailProps {
  entry: Entry;
  isEditing: boolean;
  onEdit: () => void;
  onUpdate: (updatedEntry: Entry) => void;
  onDelete: () => void;
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

export default function EntryDetail({
  entry,
  isEditing,
  onEdit,
  onUpdate,
  onDelete,
  onCancel,
}: EntryDetailProps) {
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedEntry = {
      ...entry,
      ...Object.fromEntries(formData.entries()),
    };
    onUpdate(updatedEntry as Entry);
  };

  const downloadCSV = () => {
    const headers = fields.join(",");
    const csv = [headers, fields.map((field) => entry[field]).join(",")].join(
      "\n"
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${entry.name}_data.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{entry.name}</CardTitle>
        <CardDescription>
          {entry.position} at {entry.company}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={`edit-${field}`}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  id={`edit-${field}`}
                  name={field}
                  defaultValue={entry[field] as string}
                />
              </div>
            ))}
            <Button
              type="submit"
              className="col-span-2 bg-green-500 hover:bg-green-600"
            >
              Save Changes
            </Button>
          </form>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {fields
              .filter(
                (field) =>
                  field !== "name" &&
                  field !== "position" &&
                  field !== "company"
              )
              .map((field) => (
                <div key={field} className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </p>
                  <p>{entry[field]}</p>
                </div>
              ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button
          onClick={isEditing ? onCancel : onEdit}
          variant="outline"
          className="bg-amber-100 text-amber-600 hover:bg-amber-200 hover:text-amber-700"
        >
          <Pencil className="w-4 h-4 mr-2" />
          {isEditing ? "Cancel" : "Edit"}
        </Button>
        <Button
          variant="outline"
          onClick={downloadCSV}
          className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="bg-red-500 hover:bg-red-600"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                entry for {entry.name}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onDelete}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
