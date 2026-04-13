import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ message = 'Cargando...', size = 'md' }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-10 h-10',
        lg: 'w-14 h-14'
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-4 py-12"
        >
            <Loader2 className={`${sizeClasses[size]} text-primary animate-spin`} />
            <p className="text-kiosk-base text-muted-foreground">{message}</p>
        </motion.div>
    );
}

interface EmptyStateProps {
    icon: React.ReactNode;
    title: string;
    description?: string;
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-4 py-16 text-center"
        >
            <div className="p-4 rounded-2xl bg-secondary/50 text-muted-foreground">
                {icon}
            </div>
            <h3 className="text-kiosk-lg font-semibold text-foreground">{title}</h3>
            {description && (
                <p className="text-kiosk-base text-muted-foreground max-w-sm">{description}</p>
            )}
        </motion.div>
    );
}
