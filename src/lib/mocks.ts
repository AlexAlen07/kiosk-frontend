// NebuBot Kiosk Mock Data

import type { Course, Video, Policy, Quiz, Certificate, QuizResult, Employee, ChatMessage } from '@/types/kiosk';

// 0) EMPLOYEE

// Mock employees for card reader demo
export const mockEmployees: Employee[] = [
    {
        id: 'emp-001',
        name: 'María García',
        token: 'CARD001',
        department: 'Producción',
        avatar: undefined
    },
    {
        id: 'emp-002',
        name: 'Carlos Rodríguez',
        token: 'CARD002',
        department: 'Almacén',
        avatar: undefined
    },
    {
        id: 'emp-003',
        name: 'Ana López',
        token: 'CARD003',
        department: 'Calidad',
        avatar: undefined
    },
    {
        id: 'emp-004',
        name: 'Juan Martínez',
        token: 'DEMO123',
        department: 'Mantenimiento',
        avatar: undefined
    }
];

// =========================
// 1) POLÍTICAS Y PROCEDIMIENTOS (ISO 9001 / IMS)
// =========================

export const mockPolicies: Policy[] = [
    {
        id: 'pol-1',
        title: 'Política Integrada del Sistema de Gestión (IMS)',
        excerpt: 'Compromiso de la empresa con calidad, seguridad y salud, y gestión ambiental bajo un enfoque ISO.',
        content: `Política Integrada del Sistema de Gestión (IMS)

1. Propósito

Establecer el compromiso de la empresa con:

- Calidad (enfoque al cliente y mejora continua)
- Seguridad y Salud en el Trabajo (prevención de lesiones y deterioro de la salud)
- Gestión Ambiental (prevención de la contaminación y uso responsable de recursos)

2. Alcance

Aplica a todas las áreas, procesos, colaboradores, contratistas y visitantes.

3. Compromisos clave (alineados a ISO)

- Cumplir requisitos legales, reglamentarios y otros requisitos aplicables
- Gestionar riesgos y oportunidades de manera preventiva
- Proveer recursos, competencias y concienciación
- Mantener control de documentos y registros
- Impulsar la mejora continua del desempeño del sistema

4. Responsabilidades

Cada colaborador:

- Cumple los procedimientos aplicables
- Reporta incidentes, no conformidades y oportunidades de mejora
- Participa en capacitaciones y evaluaciones`,
        category: 'Sistema ISO (IMS)',
        lastUpdated: '2026-02-01',
    },
    {
        id: 'pol-2',
        title: 'ISO 9001: Control de Documentos y Registros',
        excerpt: 'Cómo se crean, aprueban, actualizan y conservan documentos y registros del sistema.',
        content: `ISO 9001: Control de Documentos y Registros

Objetivo

Asegurar que los documentos vigentes estén disponibles y que los registros sean trazables, legibles y protegidos.

Reglas principales

- Todo documento debe tener: código, versión, fecha, responsable y aprobación
- No se usa documentación obsoleta en operación
- Los registros se conservan según el tiempo definido por el proceso (retención)
- Cambios importantes requieren revisión y comunicación a usuarios

Buenas prácticas

- Verifica versión antes de ejecutar un procedimiento
- Evita imprimir (si se imprime, marcar como “COPIA NO CONTROLADA”)
- Reporta si encuentras un documento desactualizado`,
        category: 'ISO 9001 (Calidad)',
        lastUpdated: '2026-01-28',
    },
    {
        id: 'pol-3',
        title: 'ISO 9001: No Conformidades y Acción Correctiva',
        excerpt: 'Proceso para registrar, contener, investigar causa raíz y prevenir recurrencia.',
        content: `ISO 9001: No Conformidades y Acción Correctiva

¿Qué es una no conformidad?

Cualquier incumplimiento de un requisito (cliente, legal, interno, ISO, especificación).

Flujo estándar

1) Detectar y registrar (qué ocurrió, dónde, cuándo, evidencia)
2) Contener (evitar que el problema llegue al cliente o se repita de inmediato)
3) Analizar causa raíz (5 porqués / Ishikawa)
4) Implementar acción correctiva
5) Verificar efectividad (¿se eliminó la causa?)

Responsabilidades del colaborador

- Reportar inmediatamente a su supervisor
- No “arreglar” sin registrar si impacta calidad o seguridad`,
        category: 'ISO 9001 (Calidad)',
        lastUpdated: '2026-01-28',
    },

    {
        id: 'pol-audit-1',
        title: 'Políticas y Procedimientos: Auditorías Internas del Sistema ISO',
        excerpt: 'Planificación, ejecución y comportamiento esperado durante auditorías internas.',
        content: `Políticas y Procedimientos: Auditorías Internas del Sistema ISO

- Las auditorías verifican cumplimiento de procesos y eficacia del sistema
- Se ejecutan según un plan anual (o cuando se requiera por cambios/incidentes)
- Preparación: revisar procedimientos vigentes y registros requeridos
- Durante la auditoría: responder con hechos y evidencia, no suposiciones
- Registrar hallazgos: conformidades, no conformidades y oportunidades de mejora
- Acciones posteriores: planes de acción, responsables y verificación de efectividad`,
        category: 'Sistema ISO (IMS)',
        lastUpdated: '2026-02-03',
    },

    {
        id: 'pol-9001-risk',
        title: 'Políticas y Procedimientos: Gestión de Riesgos y Oportunidades',
        excerpt: 'Identificación, evaluación y tratamiento de riesgos para asegurar continuidad y mejora.',
        content: `Políticas y Procedimientos: Gestión de Riesgos y Oportunidades

- Identificar riesgos por proceso (calidad, seguridad, ambiente, cumplimiento)
- Evaluar impacto y probabilidad según la metodología interna
- Definir controles y responsables (prevención, mitigación, contingencias)
- Documentar acciones y evidencias (registros)
- Revisar periódicamente la efectividad de los controles
- Escalar riesgos críticos a la dirección según el procedimiento`,
        category: 'Sistema ISO (IMS)',
        lastUpdated: '2026-02-03',
    },

    {
        id: 'pol-9001-complaints',
        title: 'Políticas y Procedimientos: Atención de Quejas y Satisfacción del Usuario',
        excerpt: 'Registro, análisis y respuesta oportuna para proteger la calidad del servicio.',
        content: `Políticas y Procedimientos: Atención de Quejas y Satisfacción del Usuario

- Registrar quejas/reclamos con datos mínimos (fecha, canal, descripción, evidencia)
- Clasificar severidad e impacto (cliente/usuario, legal, reputacional)
- Definir respuesta inicial y tiempos de atención según el SLA interno
- Investigar causa y determinar acciones (corrección y/o acción correctiva)
- Comunicar el resultado al usuario por canal autorizado
- Mantener registros para auditoría y análisis de tendencias`,
        category: 'ISO 9001 (Calidad)',
        lastUpdated: '2026-02-03',
    },
];

