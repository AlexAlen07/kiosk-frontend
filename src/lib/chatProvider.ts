// NebuBot Chat Provider System
// Provides abstraction for chat backends (demo rules vs OpenAI)

import type { ChatMessage } from '@/types/kiosk';

// Chat provider interface
export interface ChatProvider {
    sendMessage(prompt: string, history: ChatMessage[]): Promise<string>;
}

// Demo provider - uses local rules for responses
export class DemoProvider implements ChatProvider {
    private responses: Record<string, string> = {
        'iso 27001': `ISO 27001 es el estándar internacional para la gestión de seguridad de la información.

🔐 Aspectos clave:

- Sistema de Gestión de Seguridad de la Información (SGSI)
- Evaluación y tratamiento de riesgos
- Políticas de seguridad documentadas
- Controles de acceso y autenticación
- Auditorías internas regulares

📋 Beneficios para la empresa:

- Protección de datos confidenciales
- Cumplimiento regulatorio
- Confianza de clientes y socios
- Reducción de incidentes de seguridad

¿Necesitas más información sobre algún aspecto específico de ISO 27001?`,

        'zero trust': `Zero Trust es un modelo de seguridad basado en el principio "nunca confiar, siempre verificar".

🛡️ Principios fundamentales:

- Verificación explícita de cada acceso
- Acceso con privilegios mínimos
- Asumir que la red ya está comprometida
- Microsegmentación de recursos

🔑 Implementación:
1. Identificar activos críticos
2. Mapear flujos de datos
3. Implementar autenticación multifactor
4. Monitorear y registrar todo el tráfico
5. Automatizar respuestas a amenazas

¿Te gustaría saber cómo aplicamos Zero Trust en nuestra organización?`,

        'gdpr': `GDPR (Reglamento General de Protección de Datos) es la normativa europea sobre privacidad de datos.

📊 Principios GDPR:

- Licitud, lealtad y transparencia
- Limitación de la finalidad
- Minimización de datos
- Exactitud
- Limitación del almacenamiento
- Integridad y confidencialidad

⚖️ Derechos de los usuarios:

- Derecho de acceso
- Derecho de rectificación
- Derecho al olvido
- Derecho a la portabilidad
- Derecho de oposición

🚨 Importante: Las multas pueden alcanzar hasta 20M€ o 4% de la facturación global.

¿Necesitas información sobre cómo cumplimos con GDPR?`,

        'auditoría': `Auditoría de Seguridad es el proceso de evaluación de los controles de seguridad.

📋 Tipos de auditoría:

- Auditoría interna
- Auditoría externa (terceros)
- Auditoría de cumplimiento
- Pruebas de penetración

🔍 Proceso típico:

1. Planificación y alcance
2. Recopilación de evidencias
3. Análisis de hallazgos
4. Informe de resultados
5. Plan de remediación
6. Seguimiento

📅 Frecuencia recomendada:

- Auditorías internas: Trimestral
- Auditorías externas: Anual
- Pen testing: Semestral

¿Quieres saber cuándo es nuestra próxima auditoría programada?`,

        'default': `¡Hola! Soy NebuBot, tu asistente de seguridad de la información.

Puedo ayudarte con temas como:

- 🔐 ISO 27001 - Sistema de gestión de seguridad
- 🛡️ Zero Trust - Arquitectura de seguridad moderna
- 📊 GDPR - Protección de datos personales
- 📋 Auditorías - Evaluación de controles

También puedo responder preguntas sobre:

- Políticas de seguridad de la empresa
- Procedimientos de respuesta a incidentes
- Buenas prácticas de ciberseguridad
- Capacitaciones disponibles

¿En qué puedo ayudarte hoy?`
    };

    async sendMessage(prompt: string, _history: ChatMessage[]): Promise<string> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

        const lowerPrompt = prompt.toLowerCase();

        // Check for keyword matches
        if (lowerPrompt.includes('iso 27001') || lowerPrompt.includes('iso27001')) {
            return this.responses['iso 27001'];
        }
        if (lowerPrompt.includes('zero trust') || lowerPrompt.includes('zerotrust')) {
            return this.responses['zero trust'];
        }
        if (lowerPrompt.includes('gdpr') || lowerPrompt.includes('protección de datos') || lowerPrompt.includes('privacidad')) {
            return this.responses['gdpr'];
        }
        if (lowerPrompt.includes('auditoría') || lowerPrompt.includes('auditoria') || lowerPrompt.includes('audit')) {
            return this.responses['auditoría'];
        }
        if (lowerPrompt.includes('hola') || lowerPrompt.includes('ayuda') || lowerPrompt.includes('help')) {
            return this.responses['default'];
        }

        // Generic response for unmatched queries
        return `Gracias por tu pregunta sobre "${prompt}".

Como asistente de seguridad, puedo orientarte en:

- Políticas y procedimientos de seguridad
- Normativas como ISO 27001, GDPR, SOC2
- Buenas prácticas de ciberseguridad
- Recursos de capacitación disponibles

Para consultas más específicas, te recomiendo contactar al equipo de Seguridad de la Información.

¿Hay algo más en lo que pueda ayudarte?`;
    }
}

// OpenAI provider - calls backend API endpoint
export class OpenAIProvider implements ChatProvider {
    private apiEndpoint: string;

    constructor(apiEndpoint: string = '/api/chat') {
        this.apiEndpoint = apiEndpoint;
    }

    async sendMessage(prompt: string, _history: ChatMessage[]): Promise<string> {
        try {
            // Backend espera multipart/form-data (upload.single('file'))
            const form = new FormData();
            form.append("content", prompt);
            form.append("sender", "user");
            form.append("conversationId", ""); // vacío = sesión nueva (sin historial server)
            form.append("language", "ES");

            const response = await fetch(this.apiEndpoint, {
                method: "POST",
                credentials: "include",
                body: form,
                // OJO: NO pongas Content-Type aquí; el browser lo setea con el boundary.
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();

            // ✅ tus formatos posibles (ya los tenías)
            if (typeof data?.reply === "string") return data.reply;
            if (typeof data?.botMessage?.content === "string") return data.botMessage.content;
            if (typeof data?.data?.reply === "string") return data.data.reply;
            if (typeof data?.data?.botMessage?.content === "string") return data.data.botMessage.content;
            if (typeof data?.data === "string") return data.data;

            return "No se recibió respuesta del servidor.";
        } catch (error) {
            console.error("OpenAI provider error:", error);
            throw new Error("Error al comunicarse con el servidor de IA. Por favor, intenta de nuevo.");
        }
    }
}

// Factory function to get the appropriate provider
export function getChatProvider(): ChatProvider {
    const providerType = import.meta.env.VITE_CHAT_PROVIDER || 'demo';

    if (providerType === 'openai') {
        const apiEndpoint = import.meta.env.VITE_CHAT_API_ENDPOINT || '/api/chat';
        return new OpenAIProvider(apiEndpoint);
    }

    return new DemoProvider();
}

// Export singleton instance
export const chatProvider = getChatProvider();
