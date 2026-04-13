import { motion } from 'framer-motion';
import { HelpCircle, Phone, Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { KioskModal } from '@/components/KioskModal';
import { Button } from '@/components/ui/button';

interface HelpPageProps {
    isOpen: boolean;
    onClose: () => void;
}

export function HelpPage({ isOpen, onClose }: HelpPageProps) {
    const helpItems = [
        {
            icon: Phone,
            title: 'Línea de Ayuda',
            description: 'Contacta a soporte técnico',
            action: 'Ext. 1416',
            color: 'bg-tile-blue/20 text-tile-blue'
        },
        {
            icon: Mail,
            title: 'Correo Electrónico',
            description: 'Envía tus consultas',
            action: 'support@nebusis.com',
            color: 'bg-tile-orange/20 text-tile-orange'
        },
        {
            icon: MessageCircle,
            title: 'Chat en Vivo',
            description: 'Habla con un representante',
            action: 'Iniciar Chat',
            color: 'bg-tile-green/20 text-tile-green'
        }
    ];

    const faqItems = [
        {
            question: '¿Cómo inicio un curso?',
            answer: 'Selecciona "Cursos" en el menú principal, elige el curso de tu interés y presiona "Iniciar".'
        },
        {
            question: '¿Cómo obtengo un certificado?',
            answer: 'Completa un curso o aprueba una prueba con el puntaje mínimo requerido para desbloquear tu certificado.'
        },
        {
            question: '¿Qué hago si mi tarjeta no es reconocida?',
            answer: 'Asegúrate de que tu tarjeta esté correctamente insertada. Si el problema persiste, contacta a Recursos Humanos.'
        },
        {
            question: '¿Puedo retomar un curso donde lo dejé?',
            answer: 'Sí, tu progreso se guarda automáticamente. Simplemente selecciona el curso y continúa desde donde lo dejaste.'
        }
    ];

    return (
        <KioskModal
            isOpen={isOpen}
            onClose={onClose}
            title="Centro de Ayuda"
        >
            <div className="space-y-8">
                {/* Contact Options */}
                <section>
                    <h3 className="text-kiosk-lg font-semibold text-foreground mb-4">
                        ¿Necesitas Asistencia?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {helpItems.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-5 rounded-xl bg-secondary/30 text-center"
                            >
                                <div className={`inline-flex p-3 rounded-lg mb-3 ${item.color}`}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-kiosk-base font-semibold text-foreground mb-1">
                                    {item.title}
                                </h4>
                                <p className="text-kiosk-sm text-muted-foreground mb-3">
                                    {item.description}
                                </p>
                                <span className="text-kiosk-sm font-medium text-primary">
                                    {item.action}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section>
                    <h3 className="text-kiosk-lg font-semibold text-foreground mb-4">
                        Preguntas Frecuentes
                    </h3>
                    <div className="space-y-3">
                        {faqItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.05 }}
                                className="p-4 rounded-xl bg-secondary/20"
                            >
                                <h4 className="text-kiosk-base font-medium text-foreground mb-2 flex items-start gap-2">
                                    <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                    {item.question}
                                </h4>
                                <p className="text-kiosk-sm text-muted-foreground pl-7">
                                    {item.answer}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Additional Resources */}
                <section className="pt-4 border-t border-border">
                    <div className="flex flex-col items-center text-center">
                        <p className="text-kiosk-sm text-muted-foreground mb-3">
                            Para más información, visita el portal de empleados
                        </p>
                        <Button variant="secondary" className="gap-2 touch-target">
                            <ExternalLink className="w-4 h-4" />
                            Portal de Empleados
                        </Button>
                    </div>
                </section>
            </div>
        </KioskModal>
    );
}