// =========================
// 2) ORIENTACIÓN NUEVOS EMPLEADOS (ONBOARDING)
// =========================

export const mockOrientationPolicies: Policy[] = [
    {
        id: 'onb-1',
        title: 'Guía de Inducción: Primer Día',
        excerpt: 'Checklist de accesos, cultura ISO, seguridad básica y qué completar.',
        content: `Inducción: Primer Día

Accesos

- Identificación / tarjeta
- Acceso a sistemas y normas de TI

Cultura ISO

- Hacer lo que está documentado y documentar lo que se hace
- Reportar riesgos y oportunidades de mejora

Seguridad base

- Rutas de evacuación y punto de reunión
- EPP según área

Primera semana

- Lectura de políticas clave
- Evaluación inicial (seguridad y cumplimiento)`,
        category: 'Orientación',
        lastUpdated: '2026-02-01',
    },
    {
        id: 'onb-2',
        title: 'Código de Conducta y Ética',
        excerpt: 'Integridad, respeto, confidencialidad y canales de reporte.',
        content: `Código de Conducta y Ética

- Integridad y respeto en toda interacción
- Cero tolerancia a acoso y discriminación
- Protección de información confidencial
- Reporte por canales oficiales (supervisor / RR.HH.)`,
        category: 'Orientación',
        lastUpdated: '2026-01-20',
    },

    {
        id: 'onb-3',
        title: 'Orientación: Confidencialidad y Protección de Información',
        excerpt: 'Buenas prácticas para proteger información interna, datos personales y accesos.',
        content: `Orientación: Confidencialidad y Protección de Información

- No compartir usuarios/contraseñas; usa credenciales personales
- Bloquear pantalla al ausentarse del puesto
- No enviar información interna por canales no autorizados
- Respetar el principio de “necesidad de saber”
- Reportar inmediatamente pérdidas de equipos o accesos sospechosos
- Destruir/reciclar documentos impresos según reglas internas`,
        category: 'Orientación',
        lastUpdated: '2026-02-03',
    },

    {
        id: 'onb-4',
        title: 'Orientación: 5S y Conducta en el Puesto de Trabajo',
        excerpt: 'Orden, limpieza y disciplina para seguridad, eficiencia y cumplimiento del sistema.',
        content: `Orientación: 5S y Conducta en el Puesto de Trabajo

- Clasificar: retirar lo que no se usa
- Ordenar: ubicar herramientas y materiales en su lugar identificado
- Limpiar: mantener el área libre de residuos y derrames
- Estandarizar: seguir señalización y métodos definidos
- Sostener: hábitos diarios y reportar desviaciones

Impacto: reduce incidentes, mejora productividad y facilita auditorías.`,
        category: 'Orientación',
        lastUpdated: '2026-02-03',
    },

    {
        id: 'onb-5',
        title: 'Orientación: Canales de Comunicación y Escalamiento',
        excerpt: 'Cómo solicitar soporte, reportar incidencias y escalar temas críticos.',
        content: `Orientación: Canales de Comunicación y Escalamiento

- Para temas operativos: supervisor directo
- Para temas de personal: RR.HH.
- Para riesgos/condiciones inseguras: Seguridad y Salud en el Trabajo
- Para temas ambientales: Responsable/Comité Ambiental
- Para TI: mesa de ayuda / canal oficial
- Regla clave: si el asunto puede afectar seguridad, calidad o ambiente, escalar de inmediato`,
        category: 'Orientación',
        lastUpdated: '2026-02-03',
    },

    {
        id: 'onb-6',
        title: 'Orientación: Puntualidad, Asistencia y Normas del Lugar de Trabajo',
        excerpt: 'Lineamientos de asistencia, uso de áreas comunes y comportamiento esperado.',
        content: `Orientación: Puntualidad, Asistencia y Normas del Lugar de Trabajo

- Cumplir horario asignado y registrar entrada/salida según el sistema
- Reportar ausencias o tardanzas por el canal definido antes del turno
- Respetar señalización, áreas restringidas y normas de visitantes
- Mantener orden y limpieza en áreas comunes
- Prohibido operar equipos sin autorización/capacitación
- Cumplir políticas internas (EPP, seguridad, confidencialidad, ética)`,
        category: 'Orientación',
        lastUpdated: '2026-02-03',
    },
];

// =========================
// 3) CAPACITACIÓN EN SEGURIDAD (ISO 45001)
// =========================

