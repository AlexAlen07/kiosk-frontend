import { motion } from 'framer-motion';
import {
    FileText,
    Users,
    ShieldCheck,
    GraduationCap,
    PlayCircle,
    ClipboardCheck,
    Award,
    HelpCircle,
    Leaf,
    Bot,
    LucideIcon
} from 'lucide-react';
import type { TileColor } from '@/types/kiosk';

const iconMap: Record<string, LucideIcon> = {
    policies: FileText,
    orientation: Users,
    safety: ShieldCheck,
    courses: GraduationCap,
    chatbot: Bot,
    videos: PlayCircle,
    quiz: ClipboardCheck,
    certificates: Award,
    help: HelpCircle,
    environment: Leaf,
};

const colorClasses: Record<TileColor, string> = {
    blue: 'kiosk-tile-blue',
    orange: 'kiosk-tile-orange',
    yellow: 'kiosk-tile-yellow',
    green: 'kiosk-tile-green',
    purple: 'kiosk-tile-purple',
    red: 'kiosk-tile-red',
    cyan: 'kiosk-tile-cyan',
    pink: 'kiosk-tile-pink',
    teal: 'kiosk-tile-teal',
};

interface KioskTileProps {
    id: string;
    label: string;
    icon: string;
    color: TileColor;
    onClick: () => void;
    index?: number;
}

export function KioskTile({ id, label, icon, color, onClick, index = 0 }: KioskTileProps) {
    const Icon = iconMap[icon] || FileText;
    const colorClass = colorClasses[color];

    return (
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: 'easeOut'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`kiosk-tile ${colorClass} touch-target focus-ring w-full aspect-square`}
            aria-label={label}
            role="button"
        >
            {/* Icon container */}
            <div className="relative">
                <Icon className="w-12 h-12 md:w-14 md:h-14 text-white drop-shadow-lg" strokeWidth={1.5} />
            </div>

            {/* Label */}
            <span className="text-kiosk-sm md:text-kiosk-base font-semibold text-white text-center leading-tight drop-shadow-md px-2">
                {label}
            </span>

            {/* Subtle overlay gradient for depth */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        </motion.button>
    );
}
