import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Award, FileText } from 'lucide-react';
import { KioskModal } from '@/components/KioskModal';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { mockQuizzes, saveQuizResult, saveCertificate, getCertificates } from '@/lib/mocks';
import type { Quiz, QuizQuestion, Certificate } from '@/types/kiosk';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizPageProps {
    isOpen: boolean;
    onClose: () => void;
    quizId?: string;
    onCertificateGenerated?: () => void;
    employeeName?: string;
}

type QuizState = 'list' | 'quiz' | 'result';

export function QuizPage({ isOpen, onClose, quizId, onCertificateGenerated, employeeName }: QuizPageProps) {
    const [state, setState] = useState<QuizState>('list');
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [score, setScore] = useState({ correct: 0, total: 0, passed: false });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (quizId) {
            const quiz = mockQuizzes.find(q => q.id === quizId);
            if (quiz) {
                setSelectedQuiz(quiz);
                setState('quiz');
            }
        }
    }, [quizId]);

    const handleClose = useCallback(() => {
        setState('list');
        setSelectedQuiz(null);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setScore({ correct: 0, total: 0, passed: false });
        onClose();
    }, [onClose]);

    const startQuiz = (quiz: Quiz) => {
        setSelectedQuiz(quiz);
        setCurrentQuestionIndex(0);
        setAnswers({});
        setState('quiz');
    };

    const handleAnswer = (questionId: string, answerIndex: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    };

    const nextQuestion = () => {
        if (selectedQuiz && currentQuestionIndex < selectedQuiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const submitQuiz = () => {
        if (!selectedQuiz) return;

        setLoading(true);

        // Calculate score
        let correct = 0;
        selectedQuiz.questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                correct++;
            }
        });

        const total = selectedQuiz.questions.length;
        const percentage = Math.round((correct / total) * 100);
        const passed = percentage >= selectedQuiz.passingScore;

        // Save result
        saveQuizResult({
            quizId: selectedQuiz.id,
            score: percentage,
            totalQuestions: total,
            passed,
            completedAt: new Date().toISOString()
        });

        setScore({ correct, total, passed });

        setTimeout(() => {
            setLoading(false);
            setState('result');

            if (passed) toast.success('¡Felicidades! Has aprobado la prueba.');
            else toast.error('No has alcanzado la puntuación mínima. Inténtalo de nuevo.');
        }, 500);

    };

    const generateCertificate = () => {
        if (!selectedQuiz) return;

        const cert: Certificate = {
            id: `cert-${selectedQuiz.id}`, // estable por quiz (evita duplicados)
            title: `Certificado: ${selectedQuiz.title}`,
            recipientName: employeeName || 'Empleado Demo',
            issuedAt: new Date().toISOString().slice(0, 10), // fecha ISO YYYY-MM-DD
            quizId: selectedQuiz.id,
        };

        saveCertificate(cert);
        toast.success('¡Certificado generado exitosamente!');
        onCertificateGenerated?.();
        handleClose();
    };

    const getTitle = () => {
        switch (state) {
            case 'quiz':
                return selectedQuiz?.title || 'Prueba';
            case 'result':
                return 'Resultado';
            default:
                return 'Realice una Prueba';
        }
    };

    const currentQuestion = selectedQuiz?.questions[currentQuestionIndex];
    const allAnswered = selectedQuiz?.questions.every(q => answers[q.id] !== undefined);

    return (
        <KioskModal
            isOpen={isOpen}
            onClose={handleClose}
            title={getTitle()}
            showBackButton={state !== 'list'}
            onBack={() => {
                if (state === 'result') {
                    setState('list');
                    setSelectedQuiz(null);
                } else if (state === 'quiz') {
                    setState('list');
                    setSelectedQuiz(null);
                    setCurrentQuestionIndex(0);
                    setAnswers({});
                }
            }}
        >
            <AnimatePresence mode="wait">
                {state === 'list' && (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        {mockQuizzes.map((quiz, index) => (
                            <motion.button
                                key={quiz.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => startQuiz(quiz)}
                                className="w-full p-6 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors text-left touch-target focus-ring"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-tile-blue/20 text-tile-blue">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-kiosk-lg font-semibold text-foreground mb-2">
                                            {quiz.title}
                                        </h3>
                                        <p className="text-kiosk-sm text-muted-foreground mb-3">
                                            {quiz.description}
                                        </p>
                                        <div className="flex items-center gap-4 text-kiosk-xs text-muted-foreground">
                                            <span>{quiz.questions.length} preguntas</span>
                                            <span>Puntaje mínimo: {quiz.passingScore}%</span>
                                            {quiz.timeLimit && <span>{quiz.timeLimit} min</span>}
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </motion.div>
                )}

                {state === 'quiz' && selectedQuiz && currentQuestion && (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col h-full"
                    >
                        {loading ? (
                            <LoadingSpinner message="Enviando respuestas..." size="lg" />
                        ) : (
                            <>
                                {/* Progress */}
                                <div className="mb-6">
                                    <div className="flex justify-between text-kiosk-sm text-muted-foreground mb-2">
                                        <span>Pregunta {currentQuestionIndex + 1} de {selectedQuiz.questions.length}</span>
                                        <span>{Math.round(((currentQuestionIndex) / selectedQuiz.questions.length) * 100)}%</span>
                                    </div>
                                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-primary"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${((currentQuestionIndex) / selectedQuiz.questions.length) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Question */}
                                <div className="flex-1">
                                    <h3 className="text-kiosk-xl font-semibold text-foreground mb-6">
                                        {currentQuestion.question}
                                    </h3>

                                    <div className="space-y-3">
                                        {currentQuestion.options.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleAnswer(currentQuestion.id, index)}
                                                disabled={loading}
                                                className={`w-full p-4 rounded-xl text-left transition-all touch-target focus-ring ${answers[currentQuestion.id] === index
                                                    ? 'bg-primary text-primary-foreground ring-2 ring-primary'
                                                    : 'bg-secondary/30 hover:bg-secondary/50 text-foreground'
                                                    } ${loading ? 'opacity-60 pointer-events-none' : ''}`}
                                            >
                                                <span className="text-kiosk-base">{option}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Navigation */}
                                <div className="flex justify-between pt-6 mt-6 border-t border-border">
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        onClick={prevQuestion}
                                        disabled={currentQuestionIndex === 0 || loading}
                                        className="touch-target"
                                    >
                                        Anterior
                                    </Button>

                                    {currentQuestionIndex === selectedQuiz.questions.length - 1 ? (
                                        <Button
                                            size="lg"
                                            onClick={submitQuiz}
                                            disabled={!allAnswered || loading}
                                            className="touch-target"
                                        >
                                            {loading ? 'Enviando...' : 'Enviar Prueba'}
                                        </Button>
                                    ) : (
                                        <Button
                                            size="lg"
                                            onClick={nextQuestion}
                                            disabled={answers[currentQuestion.id] === undefined || loading}
                                            className="touch-target"
                                        >
                                            Siguiente
                                        </Button>
                                    )}
                                </div>
                            </>
                        )}
                    </motion.div>
                )}

                {state === 'result' && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center text-center py-8"
                    >
                        <div className={`p-6 rounded-full mb-6 ${score.passed ? 'bg-tile-green/20' : 'bg-destructive/20'}`}>
                            {score.passed ? (
                                <CheckCircle className="w-20 h-20 text-tile-green" />
                            ) : (
                                <XCircle className="w-20 h-20 text-destructive" />
                            )}
                        </div>

                        <h3 className="text-kiosk-2xl font-bold text-foreground mb-2">
                            {score.passed ? '¡Aprobado!' : 'No Aprobado'}
                        </h3>

                        <p className="text-kiosk-xl text-muted-foreground mb-4">
                            {score.correct} de {score.total} respuestas correctas
                        </p>

                        <p className="text-kiosk-3xl font-bold text-foreground mb-8">
                            {Math.round((score.correct / score.total) * 100)}%
                        </p>

                        {score.passed ? (
                            <div className="space-y-4">
                                <Button
                                    size="lg"
                                    onClick={generateCertificate}
                                    className="touch-target gap-2"
                                >
                                    <Award className="w-5 h-5" />
                                    Obtener Certificado
                                </Button>
                                <p className="text-kiosk-sm text-muted-foreground">
                                    Descarga tu certificado de aprobación
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <Button
                                    size="lg"
                                    variant="secondary"
                                    onClick={() => {
                                        setCurrentQuestionIndex(0);
                                        setAnswers({});
                                        setState('quiz');
                                    }}
                                    className="touch-target"
                                >
                                    Intentar de Nuevo
                                </Button>
                                <p className="text-kiosk-sm text-muted-foreground">
                                    Puntaje mínimo requerido: {selectedQuiz?.passingScore}%
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </KioskModal>
    );
}