export const mockSafetyPolicies: Policy[] = [
    {
        id: 'sft-45001-inc',
        title: 'ISO 45001: Reporte de Incidentes y Casi-Accidentes',
        excerpt: 'Qué reportar, cuándo y cómo. Reportar es prevenir.',
        content: `ISO 45001: Reporte de Incidentes y Casi-Accidentes

Se reporta:

- Accidentes (con lesión)
- Incidentes (sin lesión)
- Casi-accidentes
- Condiciones/actos inseguros

Tiempo: inmediato (tan pronto sea seguro).
Pasos: asegurar área → notificar → registrar → apoyar investigación.`,
        category: 'ISO 45001 (SST)',
        lastUpdated: '2026-01-30',
    },
    {
        id: 'sft-epp',
        title: 'Procedimiento: Uso de EPP por Área',
        excerpt: 'Requisitos mínimos, inspección previa y reposición.',
        content: `Procedimiento: Uso de EPP por Área

- Usa el EPP indicado por señalización y matriz de riesgos
- Inspecciona antes de usar (daños/vencimiento)
- Reporta necesidad de reposición`,
        category: 'ISO 45001 (SST)',
        lastUpdated: '2026-02-02',
    },
    {
        id: 'sft-evac',
        title: 'Procedimiento: Evacuación y Emergencias',
        excerpt: 'Qué hacer ante alarma, evacuación, incendio o emergencia médica.',
        content: `Procedimiento: Evacuación y Emergencias

- Detén actividad de forma segura
- Evacúa por la ruta señalizada
- Ve al punto de reunión
- No reingresar hasta autorización`,
        category: 'ISO 45001 (SST)',
        lastUpdated: '2026-01-25',
    },

    {
        id: 'sft-45001-lockout',
        title: 'ISO 45001: Bloqueo y Etiquetado (LOTO) – Control de Energías',
        excerpt: 'Prevención de arranques inesperados: aislar, bloquear, etiquetar y verificar “cero energía”.',
        content: `ISO 45001: Bloqueo y Etiquetado (LOTO) – Control de Energías

- Identificar todas las fuentes de energía (eléctrica, mecánica, neumática, hidráulica, térmica)
- Apagar el equipo siguiendo el procedimiento
- Aislar la energía (válvulas, interruptores, desconectores)
- Colocar candado y tarjeta (etiqueta) con responsable y fecha
- Liberar energía residual (presión, cargas, calor)
- Verificar “cero energía” antes de intervenir
- Retirar LOTO solo por quien lo colocó o según procedimiento autorizado`,
        category: 'ISO 45001 (SST)',
        lastUpdated: '2026-02-03',
    },

    {
        id: 'sft-45001-ergonomics',
        title: 'ISO 45001: Ergonomía y Manipulación Manual de Cargas',
        excerpt: 'Prevención de lesiones: postura correcta, límites y uso de ayudas mecánicas.',
        content: `ISO 45001: Ergonomía y Manipulación Manual de Cargas

- Evaluar la carga: peso, tamaño, agarre y recorrido
- Mantener espalda recta y levantar con las piernas (no con la cintura)
- Evitar giros del tronco: girar con los pies
- Mantener la carga cerca del cuerpo
- Pedir ayuda o usar carretillas/elevadores cuando aplique
- Reportar dolor o molestias repetitivas para evaluación preventiva`,
        category: 'ISO 45001 (SST)',
        lastUpdated: '2026-02-03',
    },

    {
        id: 'sft-45001-fire',
        title: 'ISO 45001: Prevención de Incendios y Uso de Extintores',
        excerpt: 'Prevención, tipos de extintores y actuación segura ante conato de incendio.',
        content: `ISO 45001: Prevención de Incendios y Uso de Extintores

- Mantener salidas y rutas de evacuación despejadas
- No bloquear gabinetes, hidrantes ni extintores
- Reportar cables dañados, sobrecargas y olores a quemado
- Identificar el tipo de extintor según el riesgo del área
- Actuar solo si es seguro: método PAS (Puntar, Accionar, Barrer)
- Si el fuego crece o hay humo denso: evacuar y activar el plan de emergencia`,
        category: 'ISO 45001 (SST)',
        lastUpdated: '2026-02-03',
    },

];

// =========================
// 4) INFORMACIÓN AMBIENTAL (ISO 14001)
// =========================

