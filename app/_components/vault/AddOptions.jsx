"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Info, Plus } from "lucide-react";
import supabase from "../../_lib/supabase";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

function UploadDialog({ type, vaultId }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const endpointMap = {
      audio: `/api/vaults/${vaultId}/add-audio`,
      photo: `/api/vaults/${vaultId}/add-photo`,
      note: `/api/vaults/${vaultId}/add-note`,
    };

    const payload = { title };

    if (type === "note") {
      payload.content = content;
    } else if (file) {
      const folder = type === "audio" ? "vault-audios" : "vault-photos";
      const fileName = `${Math.random()}-${Date.now()}-${file.name}`;

      const { data, error } = await supabase.storage
        .from(folder)
        .upload(fileName, file);

      if (error) {
        toast.error("Upload Error!");

        return;
      }

      const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${folder}/${fileName}`;
      payload[`${type}Link`] = publicUrl;
    }

    const res = await fetch(endpointMap[type], {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.status === "success") {
      toast.success("Successfully uploaded data!");

      setOpen(false);
      setTitle("");
      setContent("");
      setFile(null);
    } else {
      toast.error("Failed to upload!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="cursor-pointer text-xs">
          Add {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Add {type.charAt(0).toUpperCase() + type.slice(1)}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {type === "note" ? (
            <Textarea
              placeholder="Enter note content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <Input
              type="file"
              accept={type === "photo" ? "image/*" : "audio/*"}
              onChange={(e) => setFile(e.target.files[0])}
            />
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} className="mt-4">
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AddOptions({ vaultId }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative ml-6">
      <div className="flex items-center gap-2">
        <Button
          className="cursor-pointer"
          variant="secondary"
          size="icon"
          onClick={() => setOpen(!open)}
        >
          <Plus />
        </Button>
        <Badge>
          <Info size={14} />
          <p>To view newly added items, please refresh or reopen the vault.</p>
        </Badge>
      </div>
      {open && (
        <div className="absolute flex items-center flex-wrap mt-2 bg-white dark:bg-black  border  rounded-xl shadow-xl p-2 z-10 gap-2">
          <UploadDialog type="audio" vaultId={vaultId} />
          <UploadDialog type="photo" vaultId={vaultId} />
          <UploadDialog type="note" vaultId={vaultId} />
        </div>
      )}
    </div>
  );
}
