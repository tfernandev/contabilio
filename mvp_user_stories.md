# MVP: User Stories y Casos de Uso

## 👤 Personas (User Personas)

### Persona 1: "María - Monotributista"
- 32 años, diseñadora freelance
- Factura $800.000/mes
- Categoría D de Monotributo
- **Problema**: No sabe cuánto puede facturar antes de recategorizar
- **Necesidad**: Saber cuánto le queda para facturar y cuánto pagará si recategoriza

### Persona 2: "Juan - Empleado en Relación de Dependencia"
- 28 años, desarrollador
- Gana $1.200.000/mes
- **Problema**: No sabe si debe pagar Ganancias ni cuánto
- **Necesidad**: Calcular si alcanza el mínimo imponible y cuánto pagaría

### Persona 3: "Carlos - Responsable Inscripto"
- 45 años, dueño de PyME
- Factura $5.000.000/mes
- **Problema**: No sabe qué deducciones puede aplicar
- **Necesidad**: Optimizar deducciones para pagar menos impuestos

---

## 📖 User Stories

### Epic 1: Registro y Perfil

#### US-001: Registro de Usuario
```
Como: Usuario nuevo
Quiero: Registrarme con mi CUIT/CUIL
Para: Acceder a la app y calcular mis impuestos

Criterios de Aceptación:
- Puedo registrarme con email y CUIT/CUIL
- El sistema valida el formato del CUIT/CUIL
- Recibo un email de confirmación
- Puedo iniciar sesión después del registro
```

#### US-002: Configuración de Perfil
```
Como: Usuario registrado
Quiero: Configurar mi perfil fiscal
Para: Que los cálculos sean precisos

Criterios de Aceptación:
- Puedo seleccionar mi régimen (Monotributo/RI/Persona Física)
- Puedo ingresar mi categoría de monotributo (si aplica)
- Puedo ingresar mi situación familiar (cónyuge, hijos)
- Puedo seleccionar mi provincia
- Los datos se guardan y se usan en los cálculos
```

---

### Epic 2: Calculadora de Ganancias

#### US-003: Calcular Impuesto a las Ganancias
```
Como: Persona física
Quiero: Calcular cuánto debo pagar de Ganancias
Para: Saber mi obligación fiscal

Criterios de Aceptación:
- Ingreso mis ingresos mensuales/anuales
- El sistema calcula automáticamente:
  - Base imponible
  - Deducciones aplicables
  - Impuesto a pagar
- Veo un resultado claro: "Debés $X" o "No alcanzás el mínimo"
- Puedo ver el desglose del cálculo
```

#### US-004: Ver Deducciones Aplicadas
```
Como: Usuario
Quiero: Ver qué deducciones se aplicaron en el cálculo
Para: Entender cómo se calculó mi impuesto

Criterios de Aceptación:
- Veo lista de deducciones aplicadas:
  - Deducción personal
  - Deducción por cónyuge (si aplica)
  - Deducción por hijos (si aplica)
  - Mínimo no imponible
- Veo el monto de cada deducción
- Veo el total deducido
```

---

### Epic 3: Calculadora de Monotributo

#### US-005: Calcular Cuota de Monotributo
```
Como: Monotributista
Quiero: Ver cuánto debo pagar de Monotributo
Para: Planificar mis pagos

Criterios de Aceptación:
- Selecciono mi categoría de monotributo
- El sistema muestra:
  - Cuota mensual
  - Desglose (impuestos + obra social + jubilación)
- Puedo cambiar de categoría y ver cómo cambia la cuota
```

#### US-006: Alerta de Recategorización
```
Como: Monotributista
Quiero: Saber cuánto puedo facturar antes de recategorizar
Para: Evitar recategorizaciones no deseadas

Criterios de Aceptación:
- Ingreso mi facturación acumulada del año
- El sistema calcula:
  - Cuánto me queda para facturar en mi categoría actual
  - A qué categoría pasaría si recategorizo
  - Cuánto más pagaría en la nueva categoría
- Recibo una alerta visual si estoy cerca del límite
```

#### US-007: Comparar Monotributo vs Responsable Inscripto
```
Como: Monotributista
Quiero: Comparar costos de Monotributo vs RI
Para: Decidir si me conviene cambiar de régimen

Criterios de Aceptación:
- Ingreso mi facturación estimada
- El sistema muestra:
  - Costo mensual en Monotributo
  - Costo mensual como RI
  - Diferencia (ahorro o costo adicional)
- Veo un resumen claro de la comparación
```

