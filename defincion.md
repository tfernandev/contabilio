# MVP: App de Optimización Fiscal Argentina

## 🎯 Propuesta de Valor Core

**"La app que te ayuda a pagar menos impuestos legalmente, calculando automáticamente tus obligaciones y encontrando oportunidades de ahorro."**

---

## 📋 Funcionalidades del MVP (Versión 1.0)

### ✅ INCLUIR (Must Have)

#### 1. **Perfil de Usuario Básico**
- Registro con CUIT/CUIL
- Selección de régimen fiscal (Monotributo / Responsable Inscripto / Persona Física)
- Ingreso de datos básicos:
  - Ingresos mensuales/anuales
  - Categoría de monotributo (si aplica)
  - Situación familiar (cónyuge, hijos)
  - Provincia de residencia

#### 2. **Calculadora de Ganancias (Personas Físicas)**
- Cálculo automático de impuesto a las ganancias
- Consideración de:
  - Deducciones personales
  - Deducciones por hijos
  - Deducciones por cónyuge
  - Mínimo no imponible
- Resultado: "Debés pagar $X" o "No alcanzás el mínimo imponible"

#### 3. **Calculadora de Monotributo**
- Cálculo de cuota mensual según categoría
- Proyección de facturación anual
- Alerta de recategorización:
  - "Si facturás más de $X, pasás a categoría Y"
  - "Te quedan $X para facturar antes de recategorizar"
- Comparación de costos:
  - "Monotributo: $X/mes"
  - "Si fueras RI: $Y/mes"
  - "Ahorrás: $Z/mes"

#### 4. **Optimizador de Deducciones (Ganancias)**
- Lista de deducciones posibles:
  - Alquiler
  - Servicios (luz, gas, internet)
  - Gastos médicos
  - Educación
  - Donaciones
  - Seguros de vida
  - Otros
- Cálculo de ahorro potencial:
  - "Si deducís $X en alquiler, ahorrás $Y en impuestos"
- Sugerencias personalizadas:
  - "Podrías deducir hasta $X en gastos médicos"

#### 5. **Dashboard Principal**
- Vista resumen:
  - "Este mes debés pagar: $X"
  - "Próximos vencimientos"
  - "Oportunidades de ahorro: $Y"
- Gráficos simples:
  - Evolución de pagos (últimos 6 meses)
  - Desglose por tipo de impuesto

#### 6. **Recordatorios de Vencimientos**
- Vencimientos de:
  - Monotributo
  - Ganancias (si aplica)
  - Otros impuestos según provincia
- Notificaciones push/email
- Calendario de vencimientos

#### 7. **Educación Fiscal Básica**
- Sección "Aprende":
  - "¿Qué es el Monotributo?"
  - "¿Cómo funcionan las deducciones?"
  - "¿Cuándo pagar Ganancias?"
- Contenido simple, sin jerga técnica
- Ejemplos prácticos

---

### ⚠️ NO INCLUIR EN MVP (Versión 2.0+)

#### 1. **Facturación Electrónica**
- ❌ Ya está muy saturado
- ❌ Requiere integración compleja con AFIP
- ✅ Dejar para V2 si hay demanda

#### 2. **Integración Multi-Organismo Completa**
- ❌ Muy complejo para MVP
- ❌ Requiere múltiples APIs
- ✅ Empezar solo con AFIP (Monotributo + Ganancias)
- ✅ ARBA/AGIP en V2

#### 3. **Pagos Directos desde la App**
- ❌ Requiere integración con pasarelas de pago
- ❌ Regulaciones complejas
- ✅ En MVP: solo mostrar "Cómo pagar" con links

#### 4. **Comparador Avanzado de Regímenes**
- ❌ Muy complejo para MVP
- ✅ Versión básica en MVP (Monotributo vs RI simple)
- ✅ Versión avanzada en V2

#### 5. **IA Avanzada / Chatbot**
- ❌ Requiere entrenamiento y datos
- ✅ En MVP: recomendaciones basadas en reglas simples
- ✅ IA en V2

