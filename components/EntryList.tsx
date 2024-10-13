import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Download, Eye, Pencil, Trash2, Plus } from "lucide-react";
import { Entry } from "../types";

interface EntryListProps {
  entries: Entry[];
  onView: (entry: Entry) => void;
  onEdit: (entry: Entry) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}

export default function EntryList({
  entries,
  onView,
  onEdit,
  onDelete,
  onAdd,
}: EntryListProps) {
  const downloadCSV = (entry?: Entry) => {
    const dataToDownload = entry ? [entry] : entries;
    const headers = Object.keys(entries[0]).join(",");
    const csv = [
      headers,
      ...dataToDownload.map((entry) => Object.values(entry).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        entry ? `${entry.name}_data.csv` : "all_data.csv"
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Entries</CardTitle>
          <div className="space-x-2">
            <Button
              onClick={onAdd}
              variant="outline"
              className="bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
            <Button
              onClick={() => downloadCSV()}
              variant="outline"
              className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download All
            </Button>
          </div>
        </div>
        <CardDescription>Manage and view all your entries</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.name}</TableCell>
                  <TableCell>{entry.email}</TableCell>
                  <TableCell>{entry.company}</TableCell>
                  <TableCell className="text-right">
                    <div className="space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(entry)}
                        className="text-blue-500 hover:text-blue-600 hover:bg-blue-100"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(entry)}
                        className="text-amber-500 hover:text-amber-600 hover:bg-amber-100"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the entry for {entry.name}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDelete(entry.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
