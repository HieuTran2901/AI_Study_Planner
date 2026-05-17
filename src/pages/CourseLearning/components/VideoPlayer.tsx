interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  isSticky?: boolean;
}

export function VideoPlayer({
  videoUrl,
  title,
  isSticky = false,
}: VideoPlayerProps) {
  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
      <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden bg-black shadow-2xl ring-1 ring-white/10">
        <div className="aspect-video relative">
          <iframe
            src={videoUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/5 rounded-2xl lg:rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
