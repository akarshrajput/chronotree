"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Info, Lock, X } from "lucide-react";

const themeOptions = ["green", "yellow", "red", "blue", "orange"];

export default function CreateVault({ userId }) {
  const router = useRouter();

  const [vaultName, setVaultName] = useState("");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState("green");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!vaultName.trim()) {
      setError("Vault name is required");
      return;
    }

    if (password.length !== 6) {
      setError("Password must be 6 digits");
      return;
    }

    if (!userId) {
      setError("You must be logged in to create a vault");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/vaults", {
        title: vaultName,
        password,
        author: userId,
        theme,
        description,
        tags,
      });

      if (res.data.statusText === "success") {
        setSuccess("Vault created successfully!");
        setVaultName("");
        setPassword("");
        setTheme("green");
        setDescription("");
        setTags([]);
        router.push(`/vault/${res.data.data.newVault._id}`);
      } else {
        setError(res.data.message || "Failed to create vault");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }

    setLoading(false);
  };

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag) && tags.length < 5) {
      setTags([...tags, newTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-base font-semibold flex items-center gap-1 justify-center">
        <Lock size={16} />
        Create New Vault
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label className="mb-1 ml-1 font-medium" htmlFor="vaultName">
            Vault Name
          </Label>
          <Input
            id="vaultName"
            type="text"
            placeholder="Enter vault name"
            value={vaultName}
            onChange={(e) => setVaultName(e.target.value)}
            required
          />
        </div>

        <div>
          <Label className="mb-1 ml-1 font-medium" htmlFor="password">
            6-digit Password
          </Label>
          <Input
            id="password"
            type="password"
            maxLength={6}
            pattern="\d{6}"
            placeholder="Enter 6-digit password"
            value={password}
            onChange={(e) => setPassword(e.target.value.replace(/\D/g, ""))}
            required
          />
          <div className="flex mt-0.5 items-center gap-2 text-xs p-1 rounded-full font-medium w-fit">
            <Info size={14} />
            <p>Vault passwords can’t be recovered — remember them.</p>
          </div>
        </div>

        <div>
          <Label className="mb-1 ml-1 font-medium" htmlFor="theme">
            Theme
          </Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              {themeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-1 ml-1 font-medium" htmlFor="description">
            Description
          </Label>
          <Textarea
            className="resize-none"
            id="description"
            placeholder="Enter vault description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <Label className="mb-1 ml-1 font-medium">Tags (max 5)</Label>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Add a tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button
              className="cursor-pointer"
              type="button"
              onClick={handleAddTag}
              disabled={!tagInput.trim() || tags.length >= 5}
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap mt-2 gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="flex items-center gap-1"
              >
                {tag}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                />
              </Badge>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm text-center">{success}</p>
        )}

        <Button
          className="cursor-pointer font-semibold"
          type="submit"
          disabled={loading || password.length !== 6}
        >
          {loading ? "Creating..." : "Create Vault"}
        </Button>
      </form>
    </div>
  );
}
