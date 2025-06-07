"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { PlayIcon, UnlockIcon } from "lucide-react";
import AddOptions from "./AddOptions";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MusicPlayer from "../audio/MusicPlayer";
import { toast } from "sonner";

export function VaultView({ vaultData }) {
  return (
    <Card className="border-none shadow-none">
      <AddOptions vaultId={vaultData._id} />
      <CardHeader>
        <CardTitle className="text-green-600 text-xl flex items-center gap-2">
          <Badge className="mb-2">
            <UnlockIcon size={14} />
            <p>Vault Unlocked</p>
          </Badge>
        </CardTitle>
        <CardDescription className="font-medium">
          <div className="mb-1">
            <Label>About </Label>
          </div>
          <div>{vaultData.description}</div>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline">{vaultData.vaultType}</Badge>
          <Badge>{vaultData.category}</Badge>
          <Badge variant="secondary">
            Access Count: {vaultData.accessCount}
          </Badge>
        </div>

        <Tabs defaultValue="info" className="min-h-96">
          <TabsList className="w-full">
            <TabsTrigger className="cursor-pointer px-4" value="info">
              Info
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer px-4" value="photos">
              Photos
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer px-4" value="audios">
              Audios
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer px-4" value="notes">
              Notes
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer px-4" value="stats">
              Stats
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer px-4" value="meta">
              Meta
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <div className="mt-4 p-2 text-sm font-medium flex flex-col gap-4">
              <div>
                <Label className="mb-0.5">Vault Name</Label>
                <p>{vaultData.title}</p>
              </div>
              <div>
                <Label className="mb-0.5">Description</Label>
                <p>{vaultData?.description}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="photos">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {vaultData.photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo.photoLink}
                    alt={photo.title}
                    className="rounded-md w-full h-40 object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
                    onClick={async () => {
                      const res = await fetch(
                        `/api/vaults/${vaultData._id}/delete-photo`,
                        {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            photoName: photo.photoLink.split("/").pop(),
                          }),
                        }
                      );

                      const data = await res.json();
                      if (res.ok) {
                        toast.success("Photo deleted successfully");
                      } else {
                        toast.success("Photo not deleted");
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="audios">
            <div className="mt-4 p-2 text-sm font-medium flex flex-col gap-4">
              {vaultData.audios?.length > 0 ? (
                vaultData.audios.map((audio, index) => (
                  <div key={index}>
                    <MusicPlayer
                      audioUrl={audio.audioLink}
                      title={audio.title}
                      trigger={
                        <div className="flex items-center gap-2">
                          <p>{index + 1}.</p>
                          <Button
                            className="cursor-pointer"
                            variant="secondary"
                            size="icon"
                          >
                            <PlayIcon />
                          </Button>
                          <p>{audio.title}</p>
                        </div>
                      }
                    />
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No audio found.</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="notes">
            <div className="mt-4 p-2 text-sm font-medium flex flex-col gap-4 overflow-y-auto">
              {vaultData.notes?.length > 0 ? (
                vaultData.notes.map((note, index) => (
                  <div key={index} className="p-2 border-b">
                    <p className="font-medium text-sm underline underline-offset-2">
                      {index + 1}. {note.title}
                    </p>
                    <p className="text-xs mt-1">{note.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No notes found.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="mt-4 p-2 text-sm font-medium flex flex-col gap-4">
              <div>
                <Label className="mb-0.5">Photos</Label>
                <p>{vaultData.numberOfPhotos}</p>
              </div>
              <div>
                <Label className="mb-0.5">Audios</Label>
                <p>{vaultData.numberOfAudios}</p>
              </div>
              <div>
                <Label className="mb-0.5">Notes</Label>
                <p>{vaultData.numberOfNotes}</p>
              </div>
              <div>
                <Label className="mb-0.5">Failed Attempts</Label>
                <p>{vaultData.failedAttempts}</p>
              </div>
              <div>
                <Label className="mb-0.5">Locked</Label>
                <p>{vaultData.isLocked ? "Yes" : "No"}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="meta">
            <div className="mt-4 p-2 text-sm font-medium flex flex-col gap-4">
              <div>
                <Label className="mb-0.5">Created</Label>
                <p>{format(new Date(vaultData.createdAt), "PPPpp")}</p>
              </div>
              <div>
                <Label className="mb-0.5">Updated</Label>
                <p>{format(new Date(vaultData.updatedAt), "PPPpp")}</p>
              </div>
              <div>
                <Label className="mb-0.5">Last Accessed</Label>
                <p>{format(new Date(vaultData.lastAccessedAt), "PPPpp")}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