---

### Epic 4: Optimizador de Deducciones

#### US-008: Ver Deducciones Disponibles
```
Como: Persona que paga Ganancias
Quiero: Ver qué deducciones puedo aplicar
Para: Reducir mi carga impositiva

Criterios de Aceptación:
- Veo lista de deducciones posibles:
  - Alquiler
  - Servicios (luz, gas, internet)
  - Gastos médicos
  - Educación
  - Donaciones
  - Seguros de vida
- Cada deducción muestra:
  - Límite máximo deducible
  - Requisitos para aplicar
  - Ejemplo de cálculo
```

#### US-009: Calcular Ahorro por Deducciones
```
Como: Usuario
Quiero: Calcular cuánto ahorro con cada deducción
Para: Priorizar qué deducciones aplicar

Criterios de Aceptación:
- Ingreso el monto de una deducción
- El sistema calcula:
  - Ahorro en impuestos
  - Nuevo monto a pagar
- Puedo agregar múltiples deducciones y ver el ahorro total
- Veo un resumen: "Ahorrás $X aplicando estas deducciones"
```

#### US-010: Recibir Sugerencias de Deducciones
```
Como: Usuario
Quiero: Recibir sugerencias de deducciones que puedo aplicar
Para: No perder oportunidades de ahorro

Criterios de Aceptación:
- El sistema analiza mi perfil
- Me sugiere deducciones relevantes:
  - "Podrías deducir hasta $X en alquiler"
  - "Tus gastos médicos son deducibles"
- Cada sugerencia muestra el ahorro potencial
```

---

### Epic 5: Dashboard

#### US-011: Ver Resumen de Obligaciones
```
Como: Usuario
Quiero: Ver un resumen de mis obligaciones fiscales
Para: Tener una vista general rápida

Criterios de Aceptación:
- Veo en el dashboard:
  - "Este mes debés pagar: $X"
  - Desglose por tipo de impuesto
  - Próximos vencimientos
  - Oportunidades de ahorro
- Los datos se actualizan según mi perfil
```

#### US-012: Ver Evolución de Pagos
```
Como: Usuario
Quiero: Ver un gráfico de mis pagos históricos
Para: Entender la evolución de mis obligaciones

Criterios de Aceptación:
- Veo un gráfico de los últimos 6 meses
- Puedo ver:
  - Monto pagado por mes
  - Tipo de impuesto
  - Tendencia (aumenta/disminuye)
- Los datos se basan en cálculos previos o ingresos manuales
```

---

### Epic 6: Recordatorios

#### US-013: Ver Calendario de Vencimientos
```
Como: Usuario
Quiero: Ver un calendario con mis vencimientos
Para: No olvidarme de pagar

Criterios de Aceptación:
- Veo calendario mensual con vencimientos marcados
- Cada vencimiento muestra:
  - Tipo de impuesto
  - Monto a pagar
  - Fecha de vencimiento
- Puedo filtrar por tipo de impuesto
```

#### US-014: Recibir Notificaciones de Vencimientos
```
Como: Usuario
Quiero: Recibir notificaciones antes de los vencimientos
Para: Recordar pagar a tiempo

Criterios de Aceptación:
- Recibo notificación 7 días antes del vencimiento
- Recibo notificación 1 día antes del vencimiento
- La notificación muestra:
  - Tipo de impuesto
  - Monto a pagar
  - Fecha de vencimiento
  - Link para ver detalles
- Puedo configurar frecuencia de notificaciones
```

---

### Epic 7: Educación Fiscal

#### US-015: Leer Artículos Educativos
```
Como: Usuario
Quiero: Leer artículos sobre impuestos
Para: Entender mejor el sistema fiscal

Criterios de Aceptación:
- Veo sección "Aprende" con artículos:
  - "¿Qué es el Monotributo?"
  - "¿Cómo funcionan las deducciones?"
  - "¿Cuándo pagar Ganancias?"
- Cada artículo:
  - Está escrito en lenguaje simple
  - Incluye ejemplos prácticos
  - Tiene máximo 500 palabras
  - Es fácil de entender
```

#### US-016: Ver Ejemplos Prácticos
```
Como: Usuario
Quiero: Ver ejemplos prácticos de cálculos
Para: Entender cómo se aplican las reglas

Criterios de Aceptación:
- Cada artículo incluye ejemplos:
  - Caso real
  - Cálculo paso a paso
  - Resultado final
- Los ejemplos son relevantes para mi situación
```

