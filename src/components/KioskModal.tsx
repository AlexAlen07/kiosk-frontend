import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';

interface KioskModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: ReactNode; // ADD
    children: ReactNode;
    showBackButton?: boolean;
    onBack?: () => void;
}

export function KioskModal({
    isOpen,
    onClose,
    title,
    children,
    showBackButton = false,
    onBack
}: KioskModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-4 md:inset-8 bg-card rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                            <div className="flex items-center gap-3">
                                {showBackButton && onBack && (
                                    <button
                                        onClick={onBack}
                                        className="touch-target focus-ring p-2 -ml-2 rounded-lg hover:bg-secondary/50 transition-colors"
                                        aria-label="Volver"
                                    >
                                        <ArrowLeft className="w-6 h-6 text-muted-foreground" />
                                    </button>
                                )}
                                <h2 className="text-kiosk-xl font-bold text-foreground">{title}</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="touch-target focus-ring p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                                aria-label="Cerrar"
                            >
                                <X className="w-6 h-6 text-muted-foreground" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
