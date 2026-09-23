# Nextek Personal Portfolio

Sitio estático de Nextek y perfil de su fundador. Presenta servicios de ingeniería de software, casos publicados, proceso de trabajo y un formulario de contacto.

## Características

- Diseño responsive con navegación de escritorio y menú móvil.
- Animaciones de entrada, partículas en canvas, proceso interactivo, tilt de casos y cursor personalizado.
- Soporte para `prefers-reduced-motion` y navegación mediante teclado.
- Formulario asíncrono conectado a FormSubmit.
- Página de liderazgo independiente en `founder.html`.
- Casos narrativos de producto para Next-Meal y Next-Fix, con escenas animadas por GSAP.

## Estructura

```text
index.html
founder.html
next-meal.html
next-fix.html
assets/
  css/
    base.css
    components.css
    home.css
    founder.css
    case-study.css
  images/
    favicon.png
    marvilla.png
    icb.png
    contapyme.png
    facturacr.png
  js/
    main.js
    founder.js
    case-study.js
    modules/
README.md
```

## Tecnologías

HTML semántico, CSS moderno y JavaScript ES modules. GSAP y ScrollTrigger se cargan desde CDN en la página principal. Las fuentes se cargan desde Google Fonts.

## Ejecución local

No hay npm, dependencias locales ni proceso de build. Sirve la raíz con cualquier servidor HTTP estático, por ejemplo:

```text
python -m http.server 8000
```

Después abre `http://localhost:8000/`. Abrir directamente con `file://` puede bloquear los ES modules por las políticas del navegador.

## Arquitectura

`base.css` contiene variables, reset y reglas globales. `components.css` contiene patrones compartidos. `home.css` y `founder.css` contienen los estilos específicos de cada página.

`main.js` coordina módulos pequeños para navegación, reveal, formulario, partículas, proceso, portafolio y cursor. `founder.js` reutiliza navegación y reveal sin cargar comportamiento innecesario.

## Desarrollo

Edita HTML, CSS o JavaScript directamente y valida el sitio desde un servidor HTTP estático. No se requiere instalación de paquetes ni compilación.

## Contribución

Conserva la estructura modular, la accesibilidad, el soporte responsive y la ausencia de dependencias de build. Verifica ambas páginas en escritorio y móvil antes de proponer cambios.# PersonalPortfolio
My Personal Web
