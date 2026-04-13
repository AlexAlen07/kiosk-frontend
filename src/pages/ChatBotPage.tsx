import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Trash2, Shield, Sparkles } from 'lucide-react';
import { KioskModal } from '@/components/KioskModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatProvider } from '@/lib/chatProvider';
import { getChatHistory, saveChatHistory, clearChatHistory } from '@/lib/mocks';
import type { ChatMessage } from '@/types/kiosk';

interface ChatBotPageProps {
    isOpen: boolean;
    onClose: () => void;
}

const SUGGESTED_PROMPTS = [
    { icon: '🔐', label: 'ISO 27001', prompt: '¿Qué es ISO 27001 y cómo aplica a nuestra empresa?' },
    { icon: '🛡️', label: 'Zero Trust', prompt: 'Explícame el modelo de seguridad Zero Trust' },
    { icon: '📊', label: 'GDPR', prompt: '¿Cuáles son los principios de GDPR que debemos cumplir?' },
    { icon: '📋', label: 'Auditoría', prompt: '¿Cómo es el proceso de auditoría de seguridad?' }
];

export function ChatBotPage({ isOpen, onClose }: ChatBotPageProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Load chat history on mount
    useEffect(() => {
        if (isOpen) {
            const history = getChatHistory();
            setMessages(history);
        }
    }, [isOpen]);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const handleSendMessage = useCallback(async (messageText?: string) => {
        const text = messageText || inputValue.trim();
        if (!text || isLoading) return;

        const userMessage: ChatMessage = {
            id: `msg-${Date.now()}`,
            role: 'user',
            content: text,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await chatProvider.sendMessage(text, messages);

            const assistantMessage: ChatMessage = {
                id: `msg-${Date.now() + 1}`,
                role: 'assistant',
                content: response,
                timestamp: new Date().toISOString()
            };

            setMessages(prev => {
                const updated = [...prev, assistantMessage];
                saveChatHistory(updated);
                return updated;
            });
        } catch (error) {
            const errorMessage: ChatMessage = {
                id: `msg-${Date.now() + 1}`,
                role: 'assistant',
                content: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.',
                timestamp: new Date().toISOString()
            };

            setMessages(prev => {
                const updated = [...prev, errorMessage];
                saveChatHistory(updated);
                return updated;
            });
        } finally {
            setIsLoading(false);
        }
    }, [inputValue, isLoading, messages]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }, [handleSendMessage]);

    const handleClearHistory = useCallback(() => {
        setMessages([]);
        clearChatHistory();
    }, []);

    const handleClose = useCallback(() => {
        saveChatHistory(messages);
        onClose();
    }, [messages, onClose]);

    return (
        <KioskModal
            isOpen={isOpen}
            onClose={handleClose}
            title={
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <span>NebuBot® – IA Segura</span>
                    <Shield className="w-4 h-4 text-tile-green ml-1" />
                </div>
            }
        >
            <div className="flex flex-col h-[calc(100vh-16rem)] min-h-[400px]">
                {/* Chat Messages Area */}
                <div className="flex-1 overflow-y-auto space-y-4 pb-4">
                    {/* Welcome Message */}
                    {messages.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-8"
                        >
                            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
                                <Bot className="w-10 h-10 text-primary-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                ¡Hola! Soy <span className="text-primary">NebuBot</span>
                            </h3>
                            <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
                                Tu asistente de seguridad de la información. Estoy aquí para ayudarte con temas de ciberseguridad, normativas y políticas.
                            </p>

                            {/* Suggested Prompts */}
                            <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
                                {SUGGESTED_PROMPTS.map((prompt, index) => (
                                    <motion.button
                                        key={prompt.label}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.1 * index }}
                                        onClick={() => handleSendMessage(prompt.prompt)}
                                        className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 hover:bg-secondary/80 border border-border transition-all touch-target text-left"
                                    >
                                        <span className="text-lg">{prompt.icon}</span>
                                        <span className="text-sm font-medium text-foreground">{prompt.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Message List */}
                    <AnimatePresence>
                        {messages.map((message, index) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ delay: index * 0.05 }}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-br-md'
                                            : 'bg-secondary/70 text-foreground rounded-bl-md'
                                        }`}
                                >
                                    {message.role === 'assistant' && (
                                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border/50">
                                            <Bot className="w-4 h-4 text-primary" />
                                            <span className="text-xs font-medium text-primary">NebuBot</span>
                                        </div>
                                    )}
                                    <div className="text-sm whitespace-pre-wrap leading-relaxed">
                                        {message.content.split('\n').map((line, i) => {
                                            // Simple markdown-like rendering
                                            if (line.startsWith('**') && line.endsWith('**')) {
                                                return (
                                                    <p key={i} className="font-semibold my-1">
                                                        {line.replace(/\*\*/g, '')}
                                                    </p>
                                                );
                                            }
                                            if (line.startsWith('- ')) {
                                                return (
                                                    <p key={i} className="ml-2 my-0.5">
                                                        • {line.substring(2)}
                                                    </p>
                                                );
                                            }
                                            if (line.match(/^\d+\./)) {
                                                return (
                                                    <p key={i} className="ml-2 my-0.5">
                                                        {line}
                                                    </p>
                                                );
                                            }
                                            if (line.startsWith('🔐') || line.startsWith('🛡️') || line.startsWith('📋') || line.startsWith('📊') || line.startsWith('⚖️') || line.startsWith('🚨') || line.startsWith('📅') || line.startsWith('🔑') || line.startsWith('🔍')) {
                                                return (
                                                    <p key={i} className="font-medium my-2">
                                                        {line}
                                                    </p>
                                                );
                                            }
                                            return line ? <p key={i} className="my-1">{line}</p> : <br key={i} />;
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Loading indicator */}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                        >
                            <div className="bg-secondary/70 rounded-2xl rounded-bl-md px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <Bot className="w-4 h-4 text-primary" />
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-border pt-4 mt-auto">
                    {messages.length > 0 && (
                        <div className="flex justify-end mb-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleClearHistory}
                                className="text-xs text-muted-foreground hover:text-destructive"
                            >
                                <Trash2 className="w-3 h-3 mr-1" />
                                Limpiar historial
                            </Button>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <Input
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Escribe tu pregunta..."
                            disabled={isLoading}
                            className="flex-1 h-12 text-base bg-secondary/50 border-border focus:border-primary"
                        />
                        <Button
                            onClick={() => handleSendMessage()}
                            disabled={!inputValue.trim() || isLoading}
                            size="lg"
                            className="h-12 px-6 touch-target"
                        >
                            <Send className="w-5 h-5" />
                            <span className="sr-only">Enviar</span>
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground/70 text-center mt-3 flex items-center justify-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {import.meta.env.VITE_CHAT_PROVIDER === 'openai'
                            ? 'Potenciado por OpenAI'
                            : 'Modo Demo – Respuestas predefinidas'}
                    </p>
                </div>
            </div>
        </KioskModal>
    );
}