export const mockEnvironmentPolicies: Policy[] = [
    {
        id: 'env-14001-waste',
        title: 'ISO 14001: Manejo de Residuos y Segregación',
        excerpt: 'Separación en origen, evitar mezclas y disposición correcta.',
        content: `ISO 14001: Manejo de Residuos y Segregación

- Separar en origen según esquema interno
- No mezclar peligrosos con comunes
- Etiquetar y respetar contenedores
- Reportar derrames o contenedores llenos`,
        category: 'ISO 14001 (Ambiente)',
        lastUpdated: '2026-01-29',
    },
    {
        id: 'env-14001-spill',
        title: 'ISO 14001: Respuesta ante Derrames',
        excerpt: 'Detener fuente, contener, proteger drenajes, limpiar y registrar.',
        content: `ISO 14001: Respuesta ante Derrames

1) Detener la fuente si es seguro
2) Contener con absorbentes/barreras
3) Proteger drenajes
4) Notificar y registrar el evento`,
        category: 'ISO 14001 (Ambiente)',
        lastUpdated: '2026-01-29',
    },
    {
        id: 'env-14001-save',
        title: 'ISO 14001: Ahorro de Energía y Agua',
        excerpt: 'Acciones simples para reducir consumo y mejorar desempeño ambiental.',
        content: `ISO 14001: Ahorro de Energía y Agua

- Apagar equipos/luces al finalizar
- Reportar fugas
- Usar recursos solo lo necesario
- Mantener buenas prácticas 5S`,
        category: 'ISO 14001 (Ambiente)',
        lastUpdated: '2026-01-22',
    },

    {
        id: 'env-14001-chemicals',
        title: 'ISO 14001: Manejo de Sustancias Químicas y Almacenamiento',
        excerpt: 'Etiquetado, compatibilidad, almacenamiento seguro y prevención de contaminación.',
        content: `ISO 14001: Manejo de Sustancias Químicas y Almacenamiento

- Mantener etiquetas legibles (nombre, riesgos, fecha) y SDS disponible
- Almacenar por compatibilidad (no mezclar ácidos con bases, oxidantes con combustibles, etc.)
- Mantener contención secundaria cuando aplique (bandejas/diques)
- Verificar integridad de envases y reportar fugas o corrosión
- Disponer trapos/absorbentes contaminados como residuo correspondiente`,
        category: 'ISO 14001 (Ambiente)',
        lastUpdated: '2026-02-03',
    },

    {
        id: 'env-14001-noise-air',
        title: 'ISO 14001: Control de Emisiones, Polvo y Ruido',
        excerpt: 'Buenas prácticas para minimizar emisiones al aire, partículas y ruido en el entorno de trabajo.',
        content: `ISO 14001: Control de Emisiones, Polvo y Ruido

- Mantener puertas/ventanas y extractores según el procedimiento del área
- Evitar generar polvo: humedecer cuando aplique y usar barreras de contención
- No operar equipos con fugas de humo/vapores; reportar de inmediato
- Respetar horarios y límites de ruido; usar equipos en buen estado
- Reportar olores inusuales, vibraciones excesivas o fallas en sistemas de ventilación`,
        category: 'ISO 14001 (Ambiente)',
        lastUpdated: '2026-02-03',
    },

    {
        id: 'env-14001-water',
        title: 'ISO 14001: Uso Responsable del Agua y Prevención de Descargas',
        excerpt: 'Control de consumo, prevención de fugas y manejo correcto para evitar descargas no autorizadas.',
        content: `ISO 14001: Uso Responsable del Agua y Prevención de Descargas

- Reportar inmediatamente fugas en grifos, mangueras, sanitarios o tuberías
- Cerrar válvulas y llaves al finalizar actividades de limpieza o producción
- No verter químicos, aceites o residuos al drenaje (usar contenedores designados)
- Usar bandejas/contención secundaria cuando se manipulen líquidos
- Mantener áreas de lavado limpias y con rejillas/filtros según procedimiento
- Registrar consumos o incidencias cuando el proceso lo requiera`,
        category: 'ISO 14001 (Ambiente)',
        lastUpdated: '2026-02-03',
    },

];

export const mockVideos: Video[] = [
    {
        id: 'vid-iso-9001-principios',
        title: 'ISO 9001: Principios de la norma (resumen)',
        description: 'Resumen breve de los principios de ISO 9001:2015 y su enfoque a la calidad.',
        duration: '≈5 min',
        thumbnail: '/placeholder.svg',
        category: 'ISO 9001 (Calidad)',
        url: 'https://www.youtube.com/watch?v=9cmMVaz7tpU',
    },
    {
        id: 'vid-iso-14001-5min',
        title: 'ISO 14001: ¿Qué es? (en menos de 5 minutos)',
        description: 'Introducción rápida a ISO 14001 y su sistema de gestión ambiental.',
        duration: '≈1–5 min',
        thumbnail: '/placeholder.svg',
        category: 'ISO 14001 (Ambiente)',
        url: 'https://www.youtube.com/watch?v=Bu5MzzRDXEI',
    },
    {
        id: 'vid-iso-45001-intro',
        title: 'ISO 45001: Introducción rápida',
        description: 'Conceptos base de SST: riesgos, controles y enfoque preventivo.',
        duration: '≈3–10 min',
        thumbnail: '/placeholder.svg',
        category: 'ISO 45001 (SST)',
        url: 'https://www.youtube.com/watch?v=VJDA4SMM3G8',
    },
    {
        id: 'vid-iso-22301',
        title: 'ISO 22301: Continuidad del Negocio (Introducción)',
        description: 'Qué es ISO 22301 y por qué ayuda a la resiliencia y continuidad operativa.',
        duration: '≈5–10 min',
        thumbnail: '/placeholder.svg',
        category: 'ISO 22301 (Continuidad)',
        url: 'https://www.youtube.com/watch?v=j6A9bbXHWDE',
    },
    {
        id: 'vid-iso-50001-5min',
        title: 'ISO 50001: ¿Qué es? (en ~5 minutos)',
        description: 'Introducción a gestión de energía y mejora del desempeño energético.',
        duration: '≈5 min',
        thumbnail: '/placeholder.svg',
        category: 'ISO 50001 (Energía)',
        url: 'https://www.youtube.com/watch?v=iSoeERF0LUA',
    },
    {
        id: 'vid-iso-27001-vs',
        title: 'ISO 9001 vs ISO 27001 (diferencias)',
        description: 'Comparación rápida: calidad (9001) vs seguridad de la información (27001).',
        duration: '≈5–10 min',
        thumbnail: '/placeholder.svg',
        category: 'ISO 27001 (Seguridad Información)',
        url: 'https://www.youtube.com/watch?v=Sya1-Z6T5zE',
    },
];

export const mockCourses: Course[] = [];

