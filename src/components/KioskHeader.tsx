import { Bot } from 'lucide-react';
import { CardReaderDemo } from '@/components/CardReaderDemo';
import type { CardReaderStatus, Employee } from '@/types/kiosk';

interface KioskHeaderProps {
    cardReaderStatus?: CardReaderStatus;
    onLogin?: (employee: Employee) => void;
    onLogout?: () => void;
    onStatusChange?: (status: CardReaderStatus) => void;
}

export function KioskHeader({
    onLogin,
    onLogout,
    onStatusChange
}: KioskHeaderProps) {
    return (
        <header className="relative flex flex-col items-center pt-6 pb-4 px-6">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            {/* Logo and Title */}
            <div className="relative flex items-center gap-3 mb-2">
                <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
                        <Bot className="w-8 h-8 text-primary-foreground" />
                    </div>
                    {/* Glow ring */}
                    <div className="absolute -inset-1 rounded-2xl bg-primary/20 blur-sm -z-10" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-kiosk-2xl font-bold text-foreground tracking-tight">
                        NebuBot <span className="text-primary">Kiosk</span>
                    </h1>
                </div>
            </div>

            {/* Card Reader Demo Component */}
            <div className="relative mt-4">
                <CardReaderDemo
                    onLogin={onLogin}
                    onLogout={onLogout}
                    onStatusChange={onStatusChange}
                />
            </div>
        </header>
    );
}