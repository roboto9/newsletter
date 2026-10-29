const form      = document.getElementById('form-inscription');
const messageEl = document.getElementById('message');
const btn       = document.getElementById('btn-submit');
const iframe    = document.getElementById('hidden_iframe');

function afficherMessage(texte, type = 'info') {
  messageEl.textContent = texte;
  messageEl.className   = 'message ' + type;
}

// Quand on soumet le formulaire
form.addEventListener('submit', (e) => {
  const nom   = document.getElementById('nom').value.trim();
  const email = document.getElementById('email').value.trim();

  if (nom.length < 2) {
    e.preventDefault();
    return afficherMessage('Veuillez saisir un nom valide.', 'error');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    e.preventDefault();
    return afficherMessage('Adresse email invalide.', 'error');
  }

  // On affiche l'attente
  btn.disabled = true;
  btn.textContent = 'Envoi en cours…';
  afficherMessage('');
});

// Quand l'iframe a fini de charger
iframe.addEventListener('load', () => {
  // On ajoute un léger délai pour être sûr que le navigateur a fini d'écrire dans l'iframe
  setTimeout(() => {
    try {
      const reponse = iframe.contentDocument.body.innerText;
      
      if (reponse && reponse.includes('result')) {
        const data = JSON.parse(reponse);
        
        if (data.result === 'success') {
          afficherMessage(data.message, 'success');
          form.reset();
        } else {
          afficherMessage(data.message, 'error');
        }
      }
    } catch (err) {
      console.log("Lecture de l'iframe bloquée ou en cours.");
    } finally {
      btn.disabled = false;
      btn.textContent = "S'abonner";
    }
  }, 150); // 150 millisecondes de délai
});