export const mockQuizzes: Quiz[] = [

    // 1) ISO 45001
    {
        id: 'quiz-iso45001-1',
        title: 'Evaluación: Seguridad y Salud (ISO 45001)',
        description: 'Evalúa conocimientos sobre SST, reporte de incidentes, EPP y control de riesgos.',
        passingScore: 80,
        timeLimit: 15,
        questions: [
            {
                id: 'q45001-1',
                question: '¿Cuál es el objetivo principal de ISO 45001?',
                options: [
                    'Aumentar ventas',
                    'Gestionar riesgos de SST y prevenir lesiones/enfermedades',
                    'Reducir costos de TI',
                    'Mejorar el marketing corporativo'
                ],
                correctAnswer: 1
            },
            {
                id: 'q45001-2',
                question: '¿Qué se considera un “casi-accidente”?',
                options: [
                    'Un evento con lesión confirmada',
                    'Un evento que pudo causar lesión o daño, pero no ocurrió',
                    'Un reporte de mantenimiento',
                    'Un cambio de turno'
                ],
                correctAnswer: 1
            },
            {
                id: 'q45001-3',
                question: 'El EPP debe usarse:',
                options: [
                    'Solo cuando el supervisor lo pida',
                    'Solo en emergencias',
                    'Siempre que el área/tarea lo requiera según señalización y procedimiento',
                    'Solo si el colaborador lo considera'
                ],
                correctAnswer: 2
            },
            {
                id: 'q45001-4',
                question: '¿Cuál es el primer paso ante una condición insegura?',
                options: [
                    'Ignorarla si no ha pasado nada',
                    'Reportarla por el canal definido y tomar acciones seguras inmediatas si aplica',
                    'Esperar al final del día',
                    'Publicarla en redes sociales'
                ],
                correctAnswer: 1
            },
            {
                id: 'q45001-5',
                question: '¿Qué busca la jerarquía de controles?',
                options: [
                    'Eliminar o reducir riesgos priorizando controles más efectivos',
                    'Reemplazar EPP por señalización siempre',
                    'Aumentar papeleo',
                    'Evitar reportar incidentes'
                ],
                correctAnswer: 0
            },
            {
                id: 'q45001-6',
                question: '¿Qué opción es un control de tipo “ingeniería”?',
                options: [
                    'Capacitación general',
                    'Señalización de advertencia',
                    'Guardas físicas en máquinas o ventilación localizada',
                    'Uso de guantes'
                ],
                correctAnswer: 2
            },
            {
                id: 'q45001-7',
                question: 'En una investigación de incidente, el objetivo es:',
                options: [
                    'Encontrar culpables',
                    'Eliminar la causa raíz para prevenir recurrencia',
                    'Evitar registrar evidencia',
                    'Castigar al equipo'
                ],
                correctAnswer: 1
            },
            {
                id: 'q45001-8',
                question: 'Antes de operar un equipo, el colaborador debe:',
                options: [
                    'Operarlo sin revisar nada',
                    'Verificar condiciones seguras, EPP y autorizaciones requeridas',
                    'Pedirle a otro que lo haga',
                    'Desactivar alarmas'
                ],
                correctAnswer: 1
            },
            {
                id: 'q45001-9',
                question: 'Si un colaborador se siente mareado en el área de trabajo, debe:',
                options: [
                    'Continuar hasta terminar',
                    'Notificar y buscar atención según el procedimiento de salud/seguridad',
                    'Irse sin avisar',
                    'Tomar una foto y seguir'
                ],
                correctAnswer: 1
            },
            {
                id: 'q45001-10',
                question: 'La participación de los trabajadores en ISO 45001 significa:',
                options: [
                    'Solo asistir a reuniones',
                    'Reportar riesgos, aportar mejoras y cumplir controles de SST',
                    'Decidir sin procedimientos',
                    'Evitar usar EPP'
                ],
                correctAnswer: 1
            }
        ]
    },

    // 2) ISO 14001
    {
        id: 'quiz-iso14001-1',
        title: 'Evaluación: Gestión Ambiental (ISO 14001)',
        description: 'Residuos, derrames, aspectos e impactos, y buenas prácticas ambientales.',
        passingScore: 80,
        timeLimit: 15,
        questions: [
            {
                id: 'q14001-1',
                question: '¿Qué busca principalmente ISO 14001?',
                options: [
                    'Gestionar impactos ambientales y mejorar desempeño ambiental',
                    'Aumentar inventario',
                    'Reducir horas de capacitación',
                    'Cambiar el organigrama'
                ],
                correctAnswer: 0
            },
            {
                id: 'q14001-2',
                question: 'Un “aspecto ambiental” es:',
                options: [
                    'Un requisito de ventas',
                    'Elemento de actividades/productos/servicios que interactúa con el ambiente',
                    'Un reporte financiero',
                    'Un indicador de TI'
                ],
                correctAnswer: 1
            },
            {
                id: 'q14001-3',
                question: 'La segregación de residuos debe hacerse:',
                options: [
                    'Solo al final del mes',
                    'En el punto de generación (en origen) según el esquema interno',
                    'Mezclando todo para ahorrar espacio',
                    'Solo por personal externo'
                ],
                correctAnswer: 1
            },
            {
                id: 'q14001-4',
                question: '¿Qué acción es correcta ante un derrame (si es seguro)?',
                options: [
                    'Dejarlo para que se evapore',
                    'Detener la fuente, contener y proteger drenajes, luego reportar',
                    'Limpiar con agua y ya',
                    'Cubrirlo con papel sin reportar'
                ],
                correctAnswer: 1
            },
            {
                id: 'q14001-5',
                question: 'Un residuo peligroso debe:',
                options: [
                    'Ir al zafacón común',
                    'Mezclarse con reciclables',
                    'Identificarse/etiquetarse y disponerse según procedimiento',
                    'Enterrarse'
                ],
                correctAnswer: 2
            },
            {
                id: 'q14001-6',
                question: '¿Cuál es una buena práctica de ahorro de energía?',
                options: [
                    'Dejar equipos encendidos por si acaso',
                    'Apagar luces/equipos al terminar y reportar consumos anómalos',
                    'Aumentar el aire acondicionado al máximo siempre',
                    'Imprimir todo'
                ],
                correctAnswer: 1
            },
            {
                id: 'q14001-7',
                question: 'El cumplimiento ambiental incluye:',
                options: [
                    'Solo requisitos internos',
                    'Solo opiniones del equipo',
                    'Requisitos legales y otros requisitos aplicables',
                    'Solo lo que sea más fácil'
                ],
                correctAnswer: 2
            },
            {
                id: 'q14001-8',
                question: '¿Qué debe hacerse con absorbentes contaminados por derrame?',
                options: [
                    'Reutilizarlos',
                    'Desecharlos como residuo correspondiente según procedimiento',
                    'Guardarlos en escritorio',
                    'Lavarlos en el drenaje'
                ],
                correctAnswer: 1
            },
            {
                id: 'q14001-9',
                question: 'Si detectas una fuga de agua, debes:',
                options: [
                    'Ignorarla',
                    'Reportarla inmediatamente por el canal definido',
                    'Esperar al cierre',
                    'Taparla con papel'
                ],
                correctAnswer: 1
            },
            {
                id: 'q14001-10',
                question: 'Mejora continua en ISO 14001 significa:',
                options: [
                    'No cambiar nada',
                    'Reducir impactos y mejorar desempeño ambiental con acciones planificadas',
                    'Solo hacer campañas una vez al año',
                    'Cambiar el logo'
                ],
                correctAnswer: 1
            }
        ]
    },

    // 3) ISO 9001
    {
        id: 'quiz-iso9001-1',
        title: 'Evaluación: Calidad (ISO 9001)',
        description: 'Control documental, no conformidades, enfoque a procesos y mejora continua.',
        passingScore: 80,
        timeLimit: 15,
        questions: [
            {
                id: 'q9001-1',
                question: 'ISO 9001 se enfoca principalmente en:',
                options: [
                    'Gestión de calidad y satisfacción del cliente',
                    'Gestión ambiental',
                    'Seguridad de la información',
                    'Gestión de energía'
                ],
                correctAnswer: 0
            },
            {
                id: 'q9001-2',
                question: 'Antes de ejecutar un procedimiento, debes:',
                options: [
                    'Usar cualquier versión',
                    'Verificar que el documento sea vigente y aprobado',
                    'Modificarlo sin autorización',
                    'Evitar registrar evidencias'
                ],
                correctAnswer: 1
            },
            {
                id: 'q9001-3',
                question: 'Una “no conformidad” es:',
                options: [
                    'Una felicitación',
                    'Un incumplimiento de un requisito (cliente, legal, interno)',
                    'Una reunión social',
                    'Una solicitud de vacaciones'
                ],
                correctAnswer: 1
            },
            {
                id: 'q9001-4',
                question: 'Acción correctiva busca:',
                options: [
                    'Ocultar el problema',
                    'Eliminar la causa raíz para prevenir recurrencia',
                    'Culpar a alguien',
                    'Solo corregir sin análisis'
                ],
                correctAnswer: 1
            },
            {
                id: 'q9001-5',
                question: '“Enfoque a procesos” significa:',
                options: [
                    'Trabajar sin procedimientos',
                    'Gestionar actividades como procesos interrelacionados con entradas/salidas',
                    'Solo medir resultados finales',
                    'No usar indicadores'
                ],
                correctAnswer: 1
            },
            {
                id: 'q9001-6',
                question: 'Un registro de calidad debe ser:',
                options: [
                    'Ilegible y sin fecha',
                    'Trazable, legible y protegido',
                    'Solo verbal',
                    'Guardado sin control'
                ],
                correctAnswer: 1
            },
            {
                id: 'q9001-7',
                question: 'La mejora continua se evidencia mediante:',
                options: [
                    'No cambiar nada',
                    'Acciones basadas en datos, auditorías, no conformidades y objetivos',
                    'Solo opiniones',
                    'Cambios sin registrar'
                ],
                correctAnswer: 1
            },
            {
                id: 'q9001-8',
                question: 'Si detectas un error en un proceso, debes:',
                options: [
                    'Ignorarlo',
                    'Reportarlo y seguir el proceso de no conformidades',
                    'Esperar a que lo descubra el cliente',
                    'Borrarlo del sistema'
                ],
                correctAnswer: 1
            },
            {
                id: 'q9001-9',
                question: 'La satisfacción del cliente se mejora al:',
                options: [
                    'No medir nada',
                    'Cumplir requisitos y gestionar quejas/retroalimentación',
                    'Evitar comunicación',
                    'Reducir controles'
                ],
                correctAnswer: 1
            },
            {
                id: 'q9001-10',
                question: 'Una auditoría interna sirve para:',
                options: [
                    'Castigar al equipo',
                    'Verificar cumplimiento y eficacia del sistema de gestión',
                    'Cambiar salarios',
                    'Eliminar procedimientos'
                ],
                correctAnswer: 1
            }
        ]
    },

    // 4) IMS
    {
        id: 'quiz-ims-1',
        title: 'Evaluación: Inducción al Sistema Integrado de Gestión (IMS)',
        description: 'Conceptos clave del IMS: cumplimiento, riesgos, documentos, roles y mejora.',
        passingScore: 75,
        timeLimit: 12,
        questions: [
            {
                id: 'qims-1',
                question: '¿Qué es un Sistema Integrado de Gestión (IMS)?',
                options: [
                    'Un software de inventario',
                    'Integración de varios sistemas (calidad, SST, ambiente) en un marco común',
                    'Un tipo de nómina',
                    'Un plan de redes sociales'
                ],
                correctAnswer: 1
            },
            {
                id: 'qims-2',
                question: '“Hacer lo documentado y documentar lo que se hace” significa:',
                options: [
                    'Evitar procedimientos',
                    'Seguir procedimientos vigentes y registrar evidencias',
                    'No guardar registros',
                    'Trabajar solo por experiencia'
                ],
                correctAnswer: 1
            },
            {
                id: 'qims-3',
                question: '¿Cuál es una responsabilidad del colaborador en el IMS?',
                options: [
                    'Ignorar riesgos',
                    'Reportar incidentes/no conformidades y proponer mejoras',
                    'Modificar documentos sin aprobación',
                    'Evitar auditorías'
                ],
                correctAnswer: 1
            },
            {
                id: 'qims-4',
                question: 'El control de documentos en el IMS asegura que:',
                options: [
                    'Se usen documentos obsoletos',
                    'Solo exista un documento',
                    'Se use la versión vigente y aprobada',
                    'No se registren cambios'
                ],
                correctAnswer: 2
            },
            {
                id: 'qims-5',
                question: 'La gestión de riesgos en el IMS busca:',
                options: [
                    'Identificar, evaluar y tratar riesgos y oportunidades',
                    'Eliminar todas las tareas',
                    'No medir nada',
                    'Solo reaccionar después del problema'
                ],
                correctAnswer: 0
            },
            {
                id: 'qims-6',
                question: 'Una no conformidad en el IMS es:',
                options: [
                    'Un cumplimiento perfecto',
                    'Un incumplimiento de un requisito aplicable',
                    'Una reunión de equipo',
                    'Un descanso'
                ],
                correctAnswer: 1
            },
            {
                id: 'qims-7',
                question: '¿Qué es una acción correctiva?',
                options: [
                    'Un castigo',
                    'Una acción para eliminar la causa raíz y prevenir recurrencia',
                    'Un rumor',
                    'Un cambio no controlado'
                ],
                correctAnswer: 1
            },
            {
                id: 'qims-8',
                question: 'Las auditorías internas sirven para:',
                options: [
                    'Verificar cumplimiento y eficacia del IMS',
                    'Eliminar registros',
                    'Evitar controles',
                    'Cambiar turnos'
                ],
                correctAnswer: 0
            },
            {
                id: 'qims-9',
                question: 'El cumplimiento incluye:',
                options: [
                    'Solo reglas informales',
                    'Requisitos legales, reglamentarios y otros aplicables',
                    'Solo decisiones del equipo',
                    'Solo recomendaciones'
                ],
                correctAnswer: 1
            },
            {
                id: 'qims-10',
                question: 'La mejora continua implica:',
                options: [
                    'No cambiar procesos',
                    'Mejorar con datos, revisiones y acciones planificadas',
                    'Solo cambiar el logo',
                    'Ignorar resultados'
                ],
                correctAnswer: 1
            }
        ]
    },

    // 5) Incendios y Emergencias
    {
        id: 'quiz-emergencias-1',
        title: 'Evaluación: Prevención de Incendios y Respuesta a Emergencias',
        description: 'Señalización, extintores, evacuación y actuación segura ante emergencias.',
        passingScore: 80,
        timeLimit: 15,
        questions: [
            {
                id: 'qem-1',
                question: '¿Cuál acción ayuda a prevenir incendios?',
                options: [
                    'Sobrecargar tomacorrientes',
                    'Mantener rutas de evacuación despejadas y reportar riesgos eléctricos',
                    'Bloquear extintores para que no se vean',
                    'Guardar solventes cerca de calor'
                ],
                correctAnswer: 1
            },
            {
                id: 'qem-2',
                question: 'Ante una alarma de evacuación, debes:',
                options: [
                    'Buscar tus pertenencias primero',
                    'Evacuar por la ruta señalizada y dirigirte al punto de reunión',
                    'Correr y empujar',
                    'Esperar confirmación en tu puesto'
                ],
                correctAnswer: 1
            },
            {
                id: 'qem-3',
                question: 'El método PAS para usar extintor significa:',
                options: [
                    'Parar, Avisar, Salir',
                    'Puntar, Accionar, Barrer',
                    'Probar, Agitar, Soltar',
                    'Preparar, Asegurar, Señalar'
                ],
                correctAnswer: 1
            },
            {
                id: 'qem-4',
                question: '¿Cuándo NO debes intentar apagar un incendio?',
                options: [
                    'Si es un conato pequeño y tienes entrenamiento',
                    'Si hay humo denso o el fuego crece rápidamente',
                    'Si el extintor está disponible y el camino está libre',
                    'Si puedes mantener una ruta de escape'
                ],
                correctAnswer: 1
            },
            {
                id: 'qem-5',
                question: 'Los extintores deben estar:',
                options: [
                    'Ocultos para evitar robos',
                    'Accesibles, señalizados y sin obstrucciones',
                    'Dentro de oficinas cerradas',
                    'En el piso'
                ],
                correctAnswer: 1
            },
            {
                id: 'qem-6',
                question: 'En una evacuación, es correcto:',
                options: [
                    'Usar ascensores',
                    'Seguir la ruta señalizada y ayudar si es seguro',
                    'Regresar por objetos personales',
                    'Separarte del grupo sin avisar'
                ],
                correctAnswer: 1
            },
            {
                id: 'qem-7',
                question: 'Si tu ropa se incendia, debes:',
                options: [
                    'Correr',
                    'Detenerte, tirarte al suelo y rodar (Stop-Drop-Roll)',
                    'Ir a esconderte',
                    'Quitar ropa corriendo'
                ],
                correctAnswer: 1
            },
            {
                id: 'qem-8',
                question: 'Un punto de reunión sirve para:',
                options: [
                    'Fumar después de evacuar',
                    'Realizar conteo y mantener control de personal evacuado',
                    'Regresar rápido al edificio',
                    'Guardar herramientas'
                ],
                correctAnswer: 1
            },
            {
                id: 'qem-9',
                question: 'Una emergencia médica debe reportarse:',
                options: [
                    'Solo al final del día',
                    'De inmediato por el canal interno definido',
                    'Solo si es grave',
                    'Solo a un compañero'
                ],
                correctAnswer: 1
            },
            {
                id: 'qem-10',
                question: '¿Qué práctica es correcta con sustancias inflamables?',
                options: [
                    'Almacenarlas cerca de calor',
                    'Mantenerlas etiquetadas y lejos de fuentes de ignición',
                    'Dejarlas abiertas para ventilar',
                    'Mezclarlas sin procedimiento'
                ],
                correctAnswer: 1
            }
        ]
    },

    // 6) Seguridad Industrial
    {
        id: 'quiz-seguridad-industrial-2',
        title: 'Evaluación: Seguridad Industrial (Avanzada)',
        description: 'Riesgos comunes, señalización, permisos de trabajo y controles operacionales.',
        passingScore: 75,
        timeLimit: 15,
        questions: [
            {
                id: 'qsi-1',
                question: '¿Qué significa una señal de “obligación”?',
                options: [
                    'Información general',
                    'Acción requerida (por ejemplo, uso de EPP)',
                    'Zona de descanso',
                    'Salida de emergencia'
                ],
                correctAnswer: 1
            },
            {
                id: 'qsi-2',
                question: 'Antes de iniciar un trabajo no rutinario, debes:',
                options: [
                    'Empezar de inmediato',
                    'Verificar permisos de trabajo y evaluación de riesgos',
                    'Evitar comunicarte con el supervisor',
                    'Desactivar alarmas'
                ],
                correctAnswer: 1
            },
            {
                id: 'qsi-3',
                question: '¿Cuál es un ejemplo de “acto inseguro”?',
                options: [
                    'Piso seco',
                    'Usar herramienta dañada o sin protección',
                    'Señalización visible',
                    'Uso correcto de casco'
                ],
                correctAnswer: 1
            },
            {
                id: 'qsi-4',
                question: 'Una condición insegura es:',
                options: [
                    'Una práctica segura',
                    'Un estado del entorno que puede causar daño (derrames, cables expuestos)',
                    'Un reporte de auditoría',
                    'Un permiso firmado'
                ],
                correctAnswer: 1
            },
            {
                id: 'qsi-5',
                question: '¿Qué debes hacer si una máquina no tiene guarda de seguridad?',
                options: [
                    'Operarla con cuidado',
                    'Reportar y no operar hasta aplicar control',
                    'Ignorar el riesgo',
                    'Pedir a otro que la use'
                ],
                correctAnswer: 1
            },
            {
                id: 'qsi-6',
                question: '¿Qué acción reduce riesgo de resbalones y caídas?',
                options: [
                    'Dejar el piso mojado',
                    'Orden y limpieza (5S), señalizar y atender derrames',
                    'Correr en pasillos',
                    'Bloquear rutas'
                ],
                correctAnswer: 1
            },
            {
                id: 'qsi-7',
                question: 'Para levantar cargas, es correcto:',
                options: [
                    'Doblar la espalda y girar el tronco',
                    'Usar piernas, mantener carga cerca y evitar giros',
                    'Levantar rápido para terminar',
                    'No pedir ayuda nunca'
                ],
                correctAnswer: 1
            },
            {
                id: 'qsi-8',
                question: '¿Qué opción es un control administrativo?',
                options: [
                    'Guardas físicas',
                    'Procedimientos, permisos de trabajo y capacitación',
                    'Eliminación del riesgo',
                    'Encapsulado del proceso'
                ],
                correctAnswer: 1
            },
            {
                id: 'qsi-9',
                question: 'Si identificas un riesgo crítico, debes:',
                options: [
                    'Seguir trabajando',
                    'Detener la actividad de forma segura y reportar/escalar',
                    'Esperar a la auditoría',
                    'Ignorar si no te afecta'
                ],
                correctAnswer: 1
            },
            {
                id: 'qsi-10',
                question: '¿Qué práctica es correcta para herramientas eléctricas?',
                options: [
                    'Usarlas con cables pelados',
                    'Revisar estado, usar protección y reportar daños',
                    'Mojarlas para limpiar',
                    'Quitar protecciones'
                ],
                correctAnswer: 1
            }
        ]
    },
];

