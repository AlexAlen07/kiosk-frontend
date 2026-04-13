import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Clock, CheckCircle, PlayCircle, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { KioskModal } from '@/components/KioskModal';
import { EmptyState } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { mockCourses, getCourseProgress, saveCourseProgress } from '@/lib/mocks';
import type { Course, Lesson } from '@/types/kiosk';

interface CoursesPageProps {
    isOpen: boolean;
    onClose: () => void;
}

type CourseState = 'list' | 'course' | 'lesson';

export function CoursesPage({ isOpen, onClose }: CoursesPageProps) {
    const [state, setState] = useState < CourseState > ('list');
    const [selectedCourse, setSelectedCourse] = useState < Course | null > (null);
    const [selectedLesson, setSelectedLesson] = useState < Lesson | null > (null);
    const [courseProgress, setCourseProgress] = useState < Record < string, number>> ({});

    // Load progress from localStorage
    useEffect(() => {
        setCourseProgress(getCourseProgress());
    }, []);

    const handleClose = () => {
        setState('list');
        setSelectedCourse(null);
        setSelectedLesson(null);
        onClose();
    };

    const handleBack = () => {
        if (state === 'lesson') {
            setState('course');
            setSelectedLesson(null);
        } else if (state === 'course') {
            setState('list');
            setSelectedCourse(null);
        }
    };

    const openCourse = (course: Course) => {
        setSelectedCourse(course);
        setState('course');
    };

    const openLesson = (lesson: Lesson) => {
        setSelectedLesson(lesson);
        setState('lesson');
    };

    const completeLesson = () => {
        if (!selectedCourse || !selectedLesson) return;

        // Mark lesson as completed
        const lessonIndex = selectedCourse.lessons.findIndex(l => l.id === selectedLesson.id);
        const completedCount = selectedCourse.lessons.filter((l, i) =>
            l.completed || i === lessonIndex
        ).length;
        const newProgress = Math.round((completedCount / selectedCourse.lessons.length) * 100);

        // Save progress
        saveCourseProgress(selectedCourse.id, newProgress);
        setCourseProgress(prev => ({ ...prev, [selectedCourse.id]: newProgress }));

        toast.success('¡Lección completada!');

        // Move to next lesson or back to course
        const nextLessonIndex = lessonIndex + 1;
        if (nextLessonIndex < selectedCourse.lessons.length) {
            setSelectedLesson(selectedCourse.lessons[nextLessonIndex]);
        } else {
            toast.success('¡Curso completado!');
            setState('course');
            setSelectedLesson(null);
        }
    };

    const getTitle = () => {
        switch (state) {
            case 'lesson':
                return selectedLesson?.title || 'Lección';
            case 'course':
                return selectedCourse?.title || 'Curso';
            default:
                return 'Cursos Disponibles';
        }
    };

    const getProgress = (courseId: string, defaultProgress: number) => {
        return courseProgress[courseId] ?? defaultProgress;
    };

    return (
        <KioskModal
            isOpen={isOpen}
            onClose={handleClose}
            title={getTitle()}
            showBackButton={state !== 'list'}
            onBack={handleBack}
        >
            <AnimatePresence mode="wait">
                {/* Course List */}
                {state === 'list' && (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        {mockCourses.length === 0 ? (
                            <EmptyState
                                icon={<GraduationCap className="w-12 h-12" />}
                                title="No hay cursos disponibles"
                                description="Los cursos se mostrarán aquí cuando estén disponibles."
                            />
                        ) : (
                            mockCourses.map((course, index) => {
                                const progress = getProgress(course.id, course.progress);
                                return (
                                    <motion.button
                                        key={course.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => openCourse(course)}
                                        className="w-full p-5 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all touch-target focus-ring text-left group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`p-3 rounded-lg ${progress === 100 ? 'bg-tile-green/20 text-tile-green' : 'bg-tile-purple/20 text-tile-purple'}`}>
                                                {progress === 100 ? (
                                                    <CheckCircle className="w-6 h-6" />
                                                ) : (
                                                    <GraduationCap className="w-6 h-6" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-kiosk-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                                    {course.title}
                                                </h3>
                                                <p className="text-kiosk-sm text-muted-foreground line-clamp-2 mb-3">
                                                    {course.description}
                                                </p>

                                                {/* Progress bar */}
                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-kiosk-xs text-muted-foreground">
                                                        <span>{course.lessons.length} lecciones</span>
                                                        <span>{progress}% completado</span>
                                                    </div>
                                                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full transition-all ${progress === 100 ? 'bg-tile-green' : 'bg-primary'}`}
                                                            style={{ width: `${progress}%` }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 mt-3 text-kiosk-xs text-muted-foreground">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{course.duration}</span>
                                                    <span className="px-2 py-0.5 bg-secondary/50 rounded">{course.category}</span>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-2" />
                                        </div>
                                    </motion.button>
                                );
                            })
                        )}
                    </motion.div>
                )}

                {/* Course Detail */}
                {state === 'course' && selectedCourse && (
                    <motion.div
                        key="course"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                    >
                        {/* Course Info */}
                        <div className="p-4 rounded-xl bg-secondary/30">
                            <p className="text-kiosk-base text-foreground/90 mb-3">
                                {selectedCourse.description}
                            </p>
                            <div className="flex items-center gap-4 text-kiosk-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {selectedCourse.duration}
                                </span>
                                <span>{selectedCourse.lessons.length} lecciones</span>
                            </div>
                        </div>

                        {/* Lessons List */}
                        <div className="space-y-2">
                            <h4 className="text-kiosk-base font-semibold text-muted-foreground mb-3">
                                Contenido del Curso
                            </h4>
                            {selectedCourse.lessons.map((lesson, index) => {
                                const progress = getProgress(selectedCourse.id, selectedCourse.progress);
                                const isCompleted = progress > (index / selectedCourse.lessons.length) * 100;

                                return (
                                    <motion.button
                                        key={lesson.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => openLesson(lesson)}
                                        className="w-full p-4 rounded-lg bg-secondary/20 hover:bg-secondary/40 transition-all touch-target focus-ring text-left flex items-center gap-4"
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${isCompleted
                                                ? 'bg-tile-green text-white'
                                                : 'bg-secondary text-muted-foreground'
                                            }`}>
                                            {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="text-kiosk-base font-medium text-foreground">
                                                {lesson.title}
                                            </h5>
                                            <span className="text-kiosk-xs text-muted-foreground">{lesson.duration}</span>
                                        </div>
                                        <PlayCircle className="w-5 h-5 text-muted-foreground" />
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {/* Lesson View */}
                {state === 'lesson' && selectedLesson && (
                    <motion.div
                        key="lesson"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col h-full"
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-2 text-kiosk-sm text-muted-foreground mb-6">
                                <Clock className="w-4 h-4" />
                                <span>{selectedLesson.duration}</span>
                            </div>

                            <div className="prose prose-invert max-w-none">
                                <p className="text-kiosk-lg text-foreground/90 leading-relaxed">
                                    {selectedLesson.content}
                                </p>

                                {/* Placeholder content for demo */}
                                <div className="my-8 p-6 rounded-xl bg-secondary/30 text-center">
                                    <PlayCircle className="w-16 h-16 mx-auto mb-4 text-primary/50" />
                                    <p className="text-muted-foreground">
                                        Contenido de la lección (video, texto, interactivo, etc.)
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-border">
                            <Button
                                size="lg"
                                onClick={completeLesson}
                                className="w-full touch-target"
                            >
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Marcar como Completada
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </KioskModal>
    );
}