#### 6. **Historial Completo de Pagos**
- ❌ Requiere integración con bancos/AFIP
- ✅ En MVP: usuario ingresa pagos manualmente
- ✅ Integración automática en V2

---

## 🏗️ Arquitectura Técnica Mínima

### Frontend
- **Web App** (React/Vue/Angular)
  - Responsive (mobile-first)
  - PWA (Progressive Web App) para instalación en móvil
- **Opcional**: App nativa (solo si hay presupuesto)

### Backend
- **API REST** (.NET Core / Node.js / Python)
- **Base de datos**: PostgreSQL o SQL Server
- **Autenticación**: JWT tokens
- **Hosting**: Azure / AWS / Vercel

### Integraciones Externas (MVP)
- **AFIP API** (solo lectura):
  - Consulta de categoría de monotributo
  - Consulta de vencimientos
  - Consulta de deudas (opcional)
- **APIs de Impuestos Provinciales**: NO en MVP

### Servicios Externos
- **Email**: SendGrid / Mailgun (notificaciones)
- **Push Notifications**: Firebase Cloud Messaging (opcional en MVP)

---

## 📊 Estructura de Datos Mínima

### Usuario
```json
{
  "id": "uuid",
  "cuit": "20123456789",
  "email": "usuario@email.com",
  "regimen": "monotributo" | "responsable_inscripto" | "persona_fisica",
  "categoria_monotributo": 1-11,
  "provincia": "CABA",
  "situacion_familiar": {
    "conyuge": true/false,
    "hijos": 0-10
  },
  "ingresos_mensuales": 0,
  "fecha_registro": "2025-01-01"
}
```

### Cálculos
```json
{
  "usuario_id": "uuid",
  "tipo": "ganancias" | "monotributo",
  "periodo": "2025-01",
  "monto_calculado": 0,
  "detalle": {
    "base_imponible": 0,
    "deducciones": [],
    "alicuota": 0
  },
  "fecha_calculo": "2025-01-15"
}
```

### Vencimientos
```json
{
  "usuario_id": "uuid",
  "tipo_impuesto": "monotributo" | "ganancias",
  "fecha_vencimiento": "2025-01-20",
  "monto": 0,
  "pagado": true/false,
  "recordatorio_enviado": true/false
}
```

---

## 🎨 Diseño UX/UI Mínimo

### Pantallas Core (MVP)
1. **Login/Registro**
2. **Dashboard Principal**
3. **Calculadora de Ganancias**
4. **Calculadora de Monotributo**
5. **Optimizador de Deducciones**
6. **Calendario de Vencimientos**
7. **Sección "Aprende"**

### Principios de Diseño
- **Simple**: Máximo 3 clics para cualquier acción
- **Claro**: Lenguaje simple, sin jerga técnica
- **Visual**: Gráficos y colores para facilitar comprensión
- **Confiable**: Transparencia en cálculos (mostrar cómo se calcula)

---

## 📈 Criterios de Éxito del MVP

### Métricas Cuantitativas
- **Usuarios registrados**: 100 en primer mes
- **Usuarios activos**: 30% usa la app al menos 1 vez/semana
- **Cálculos realizados**: 500 cálculos en primer mes
- **Retención**: 40% de usuarios vuelven después de 7 días
- **Tiempo de uso**: Promedio 5 minutos por sesión

### Métricas Cualitativas
- **Feedback positivo**: "Me ayudó a entender cuánto debo pagar"
- **Recomendaciones**: Usuarios recomiendan la app
- **Errores mínimos**: <5% de cálculos incorrectos

### Validación de Hipótesis
- ✅ Los usuarios quieren saber cuánto pagar antes de que venza
- ✅ Los usuarios no entienden cómo calcular sus impuestos
- ✅ Los usuarios quieren optimizar pero no saben cómo
- ✅ Los usuarios confían en una app para esto

---

## 🚀 Plan de Lanzamiento (MVP)

### Fase 1: Desarrollo (8-12 semanas)
- **Semanas 1-2**: Arquitectura y setup
- **Semanas 3-4**: Backend API + Base de datos
- **Semanas 5-6**: Frontend core (Dashboard + Calculadoras)
- **Semanas 7-8**: Optimizador + Educación
- **Semanas 9-10**: Integración AFIP + Notificaciones
- **Semanas 11-12**: Testing + Ajustes