export const mockCertificates: Certificate[] = [];

// Storage keys for localStorage persistence
export const STORAGE_KEYS = {
    COURSE_PROGRESS: 'nebubot_course_progress',
    QUIZ_RESULTS: 'nebubot_quiz_results',
    CERTIFICATES: 'nebubot_certificates',
    EMPLOYEE_INFO: 'nebubot_employee',
    CHAT_HISTORY: 'nebubot_chat_history'
} as const;

// Helper to get course progress from localStorage
export function getCourseProgress(): Record<string, number> {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.COURSE_PROGRESS);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
}

// Helper to save course progress
export function saveCourseProgress(courseId: string, progress: number): void {
    const current = getCourseProgress();
    current[courseId] = progress;
    localStorage.setItem(STORAGE_KEYS.COURSE_PROGRESS, JSON.stringify(current));
}

// Helper to get employee info from localStorage - ADD
export function getEmployeeInfo(): Employee | null {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.EMPLOYEE_INFO);
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
}

// Helper to save employee info - ADD
export function saveEmployeeInfo(employee: Employee): void {
    localStorage.setItem(STORAGE_KEYS.EMPLOYEE_INFO, JSON.stringify(employee));
}

// Helper to clear employee info (logout) - ADD
export function clearEmployeeInfo(): void {
    localStorage.removeItem(STORAGE_KEYS.EMPLOYEE_INFO);
}

