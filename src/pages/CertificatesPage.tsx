import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { KioskModal } from '@/components/KioskModal';
import { EmptyState } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { getCertificates } from '@/lib/mocks';
import type { Certificate } from '@/types/kiosk';
import jsPDF from 'jspdf';

interface CertificatesPageProps {
    isOpen: boolean;
    onClose: () => void;
    employeeName?: string;
}

export function CertificatesPage({ isOpen, onClose, employeeName }: CertificatesPageProps) {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

    useEffect(() => {
        if (isOpen) {
            // Override recipientName with logged-in employee name
            const certs = getCertificates().map(cert => ({
                ...cert,
                recipientName: employeeName || cert.recipientName
            }));
            setCertificates(certs);
        }
    }, [isOpen, employeeName]);

    const downloadCertificate = (cert: Certificate) => {

        const now = new Date();
        const issuedAt = now.toLocaleDateString('es-DO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: 'a4',
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Fondo suave
        doc.setFillColor(250, 250, 250);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');

        // Marco
        doc.setDrawColor(234, 179, 8); // dorado
        doc.setLineWidth(4);
        doc.rect(24, 24, pageWidth - 48, pageHeight - 48);

        // Encabezado
        doc.setTextColor(17, 24, 39);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(28);
        doc.text('CERTIFICADO DE LOGRO', pageWidth / 2, 110, { align: 'center' });

        // Texto “otorgado a”
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(14);
        doc.setTextColor(75, 85, 99);
        doc.text('Este certificado es otorgado a:', pageWidth / 2, 160, { align: 'center' });

        // Nombre
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(26);
        doc.setTextColor(37, 99, 235); // azul
        doc.text(cert.recipientName, pageWidth / 2, 205, { align: 'center' });

        // “Por completar”
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(14);
        doc.setTextColor(75, 85, 99);
        doc.text('Por completar exitosamente:', pageWidth / 2, 250, { align: 'center' });

        // Título (se parte en líneas si es largo)
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(17, 24, 39);
        const titleLines = doc.splitTextToSize(cert.title, pageWidth - 140);
        doc.text(titleLines, pageWidth / 2, 285, { align: 'center' });

        // Pie (fecha + ID)
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(75, 85, 99);
        doc.text(`Fecha de emisión: ${issuedAt}`, 60, pageHeight - 90);
        doc.text(`ID del Certificado: ${cert.id}`, 60, pageHeight - 70);
        doc.text('NebuBot Kiosk - Sistema de Capacitación', pageWidth - 60, pageHeight - 70, {
            align: 'right',
        });

        // Descargar PDF
        doc.save(`certificado-${cert.id}.pdf`);

        toast.success('Certificado descargado en PDF');
    };

    const handleClose = () => {
        setSelectedCert(null);
        onClose();
    };

    return (
        <KioskModal
            isOpen={isOpen}
            onClose={handleClose}
            title={selectedCert ? selectedCert.title : 'Mis Certificados'}
            showBackButton={!!selectedCert}
            onBack={() => setSelectedCert(null)}
        >
            {selectedCert ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                >
                    {/* Certificate Preview */}
                    <div className="w-full max-w-lg p-8 rounded-2xl bg-gradient-to-br from-tile-yellow/10 to-tile-orange/10 border-2 border-tile-yellow/30 text-center mb-6">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 rounded-full bg-tile-yellow/20">
                                <Award className="w-16 h-16 text-tile-yellow" />
                            </div>
                        </div>

                        <h3 className="text-kiosk-xs text-muted-foreground uppercase tracking-widest mb-2">
                            Certificado de Logro
                        </h3>

                        <h2 className="text-kiosk-xl font-bold text-foreground mb-4">
                            {selectedCert.title}
                        </h2>

                        <p className="text-kiosk-base text-muted-foreground mb-2">
                            Otorgado a
                        </p>

                        <p className="text-kiosk-2xl font-semibold text-primary mb-6">
                            {selectedCert.recipientName}
                        </p>

                        <div className="flex items-center justify-center gap-2 text-kiosk-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{selectedCert.issuedAt}</span>
                        </div>
                    </div>

                    <Button
                        size="lg"
                        onClick={() => downloadCertificate(selectedCert)}
                        className="touch-target gap-2"
                    >
                        <Download className="w-5 h-5" />
                        Descargar Certificado
                    </Button>

                    <p className="mt-3 text-kiosk-sm text-muted-foreground">
                        ID: {selectedCert.id}
                    </p>
                </motion.div>
            ) : (
                <>
                    {certificates.length === 0 ? (
                        <EmptyState
                            icon={<Award className="w-12 h-12" />}
                            title="No tienes certificados aún"
                            description="Completa cursos y pruebas para obtener certificados."
                        />
                    ) : (
                        <div className="space-y-4">
                            {certificates.map((cert, index) => (
                                <motion.button
                                    key={cert.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => setSelectedCert(cert)}
                                    className="w-full p-5 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all touch-target focus-ring text-left group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-lg bg-tile-yellow/20 text-tile-yellow">
                                            <Award className="w-8 h-8" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-kiosk-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                                {cert.title}
                                            </h3>
                                            <div className="flex items-center gap-3 text-kiosk-sm text-muted-foreground">
                                                <span>{cert.recipientName}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {cert.issuedAt}
                                                </span>
                                            </div>
                                        </div>
                                        <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </KioskModal>
    );
}