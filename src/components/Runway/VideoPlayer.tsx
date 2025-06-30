"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Volume2,
  VolumeX,
  // Heart,
  //MessageCircle,
  //Share,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface VideoPlayerProps {
  src: string;
  products:
    | {
        created_at: string;
        id: string;
        product_id: string;
        runway_id: string;
      }[]
    | null[];
  title: string;
  description?: string;

  likes?: number;
  comments?: number;
  shares?: number;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
}

export default function VideoPlayer({
  src,
  title = "Amazing video content",
  products,
  description = "@user",
  // avatar = "/placeholder.svg?height=40&width=40",
  //likes = 1234,
  //comments = 567,
  //shares = 89,
  className,
  autoPlay = true,
  muted = true,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [progress, setProgress] = useState(0);
  // const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    };

    const handleEnded = () => {
      setProgress(0);
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    // Prevent triggering when clicking on buttons
    if ((e.target as HTMLElement).closest("button")) return;
    togglePlay();
  };

  /*   const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };
 */
  return (
    <div
      className={cn(
        "relative w-full h-screen bg-black overflow-hidden",
        className
      )}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover cursor-pointer"
        autoPlay={autoPlay}
        muted={muted}
        loop
        playsInline
        onClick={handleVideoClick}
      />

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-white transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Button
            size="icon"
            variant="ghost"
            className="w-20 h-20 rounded-full bg-black/50 hover:bg-black/70 text-white"
            onClick={togglePlay}
          >
            <Play className="w-10 h-10 fill-white" />
          </Button>
        </div>
      )}

      {/* Top Controls */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          size="icon"
          variant="ghost"
          className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white"
          onClick={toggleMute}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-6 left-4 right-20 z-10 text-white">
        {/* User Info */}
        <div className="flex gap-2.5">
          {products &&
            products.map((item) => {
              return (
                <div
                  onClick={() =>
                    router.push(`/dashboard/products/${item?.product_id}`)
                  }
                  className="cursor-pointer "
                  key={item?.id}
                >
                  <img
                    src={"/img/logo.png"}
                    alt="Product avatar"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                </div>
              );
            })}
        </div>
        <div className="flex items-center gap-3 mb-3">
          {/*    <img
            src={avatar || "/placeholder.svg"}
            alt="User avatar"
            className="w-10 h-10 rounded-full border-2 border-white"
          /> */}
          <p className="font-semibold text-sm">{title}</p>
          {/*  <Button
            size="sm"
            variant="outline"
            className="h-6 px-3 text-xs bg-transparent border-white text-white hover:bg-white hover:text-black"
          >
            Follow
          </Button> */}
        </div>

        {/* Video Title */}
        <p className="text-sm mb-2 line-clamp-2 pr-4">{description}</p>
      </div>

      {/* Right Side Actions */}
      <div className="absolute bottom-20 right-4 z-10 flex flex-col gap-6">
        {/* Like Button */}
        {/*  <div className="flex flex-col items-center">
          <Button
            size="icon"
            variant="ghost"
            className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 text-white"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={cn("w-6 h-6", isLiked && "fill-red-500 text-red-500")}
            />
          </Button>
          <span className="text-xs text-white mt-1">
            {formatCount(isLiked ? likes + 1 : likes)}
          </span>
        </div> */}

        {/* Comment Button */}
        {/*  <div className="flex flex-col items-center">
          <Button
            size="icon"
            variant="ghost"
            className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 text-white"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
          <span className="text-xs text-white mt-1">
            {formatCount(comments)}
          </span>
        </div> */}

        {/* Share Button */}
        {/*    <div className="flex flex-col items-center">
          <Button
            size="icon"
            variant="ghost"
            className="w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 text-white"
          >
            <Share className="w-6 h-6" />
          </Button>
          <span className="text-xs text-white mt-1">{formatCount(shares)}</span>
        </div> */}

        {/* Profile Music Disc */}
        {/*    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-0.5 animate-spin-slow">
          <img
            src={avatar || "/placeholder.svg"}
            alt="Music"
            className="w-full h-full rounded-full object-cover"
          />
        </div> */}
      </div>
    </div>
  );
}
