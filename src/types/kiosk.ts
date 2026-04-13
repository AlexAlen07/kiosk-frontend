// NebuBot Kiosk Types (source of truth)

export interface Course {
    id: string;
    title: string;
    description: string;
    duration: string;
    progress: number;
    lessons: Lesson[];
    thumbnail?: string;
    category: string;
}

export interface Lesson {
    id: string;
    title: string;
    content: string;
    duration: string;
    completed: boolean;
}

export interface Video {
    id: string;
    title: string;
    description: string;
    duration: string;
    thumbnail: string;
    url?: string;
    category: string;
}

export interface Policy {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    lastUpdated: string;
}

export interface Quiz {
    id: string;
    title: string;
    description: string;
    questions: QuizQuestion[];
    passingScore: number;
    timeLimit?: number;
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
}

export interface QuizResult {
    quizId: string;
    score: number;
    totalQuestions: number;
    passed: boolean;
    completedAt: string;
}

export interface Certificate {
    id: string;
    title: string;
    recipientName: string;
    issuedAt: string;
    courseId?: string;
    quizId?: string;
    downloadUrl?: string;
}

/**
 * Nota: KioskHome hoy usa status='waiting'.
 * Lovable incluye connected/waiting/scanning/error.
 * Si tu UI usa 'success' o 'reading', cámbialo a 'connected'/'scanning' o amplía el union aquí.
 */
export interface CardReaderStatus {
    status: "connected" | "waiting" | "scanning" | "error";
    message: string;
    employeeId?: string;
    employeeName?: string;
}

// Employee info for card reader authentication
export interface Employee {
    id: string;
    name: string;
    token: string;
    department: string;
    avatar?: string;
}

// Chat message type for chatbot
export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

export type TileColor =
    | "blue"
    | "orange"
    | "yellow"
    | "green"
    | "purple"
    | "red"
    | "cyan"
    | "pink"
    | "teal"
    | "help" //ADD
    | "chatbot"; //ADD

export interface KioskTileConfig {
    id: string;
    label: string;
    icon: string;
    color: TileColor;
    page: PageType;
}

export type PageType =
    | "home"
    | "policies"
    | "orientation"
    | "safety"
    | "courses"
    | "videos"
    | "quiz"
    | "certificates"
    | "help";
