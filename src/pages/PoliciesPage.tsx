import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, ChevronRight } from 'lucide-react';
import { KioskModal } from '@/components/KioskModal';
import { EmptyState } from '@/components/LoadingSpinner';
import type { Policy } from '@/types/kiosk';

interface PoliciesPageProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    policies: Policy[];
}

export function PoliciesPage({ isOpen, onClose, title, policies }: PoliciesPageProps) {
    const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

    const handleClose = () => {
        setSelectedPolicy(null);
        onClose();
    };

    const handleBack = () => {
        setSelectedPolicy(null);
    };

    if (selectedPolicy) {
        return (
            <KioskModal
                isOpen={isOpen}
                onClose={handleClose}
                title={selectedPolicy ? selectedPolicy.title : title}
                showBackButton
                onBack={handleBack}
            >
                <div className="prose prose-invert max-w-none">
                    <div className="flex items-center gap-2 text-kiosk-sm text-muted-foreground mb-6">
                        <Calendar className="w-4 h-4" />
                        <span>Última actualización: {selectedPolicy.lastUpdated}</span>
                        <span className="mx-2">•</span>
                        <span className="px-2 py-1 bg-secondary rounded-md">{selectedPolicy.category}</span>
                    </div>

                    <div className="whitespace-pre-wrap text-kiosk-base text-foreground/90 leading-relaxed">
                        {selectedPolicy.content}
                    </div>
                </div>
            </KioskModal>
        );
    }

    return (
        <KioskModal
            isOpen={isOpen}
            onClose={onClose}
            title={selectedPolicy ? selectedPolicy.title : title}
        >
            {policies.length === 0 ? (
                <EmptyState
                    icon={<FileText className="w-12 h-12" />}
                    title="No hay políticas disponibles"
                    description="Las políticas se mostrarán aquí cuando estén disponibles."
                />
            ) : (
                <div className="space-y-3">
                    {policies.map((policy, index) => (
                        <motion.button
                            key={policy.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setSelectedPolicy(policy)}
                            className="w-full p-5 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all touch-target focus-ring text-left group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-tile-blue/20 text-tile-blue">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-kiosk-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                        {policy.title}
                                    </h3>
                                    <p className="text-kiosk-sm text-muted-foreground line-clamp-2">
                                        {policy.excerpt}
                                    </p>
                                    <div className="flex items-center gap-3 mt-2 text-kiosk-xs text-muted-foreground">
                                        <span className="px-2 py-0.5 bg-secondary/50 rounded">{policy.category}</span>
                                        <span>{policy.lastUpdated}</span>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-2" />
                            </div>
                        </motion.button>
                    ))}
                </div>
            )}
        </KioskModal>
    );
}