// Helper to validate employee token against mock data - ADD
export function validateEmployeeToken(token: string): Employee | null {
    return mockEmployees.find(emp => emp.token === token) || null;
}

// Helper to get chat history from localStorage - ADD
export function getChatHistory(): ChatMessage[] {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

// Helper to save chat history - ADD
export function saveChatHistory(messages: ChatMessage[]): void {
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(messages));
}

// Helper to clear chat history - ADD
export function clearChatHistory(): void {
    localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
}

// Helper to get quiz results from localStorage
export function getQuizResults(): QuizResult[] {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

// Helper to save quiz result
export function saveQuizResult(result: QuizResult): void {
    const results = getQuizResults();
    results.push(result);
    localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(results));
}

// Helper to get certificates (SOLO dinámicos)
export function getCertificates(): Certificate[] {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
        if (!data) return [];
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

// Helper to save certificate
export function saveCertificate(cert: Certificate): void {
    const certs = getCertificates();

    // 1 certificado por quizId (si ya existe, actualiza en vez de duplicar)
    const existingIndex = cert.quizId
        ? certs.findIndex(c => c.quizId === cert.quizId)
        : -1;

    if (existingIndex >= 0) {
        certs[existingIndex] = { ...certs[existingIndex], ...cert };
    } else {
        certs.unshift(cert); // el más reciente arriba
    }

    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certs));
}

