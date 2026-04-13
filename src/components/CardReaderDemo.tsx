import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, User, LogOut, Wifi, WifiOff, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    validateEmployeeToken,
    getEmployeeInfo,
    saveEmployeeInfo,
    clearEmployeeInfo,
    mockEmployees
} from '@/lib/mocks';
import type { Employee, CardReaderStatus } from '@/types/kiosk';

interface CardReaderDemoProps {
    onLogin?: (employee: Employee) => void;
    onLogout?: () => void;
    onError?: (message: string) => void;
    onStatusChange?: (status: CardReaderStatus) => void;
}

export function CardReaderDemo({
    onLogin,
    onLogout,
    onError,
    onStatusChange
}: CardReaderDemoProps) {
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [status, setStatus] = useState<CardReaderStatus>({
        status: 'waiting',
        message: 'Inserte su tarjeta para identificarse'
    });
    const [buffer, setBuffer] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [showFeedback, setShowFeedback] = useState<'success' | 'error' | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const bufferTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Load saved employee on mount
    useEffect(() => {
        const savedEmployee = getEmployeeInfo();
        if (savedEmployee) {
            setEmployee(savedEmployee);
            updateStatus({
                status: 'connected',
                message: 'Identificado',
                employeeId: savedEmployee.id,
                employeeName: savedEmployee.name
            });
        }
    }, []);

    const updateStatus = useCallback((newStatus: CardReaderStatus) => {
        setStatus(newStatus);
        onStatusChange?.(newStatus);
    }, [onStatusChange]);

    // Keep input focused ONLY when no other visible input is active
    useEffect(() => {
        const focusInput = () => {
            if (inputRef.current && !employee) {
                const active = document.activeElement;
                // Don't steal focus from visible inputs, textareas, or contenteditable elements
                const isUserTyping =
                    active instanceof HTMLInputElement ||
                    active instanceof HTMLTextAreaElement ||
                    (active instanceof HTMLElement && active.isContentEditable);
                // Only refocus if the user isn't interacting with another visible field
                if (!isUserTyping || active === inputRef.current) {
                    inputRef.current.focus();
                }
            }
        };

        focusInput();
        const interval = setInterval(focusInput, 1000);

        return () => clearInterval(interval);
    }, [employee]);

    // Handle keyboard input (card reader simulation)
    const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setBuffer(value);
        setIsScanning(true);

        updateStatus({
            status: 'scanning',
            message: 'Leyendo tarjeta...'
        });

        // Clear previous timeout
        if (bufferTimeoutRef.current) {
            clearTimeout(bufferTimeoutRef.current);
        }

        // Set timeout to process buffer (card readers send data quickly)
        bufferTimeoutRef.current = setTimeout(() => {
            processCardData(value);
        }, 300);
    }, [updateStatus]);

    const processCardData = useCallback((token: string) => {
        setIsScanning(false);
        setBuffer('');

        if (inputRef.current) {
            inputRef.current.value = '';
        }

        const validEmployee = validateEmployeeToken(token.trim());

        if (validEmployee) {
            setEmployee(validEmployee);
            saveEmployeeInfo(validEmployee);
            setShowFeedback('success');

            updateStatus({
                status: 'connected',
                message: 'Identificado',
                employeeId: validEmployee.id,
                employeeName: validEmployee.name
            });

            onLogin?.(validEmployee);

            setTimeout(() => setShowFeedback(null), 2000);
        } else {
            setShowFeedback('error');

            updateStatus({
                status: 'error',
                message: 'Tarjeta no reconocida'
            });

            onError?.('Tarjeta no reconocida. Por favor, intente de nuevo.');

            setTimeout(() => {
                setShowFeedback(null);
                updateStatus({
                    status: 'waiting',
                    message: 'Inserte su tarjeta para identificarse'
                });
            }, 2000);
        }
    }, [onLogin, onError, updateStatus]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && buffer) {
            if (bufferTimeoutRef.current) {
                clearTimeout(bufferTimeoutRef.current);
            }
            processCardData(buffer);
        }
    }, [buffer, processCardData]);

    const handleLogout = useCallback(() => {
        setEmployee(null);
        clearEmployeeInfo();
        setShowFeedback(null);

        updateStatus({
            status: 'waiting',
            message: 'Inserte su tarjeta para identificarse'
        });

        onLogout?.();

        // Refocus input
        setTimeout(() => inputRef.current?.focus(), 100);
    }, [onLogout, updateStatus]);

    // Demo simulation buttons
    const simulateValidCard = useCallback(() => {
        processCardData('DEMO123');
    }, [processCardData]);

    const simulateInvalidCard = useCallback(() => {
        processCardData('INVALID999');
    }, [processCardData]);

    const getStatusIcon = () => {
        if (showFeedback === 'success') {
            return <CheckCircle className="w-5 h-5 text-tile-green" />;
        }
        if (showFeedback === 'error') {
            return <XCircle className="w-5 h-5 text-destructive" />;
        }
        if (employee) {
            return <Wifi className="w-4 h-4 text-tile-green" />;
        }
        if (isScanning) {
            return <CreditCard className="w-4 h-4 animate-pulse text-tile-yellow" />;
        }
        return <WifiOff className="w-4 h-4 text-muted-foreground" />;
    };

    const getStatusColor = () => {
        if (showFeedback === 'success' || employee) return 'bg-tile-green';
        if (showFeedback === 'error') return 'bg-destructive';
        if (isScanning) return 'bg-tile-yellow animate-pulse';
        return 'bg-tile-yellow';
    };

    return (
        <div className="relative">
            {/* Hidden input for card reader */}
            <input
                ref={inputRef}
                type="text"
                className="absolute opacity-0 pointer-events-none"
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                aria-label="Lector de tarjetas"
                autoComplete="off"
                tabIndex={-1}
            />

            {/* Status Display */}
            <div className="flex flex-col items-center gap-3">
                <AnimatePresence mode="wait">
                    {employee ? (
                        <motion.div
                            key="logged-in"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50 border border-tile-green/30"
                        >
                            <div className="w-10 h-10 rounded-full bg-tile-green/20 flex items-center justify-center">
                                <User className="w-5 h-5 text-tile-green" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-foreground">
                                    {employee.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {employee.department}
                                </span>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleLogout}
                                className="ml-2 text-muted-foreground hover:text-destructive"
                                aria-label="Cerrar sesión"
                            >
                                <LogOut className="w-4 h-4" />
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="waiting"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border"
                        >
                            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
                            <span className="flex items-center gap-2 text-sm text-muted-foreground">
                                {getStatusIcon()}
                                <span>{status.message}</span>
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Feedback Toast */}
                <AnimatePresence>
                    {showFeedback && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-medium ${showFeedback === 'success'
                                ? 'bg-tile-green/20 text-tile-green border border-tile-green/30'
                                : 'bg-destructive/20 text-destructive border border-destructive/30'
                                }`}
                        >
                            {showFeedback === 'success' ? '✓ Identificación exitosa' : '✗ Tarjeta no reconocida'}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Demo Simulation Buttons */}
                {!employee && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col items-center gap-2 mt-4"
                    >
                        <span className="text-xs text-muted-foreground/70">
                            Modo DEMO - Simular lectura de tarjeta:
                        </span>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={simulateValidCard}
                                className="text-xs h-8 px-3 border-tile-green/30 text-tile-green hover:bg-tile-green/10"
                            >
                                <CreditCard className="w-3 h-3 mr-1" />
                                Tarjeta Válida
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={simulateInvalidCard}
                                className="text-xs h-8 px-3 border-destructive/30 text-destructive hover:bg-destructive/10"
                            >
                                <CreditCard className="w-3 h-3 mr-1" />
                                Tarjeta Inválida
                            </Button>
                        </div>
                        <span className="text-xs text-muted-foreground/50 mt-1">
                            Tokens demo: {mockEmployees.map(e => e.token).join(', ')}
                        </span>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
