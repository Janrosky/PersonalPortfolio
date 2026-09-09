export function initForm() {
  const form = document.getElementById('quoteForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    if (!button) return;
    const originalLabel = button.textContent;
    button.disabled = true;
    button.textContent = 'Enviando...';
    status.className = 'form-status';
    status.textContent = '';
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      });
      const data = await response.json();
      if (!response.ok || data.success === false) throw new Error('Request failed');
      status.className = 'form-status success';
      status.textContent = 'Mensaje enviado correctamente. Te contactaremos pronto.';
      form.reset();
    } catch (error) {
      status.className = 'form-status error';
      status.textContent = 'No pudimos enviar el mensaje. Inténtalo nuevamente.';
    } finally {
      button.disabled = false;
      button.textContent = originalLabel;
    }
  });
}