---

## 🎬 Casos de Uso Detallados

### Caso de Uso 1: María Calcula su Monotributo

**Actor**: María (Monotributista, Categoría D)

**Flujo Principal**:
1. María abre la app y ve el dashboard
2. Hace clic en "Calculadora de Monotributo"
3. Selecciona categoría D
4. Ve que debe pagar $45.000/mes
5. Ingresa su facturación acumulada: $6.500.000
6. El sistema le muestra:
   - "Te quedan $1.500.000 para facturar en categoría D"
   - "Si facturás más, pasás a categoría E ($52.000/mes)"
   - "Ahorrás $7.000/mes quedándote en categoría D"
7. María decide controlar su facturación para no recategorizar

**Flujo Alternativo**:
- Si María ya está cerca del límite, recibe una alerta roja
- El sistema le sugiere estrategias para no recategorizar

---

### Caso de Uso 2: Juan Calcula si Debe Pagar Ganancias

**Actor**: Juan (Empleado, $1.200.000/mes)

**Flujo Principal**:
1. Juan se registra y configura su perfil (Persona Física, soltero, sin hijos)
2. Va a "Calculadora de Ganancias"
3. Ingresa sus ingresos: $1.200.000/mes
4. El sistema calcula:
   - Ingresos anuales: $14.400.000
   - Deducción personal: $2.400.000
   - Base imponible: $12.000.000
   - Impuesto a pagar: $1.200.000/año ($100.000/mes)
5. Juan ve el resultado: "Debés pagar $100.000/mes de Ganancias"
6. Ve el desglose del cálculo
7. Hace clic en "Optimizador de Deducciones"
8. Ve que puede deducir alquiler, servicios, etc.
9. Ingresa $200.000/mes de alquiler
10. El sistema le muestra: "Ahorrás $20.000/mes deduciendo alquiler"

**Flujo Alternativo**:
- Si Juan no alcanza el mínimo imponible, ve: "No alcanzás el mínimo, no debés pagar Ganancias"

---

### Caso de Uso 3: Carlos Optimiza sus Deducciones

**Actor**: Carlos (Responsable Inscripto, factura $5.000.000/mes)

**Flujo Principal**:
1. Carlos va a "Optimizador de Deducciones"
2. Ve lista de deducciones disponibles
3. Hace clic en "Alquiler"
4. Ve que puede deducir hasta $X
5. Ingresa $500.000/mes de alquiler
6. El sistema calcula: "Ahorrás $50.000/mes"
7. Agrega gastos médicos: $100.000/mes
8. Ve ahorro total: "Ahorrás $60.000/mes con estas deducciones"
9. El sistema le sugiere: "También podrías deducir servicios por $X"
10. Carlos agrega más deducciones y ve el impacto total

---

### Caso de Uso 4: Usuario Recibe Recordatorio de Vencimiento

**Actor**: Usuario (Monotributista)

**Flujo Principal**:
1. Usuario tiene vencimiento de Monotributo el 20 de enero
2. El 13 de enero recibe notificación: "Tu Monotributo vence en 7 días"
3. Hace clic en la notificación
4. Ve detalles:
   - Monto: $45.000
   - Vencimiento: 20 de enero
   - Cómo pagar (link a AFIP)
5. El 19 de enero recibe recordatorio: "Tu Monotributo vence mañana"
6. Usuario marca como "Pagado" después de pagar
7. El recordatorio desaparece del dashboard

---

## 🎯 Priorización de User Stories

### Must Have (MVP)
- US-001: Registro
- US-002: Configuración de Perfil
- US-003: Calcular Ganancias
- US-005: Calcular Monotributo
- US-006: Alerta de Recategorización
- US-011: Dashboard Principal

### Should Have (MVP)
- US-004: Ver Deducciones Aplicadas
- US-007: Comparar Monotributo vs RI
- US-008: Ver Deducciones Disponibles
- US-009: Calcular Ahorro
- US-013: Calendario de Vencimientos

### Nice to Have (V2)
- US-010: Sugerencias de Deducciones
- US-012: Evolución de Pagos
- US-014: Notificaciones Push
- US-015: Artículos Educativos
- US-016: Ejemplos Prácticos

---

**Versión**: 1.0  
**Fecha**: Enero 2025