### Fase 2: Beta Testing (2-4 semanas)
- Invitar 20-50 usuarios beta
- Recolectar feedback
- Corregir bugs críticos
- Ajustar UX según feedback

### Fase 3: Lanzamiento Público
- Marketing básico (redes sociales, boca a boca)
- Monitoreo de métricas
- Iteración rápida según feedback

---

## 💰 Modelo de Negocio (MVP)

### Versión Gratuita
- Calculadoras básicas
- Recordatorios de vencimientos
- Educación fiscal básica
- Límite: 10 cálculos/mes

### Versión Premium (V2)
- Cálculos ilimitados
- Optimizador avanzado
- Integración multi-organismo
- Historial completo
- Asesoría personalizada (opcional)
- Precio: $2.000-5.000 ARS/mes

### Monetización MVP
- **No monetizar en MVP**: Enfocarse en validar producto
- **Monetizar en V2**: Una vez validado el valor

---

## 🔒 Consideraciones Legales y de Seguridad

### Seguridad
- ✅ Encriptación de datos sensibles (CUIT, ingresos)
- ✅ Autenticación segura (JWT + refresh tokens)
- ✅ HTTPS obligatorio
- ✅ Cumplimiento LGPD (Ley de Protección de Datos)

### Legal
- ⚠️ Disclaimer: "Esta app es informativa, no reemplaza asesoría profesional"
- ⚠️ Términos y Condiciones claros
- ⚠️ Política de Privacidad
- ⚠️ No almacenar datos financieros sensibles (tarjetas, etc.)

---

## 🎯 Diferenciadores Clave del MVP

1. **Enfoque en Optimización**: No solo gestión, sino ahorro
2. **Simplicidad**: Cálculos en 3 clics
3. **Educación**: Explicaciones claras, sin jerga
4. **Transparencia**: Mostrar cómo se calcula cada cosa
5. **Proactividad**: Alertas y sugerencias, no solo información

---

## 📝 Checklist Pre-Lanzamiento

### Funcionalidad
- [ ] Todas las calculadoras funcionan correctamente
- [ ] Integración AFIP operativa
- [ ] Notificaciones funcionando
- [ ] Responsive en móvil y desktop
- [ ] Manejo de errores robusto

### UX/UI
- [ ] Diseño limpio y profesional
- [ ] Navegación intuitiva
- [ ] Textos claros y sin jerga
- [ ] Loading states y feedback visual

### Seguridad
- [ ] Autenticación segura
- [ ] Datos encriptados
- [ ] HTTPS configurado
- [ ] Validación de inputs

### Legal
- [ ] Términos y Condiciones
- [ ] Política de Privacidad
- [ ] Disclaimer legal
- [ ] Cumplimiento LGPD

### Marketing
- [ ] Landing page
- [ ] Redes sociales básicas
- [ ] Material de lanzamiento
- [ ] Plan de comunicación

---

## 🎓 Próximos Pasos

1. **Validar MVP con usuarios reales** antes de desarrollar
2. **Crear prototipo clickeable** (Figma/Adobe XD)
3. **Hacer 5-10 entrevistas** con potenciales usuarios
4. **Ajustar MVP** según feedback
5. **Desarrollar MVP** según este documento
6. **Lanzar beta** con usuarios reales
7. **Iterar rápido** según métricas y feedback

---

## 📞 Preguntas para Validar MVP

Antes de desarrollar, preguntar a usuarios potenciales:

1. "¿Cómo calculás actualmente cuánto debés pagar de impuestos?"
2. "¿Qué te gustaría saber sobre tus impuestos que no sabés?"
3. "¿Usarías una app que te diga cuánto pagar y cómo ahorrar?"
4. "¿Qué funcionalidad sería más valiosa para vos?"
5. "¿Cuánto pagarías por una app así?"

---

**Versión**: 1.0  
**Fecha**: Enero 2025  
**Estado**: Draft para revisión
