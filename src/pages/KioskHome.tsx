import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { KioskHeader } from '@/components/KioskHeader';
import { KioskTile } from '@/components/KioskTile';
import { PoliciesPage } from '@/pages/PoliciesPage';
import { VideosPage } from '@/pages/VideosPage';
import { ChatBotPage } from '@/pages/ChatBotPage';
import { QuizPage } from '@/pages/QuizPage';
import { CertificatesPage } from '@/pages/CertificatesPage';
import { HelpPage } from '@/pages/HelpPage';
import type { KioskTileConfig, PageType, CardReaderStatus, Employee } from '@/types/kiosk';
import {
    mockPolicies,
    mockOrientationPolicies,
    mockSafetyPolicies,
    mockEnvironmentPolicies,
} from '@/lib/mocks';

const tiles: KioskTileConfig[] = [
    {
        id: 'policies',
        label: 'Políticas y Procedimientos',
        icon: 'policies',
        color: 'blue',
        page: 'policies'
    },
    {
        id: 'orientation',
        label: 'Orientación Nuevos Empleados',
        icon: 'orientation',
        color: 'orange',
        page: 'orientation'
    },
    {
        id: 'safety',
        label: 'Capacitación en Seguridad',
        icon: 'safety',
        color: 'yellow',
        page: 'safety'
    },
    {
        id: 'chatbot',
        label: 'Asistente NebuBot',
        icon: 'chatbot',
        color: 'green',
        page: 'chatbot'
    },
    {
        id: 'videos',
        label: 'Videos Tutoriales',
        icon: 'videos',
        color: 'cyan',
        page: 'videos'
    },
    {
        id: 'quiz',
        label: 'Realice una Prueba',
        icon: 'quiz',
        color: 'purple',
        page: 'quiz'
    },
    {
        id: 'certificates',
        label: 'Obtener Certificado',
        icon: 'certificates',
        color: 'red',
        page: 'certificates'
    },
    {
        id: 'environment',
        label: 'Información Ambiental',
        icon: 'environment',
        color: 'teal',
        page: 'environment'
    },
    {
        id: 'help',
        label: 'Ayuda',
        icon: 'help',
        color: 'pink',
        page: 'help'
    }
];

export function KioskHome() {
    const [activePage, setActivePage] = useState<PageType | null>(null);
    const [cardReaderStatus, setCardReaderStatus] = useState<CardReaderStatus>({
        status: 'waiting',
        message: 'Inserte su tarjeta para identificarse'
    });

    const [employee, setEmployee] = useState<Employee | null>(null); // ADD

    const handleTileClick = useCallback((page: PageType) => {
        setActivePage(page);
    }, []);

    const handleClosePage = useCallback(() => {
        setActivePage(null);
    }, []);

    // Handler callbacks
    const handleLogin = useCallback((emp: Employee) => {
        setEmployee(emp);
    }, []);

    const handleLogout = useCallback(() => {
        setEmployee(null);
    }, []);

    const handleCardReaderStatusChange = useCallback((status: CardReaderStatus) => {
        setCardReaderStatus(status);
    }, []);

    return (
        <div className="kiosk-container">
            {/* Header with Card Reader */}
            <KioskHeader
                cardReaderStatus={cardReaderStatus}
                onLogin={handleLogin}
                onLogout={handleLogout}
                onStatusChange={handleCardReaderStatusChange}
            />

            {/* Welcome Message */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center px-6 py-4"
            >
                <h2 className="text-kiosk-2xl font-bold text-foreground mb-1">
                    {employee ? `¡Hola, ${employee.name.split(' ')[0]}!` : '¡Bienvenido!'}
                </h2>
                <p className="text-kiosk-base text-muted-foreground">
                    {employee
                        ? `Departamento: ${employee.department}`
                        : 'Seleccione una opción para comenzar'}
                </p>
            </motion.div>

            {/* Decorative Glow */}
            <div className="relative flex justify-center py-4">
                <div className="absolute inset-0 flex justify-center">
                    <div className="w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                </div>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative z-10"
                >
                    {/* Robot Mascot SVG */}
                    <svg
                        viewBox="0 0 120 120"
                        className="w-28 h-28 md:w-36 md:h-36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Robot Head */}
                        <circle cx="60" cy="60" r="45" className="fill-primary/20 stroke-primary" strokeWidth="2" />
                        <circle cx="60" cy="60" r="38" className="fill-card" />

                        {/* Eyes */}
                        <circle cx="45" cy="52" r="8" className="fill-primary" />
                        <circle cx="75" cy="52" r="8" className="fill-primary" />
                        <circle cx="47" cy="50" r="3" className="fill-white" />
                        <circle cx="77" cy="50" r="3" className="fill-white" />

                        {/* Smile */}
                        <path
                            d="M42 72 Q60 85 78 72"
                            className="stroke-primary"
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                        />

                        {/* Antenna */}
                        <line x1="60" y1="15" x2="60" y2="8" className="stroke-primary" strokeWidth="2" />
                        <circle cx="60" cy="6" r="4" className="fill-primary animate-pulse-glow" />

                        {/* Ears */}
                        <rect x="10" y="50" width="8" height="20" rx="4" className="fill-secondary stroke-primary" strokeWidth="1" />
                        <rect x="102" y="50" width="8" height="20" rx="4" className="fill-secondary stroke-primary" strokeWidth="1" />
                    </svg>
                </motion.div>
            </div>

            {/* Tiles Grid */}
            <div className="flex-1 px-4 md:px-8 pb-8 pt-2">
                <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-2xl mx-auto">
                    {tiles.map((tile, index) => (
                        <KioskTile
                            key={tile.id}
                            {...tile}
                            index={index}
                            onClick={() => handleTileClick(tile.page)}
                        />
                    ))}
                </div>
            </div>

            {/* Footer - Card Reader Area */}
            <div className="px-6 py-4 bg-secondary/30 border-t border-border">
                <p className="text-center text-kiosk-xs text-muted-foreground">
                    Sistema Adaptable para Mostrar el Logo de su Empresa
                </p>
            </div>

            {/* Page Modals */}
            <PoliciesPage
                isOpen={activePage === 'policies'}
                onClose={handleClosePage}
                title="Políticas y Procedimientos"
                policies={mockPolicies}
            />

            <PoliciesPage
                isOpen={activePage === 'orientation'}
                onClose={handleClosePage}
                title="Orientación Nuevos Empleados"
                policies={mockOrientationPolicies}
            />

            <PoliciesPage
                isOpen={activePage === 'safety'}
                onClose={handleClosePage}
                title="Capacitación en Seguridad"
                policies={mockSafetyPolicies}
            />

            <PoliciesPage
                isOpen={activePage === 'environment'}
                onClose={handleClosePage}
                title="Información Ambiental"
                policies={mockEnvironmentPolicies}
            />
            <VideosPage
                isOpen={activePage === 'videos'}
                onClose={handleClosePage}
            />
            <ChatBotPage
                isOpen={activePage === 'chatbot' || activePage === 'courses'}
                onClose={handleClosePage}
            />
            <QuizPage
                isOpen={activePage === 'quiz'}
                onClose={handleClosePage}
                onCertificateGenerated={() => setActivePage('certificates')}
                employeeName={employee?.name}
            />
            <CertificatesPage
                isOpen={activePage === 'certificates'}
                onClose={handleClosePage}
                employeeName={employee?.name}
            />
            <HelpPage
                isOpen={activePage === 'help'}
                onClose={handleClosePage}
            />
        </div>
    );
}