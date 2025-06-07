"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function MusicPlayer({ audioUrl, title, trigger }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="bg-gradient-to-br bg-white border-none">
        <AlertDialogHeader className="text-center space-y-4">
          <div>
            <AlertDialogTitle className="text-xl font-bold">
              {title}
            </AlertDialogTitle>
          </div>
        </AlertDialogHeader>

        <AlertDialogDescription className="mt-4">
          <AudioPlayer
            autoPlay
            src={audioUrl}
            layout="stacked-reverse"
            className="rounded-lg overflow-hidden"
          />
        </AlertDialogDescription>

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
