# Instrucciones generales del repositorio

## Idioma y enseñanza

- Trabaja y responde en español.
- Antes de proponer o ejecutar un comando, explica qué hace, por qué se usa, qué modifica y sus riesgos.
- Prioriza comandos que funcionen igual en Windows, Linux y macOS. Si un comando depende de PowerShell, muestra también su equivalente de Bash cuando sea útil.

## Desarrollo

- Lee las instrucciones y convenciones existentes antes de editar.
- Conserva los cambios del usuario y evita modificaciones fuera del alcance.
- Aplica Clean Code y SOLID de forma proporcional, sin sobrearquitectura.
- Prefiere cambios pequeños, nombres descriptivos, responsabilidades separadas y dependencias mínimas.
- En sitios web estáticos, separa HTML semántico, CSS y JavaScript modular, preservando comportamiento y diseño salvo solicitud expresa.

## Validación

- Revisa `git diff` después de editar.
- Ejecuta pruebas, lint, formateo o compilación ya configurados cuando sean pertinentes.
- Distingue entre verificaciones ejecutadas y verificaciones pendientes.

## Seguridad y Git

- Nunca expongas secretos ni los escribas en el repositorio.
- Solicita autorización antes de instalar dependencias, eliminar datos, usar servicios externos, cambiar ramas, crear commits, hacer rebase, merge, push o desplegar.
- No uses comandos destructivos como procedimiento normal.
