import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, X, PlayCircle, Volume2, VolumeX } from 'lucide-react';
import { KioskModal } from '@/components/KioskModal';
import { EmptyState } from '@/components/LoadingSpinner';
import { mockVideos } from '@/lib/mocks';
import type { Video } from '@/types/kiosk';
import { Button } from '@/components/ui/button';

interface VideosPageProps {
    isOpen: boolean;
    onClose: () => void;
}

const getYoutubeEmbedUrl = (url: string) => {
    try {
        // youtu.be/<id>
        if (url.includes('youtu.be/')) {
            const id = url.split('youtu.be/')[1]?.split(/[?&]/)[0];
            return id ? `https://www.youtube.com/embed/${id}` : null;
        }

        // youtube.com/watch?v=<id>
        const u = new URL(url);
        if (u.hostname.includes('youtube.com')) {
            const id = u.searchParams.get('v');
            return id ? `https://www.youtube.com/embed/${id}` : null;
        }

        return null;
    } catch {
        return null;
    }
};


export function VideosPage({ isOpen, onClose }: VideosPageProps) {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleClose = () => {
        setSelectedVideo(null);
        setIsPlaying(false);
        onClose();
    };

    const handleBack = () => {
        setSelectedVideo(null);
        setIsPlaying(false);
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    // Mock video URL (placeholder)
    const placeholderVideoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';

    if (selectedVideo) {

        const embedUrl = selectedVideo.url ? getYoutubeEmbedUrl(selectedVideo.url) : null;

        return (
            <KioskModal
                isOpen={isOpen}
                onClose={handleClose}
                title={selectedVideo.title}
                showBackButton
                onBack={handleBack}
            >
                <div className="flex flex-col h-full">
                    {/* Video Player */}
                    <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-6">
                        {embedUrl ? (
                            <iframe
                                className="w-full h-full"
                                src={embedUrl}
                                title={selectedVideo.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <video
                                ref={videoRef}
                                src={selectedVideo.url || placeholderVideoUrl}
                                className="w-full h-full object-contain"
                                onClick={togglePlay}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                playsInline
                            />
                        )}

                        {/* Play overlay */}
                        {!embedUrl && !isPlaying && (
                            <div
                                className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                                onClick={togglePlay}
                            >
                                <div className="p-6 rounded-full bg-primary/90 text-primary-foreground">
                                    <Play className="w-12 h-12" />
                                </div>
                            </div>
                        )}

                        {/* Controls */}
                        {!embedUrl && (
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <div className="flex items-center justify-between">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={togglePlay}
                                        className="text-white hover:bg-white/20"
                                    >
                                        {isPlaying ? 'Pausar' : 'Reproducir'}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={toggleMute}
                                        className="text-white hover:bg-white/20"
                                    >
                                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Video Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-kiosk-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{selectedVideo.duration}</span>
                            <span className="mx-2">•</span>
                            <span className="px-2 py-1 bg-secondary rounded-md">{selectedVideo.category}</span>
                        </div>
                        <p className="text-kiosk-base text-foreground/90">
                            {selectedVideo.description}
                        </p>
                    </div>
                </div>
            </KioskModal>
        );
    }

    return (
        <KioskModal
            isOpen={isOpen}
            onClose={handleClose}
            title="Videos Tutoriales"
        >
            {mockVideos.length === 0 ? (
                <EmptyState
                    icon={<PlayCircle className="w-12 h-12" />}
                    title="No hay videos disponibles"
                    description="Los videos tutoriales se mostrarán aquí cuando estén disponibles."
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockVideos.map((video, index) => (
                        <motion.button
                            key={video.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setSelectedVideo(video)}
                            className="rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all touch-target focus-ring text-left group overflow-hidden"
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video bg-secondary">
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-tile-cyan/20 to-tile-blue/20">
                                    <PlayCircle className="w-12 h-12 text-white/60 group-hover:text-white transition-colors" />
                                </div>
                                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-kiosk-xs text-white">
                                    {video.duration}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <h3 className="text-kiosk-base font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                                    {video.title}
                                </h3>
                                <p className="text-kiosk-sm text-muted-foreground line-clamp-2">
                                    {video.description}
                                </p>
                                <span className="inline-block mt-2 px-2 py-0.5 bg-secondary/50 rounded text-kiosk-xs text-muted-foreground">
                                    {video.category}
                                </span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            )}
        </KioskModal>
    );
}