const API_URL = 'https://script.google.com/macros/s/AKfycbyCFQq8PNkIpaZimtcXkprx4cWSD8uc-kUnx6gufb0emDjGbOAtNlsHMGcUUGXviioRBw/exec';
let MOT_DE_PASSE = '';

// ==========================================
// LES 10 MODÈLES DE NEWSLETTER
// ==========================================
const TEMPLATES = [
  {
    id: 'tpl-1',
    name: '1. Simple & Sobre',
    html: `<div style="font-family:Arial,sans-serif;color:#333;max-width:600px;margin:0 auto;"><h2 style="color:#2563eb;">Titre de votre actualité</h2><p>Bonjour,</p><p>Voici les dernières nouvelles de la semaine.</p><p><a href="#" style="color:#2563eb;">Lire la suite</a></p><p>Cordialement,<br>L'équipe.</p></div>`
  },
  {
    id: 'tpl-2',
    name: '2. Carte d\'actualité',
    html: `<div style="font-family:Arial,sans-serif;background:#f8fafc;padding:20px;border-radius:8px;max-width:600px;margin:0 auto;"><div style="background:#fff;padding:20px;border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,.05);"><h3 style="margin-top:0;color:#0f172a;">Nouvelle mise à jour</h3><p style="color:#475569;">Découvrez les nouveautés de notre plateforme.</p><a href="#" style="display:inline-block;background:#2563eb;color:#fff;padding:10px 20px;text-decoration:none;border-radius:6px;margin-top:10px;">Découvrir</a></div></div>`
  },
  {
    id: 'tpl-3',
    name: '3. Éditorial Tech',
    html: `<div style="font-family:Georgia,serif;color:#1e293b;max-width:600px;margin:0 auto;line-height:1.6;"><h1 style="border-bottom:2px solid #2563eb;padding-bottom:10px;">L'Œil du Numérique</h1><p><em>L'analyse de la semaine par notre équipe.</em></p><p>Le monde de la tech évolue rapidement. Cette semaine, nous nous penchons sur l'impact de l'IA générative sur les métiers du développement.</p><p>Bonne lecture !</p></div>`
  },
  {
    id: 'tpl-4',
    name: '4. Liste à puces',
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;"><h2>Les 3 infos à retenir cette semaine</h2><ul style="background:#f1f5f9;padding:20px 20px 20px 40px;border-radius:8px;"><li style="margin-bottom:10px;"><strong>Info 1 :</strong> Nouvelle version du framework.</li><li style="margin-bottom:10px;"><strong>Info 2 :</strong> Mise à jour de sécurité importante.</li><li><strong>Info 3 :</strong> Un tutoriel exclusif pour nos abonnés.</li></ul></div>`
  },
  {
    id: 'tpl-5',
    name: '5. Dark Mode',
    html: `<div style="font-family:Arial,sans-serif;background:#0f172a;color:#f8fafc;padding:30px;border-radius:10px;max-width:600px;margin:0 auto;"><h2 style="color:#60a5fa;margin-top:0;">Flash Info Tech</h2><p>Le numérique ne dort jamais, et nous non plus.</p><p style="background:#1e293b;padding:15px;border-left:4px solid #60a5fa;border-radius:4px;">Découvrez notre dernier dossier sur la cybersécurité.</p><a href="#" style="color:#60a5fa;text-decoration:none;font-weight:bold;">Lire le dossier &rarr;</a></div>`
  },
  {
    id: 'tpl-6',
    name: '6. Focus Produit',
    html: `<div style="font-family:Arial,sans-serif;text-align:center;max-width:600px;margin:0 auto;padding:20px;"><img src="https://via.placeholder.com/500x250/e2e8f0/64748b?text=Illustration" alt="Illustration" style="width:100%;border-radius:8px;margin-bottom:20px;"><h2 style="color:#0f172a;">L'outil qu'il vous faut</h2><p style="color:#475569;margin-bottom:20px;">Gagnez du temps avec notre nouvelle intégration.</p><a href="#" style="background:#0f172a;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;">Essayer gratuitement</a></div>`
  },
  {
    id: 'tpl-7',
    name: '7. Citation / Inspiration',
    html: `<div style="font-family:'Times New Roman',serif;max-width:600px;margin:0 auto;text-align:center;padding:40px 20px;"><p style="font-size:1.5em;color:#2563eb;font-style:italic;">"La simplicité est la sophistication suprême."</p><p style="color:#64748b;">- Léonard de Vinci</p><hr style="border:0;border-top:1px solid #e2e8f0;margin:30px 0;"><p style="font-family:Arial,sans-serif;color:#333;text-align:left;">Et si on appliquait cette maxime à notre code cette semaine ? Voici nos astuces pour simplifier vos projets.</p></div>`
  },
  {
    id: 'tpl-8',
    name: '8. Récap semaine',
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;"><div style="background:#2563eb;color:#fff;padding:15px 20px;"><h2 style="margin:0;font-size:1.2em;">Le Récap' de la semaine</h2></div><div style="padding:20px;color:#333;"><p><strong>Lundi :</strong> Annonce majeure.</p><hr style="border:0;border-top:1px solid #f1f5f9;"><p><strong>Mercredi :</strong> Nouveau tutoriel.</p><hr style="border:0;border-top:1px solid #f1f5f9;"><p><strong>Vendredi :</strong> Webinaire exclusif.</p></div></div>`
  },
  {
    id: 'tpl-9',
    name: '9. Annonce Événement',
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;text-align:center;padding:30px;background:#eff6ff;border-radius:8px;"><p style="text-transform:uppercase;letter-spacing:2px;color:#2563eb;font-size:.8em;font-weight:bold;">À ne pas manquer</p><h2 style="color:#0f172a;margin:10px 0;">Webinaire : L'avenir du Web</h2><p style="color:#475569;">Rejoignez-nous le 15 novembre à 18h pour une session exclusive.</p><a href="#" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;margin-top:15px;">S'inscrire</a></div>`
  },
  {
    id: 'tpl-10',
    name: '10. Message de Bienvenue',
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;text-align:center;"><h1 style="color:#2563eb;">Bienvenue !</h1><p>Merci de nous avoir rejoint. Vous faites maintenant partie de la communauté de <strong>L'Œil du Numérique</strong>.</p><p style="background:#f8fafc;padding:15px;border-radius:6px;font-size:.9em;color:#64748b;">Préparez-vous à recevoir le meilleur de la tech, directement dans votre boîte de réception.</p></div>`
  }
];

// ==========================================
// UTILITAIRES
// ==========================================
function afficherStatus(texte, type = 'success') {
  const el = document.getElementById('status');
  el.textContent = texte;
  el.className   = 'message ' + type;
}

// Envoi d'une requête POST à Apps Script et lecture de la réponse JSON
async function appelerAPI(params) {
  const res = await fetch(API_URL, {
    method: 'POST',
    body: new URLSearchParams(params)
  });
  return res.json();
}

// Modification de l'action selon le bouton cliqué
function preparerEnvoi(actionType) {
  document.getElementById('form-action').value = actionType;
}

// ==========================================
// INITIALISATION DES MODÈLES
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('templates-grid');
  if (!grid) return;

  TEMPLATES.forEach(tpl => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className   = 'template-btn';
    btn.textContent = tpl.name;
    btn.onclick = () => {
      document.getElementById('contenu').value = tpl.html;
      document.getElementById('sujet').focus();
    };
    grid.appendChild(btn);
  });
});

// ==========================================
// CONNEXION ADMIN
// ==========================================
document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();

  const erreurEl = document.getElementById('login-erreur');
  const bouton   = e.target.querySelector('button[type="submit"]');
  const mdp      = document.getElementById('mdp-admin').value;

  erreurEl.textContent = '';
  bouton.disabled = true;
  bouton.textContent = 'Vérification…';

  try {
    const data = await appelerAPI({ action: 'verifierAdmin', mdp: mdp });

    if (data.result === 'success') {
      MOT_DE_PASSE = mdp;
      document.getElementById('login-box').style.display = 'none';
      document.getElementById('admin-app').style.display = 'block';
      chargerInfosBienvenue();
    } else {
      erreurEl.textContent = data.message || 'Mot de passe incorrect.';
    }
  } catch (err) {
    erreurEl.textContent = 'Impossible de contacter le serveur. Vérifiez le déploiement Apps Script.';
  } finally {
    bouton.disabled = false;
    bouton.textContent = 'Se connecter';
  }
});

// ==========================================
// ENVOI / PROGRAMMATION
// ==========================================
document.getElementById('form-envoi').addEventListener('submit', async (e) => {
  e.preventDefault();

  const action    = document.getElementById('form-action').value; // 'envoyer' ou 'programmer'
  const sujet     = document.getElementById('sujet').value.trim();
  const contenu   = document.getElementById('contenu').value;
  const dateInput = document.getElementById('dateEnvoi').value;

  let dateEnvoi = '';
  if (action === 'programmer') {
    if (!dateInput) {
      return afficherStatus('Choisissez une date d\'envoi pour programmer.', 'error');
    }
    // Conversion en ISO (UTC) pour éviter les décalages de fuseau horaire côté serveur
    dateEnvoi = new Date(dateInput).toISOString();
  }

  const boutons = e.target.querySelectorAll('button[type="submit"]');
  boutons.forEach(b => b.disabled = true);
  afficherStatus(action === 'programmer' ? 'Programmation en cours…' : 'Envoi en cours…', 'success');

  try {
    const data = await appelerAPI({
      action: action,
      mdp: MOT_DE_PASSE,
      sujet: sujet,
      contenu: contenu,
      dateEnvoi: dateEnvoi
    });
    afficherStatus(data.message, data.result === 'success' ? 'success' : 'error');
  } catch (err) {
    afficherStatus('Erreur de connexion au serveur.', 'error');
  } finally {
    boutons.forEach(b => b.disabled = false);
  }
});

// ==========================================
// MAIL DE BIENVENUE
// ==========================================
function afficherStatusBienvenue(texte, type = 'success') {
  const el = document.getElementById('bienvenue-status');
  el.textContent = texte;
  el.className   = 'message ' + type;
}

function majBoutonBienvenue(enAttente) {
  const btn = document.getElementById('btn-bienvenue');
  btn.textContent = enAttente > 0
    ? 'Envoyer aux nouveaux abonnés (' + enAttente + ' en attente)'
    : 'Envoyer aux nouveaux abonnés (aucun en attente)';
}

async function chargerInfosBienvenue() {
  try {
    const data = await appelerAPI({ action: 'infosBienvenue', mdp: MOT_DE_PASSE });
    if (data.result === 'success') {
      document.getElementById('auto-bienvenue').checked = !!data.auto;
      majBoutonBienvenue(data.enAttente);
    }
  } catch (err) {
    afficherStatusBienvenue('Impossible de charger les infos de bienvenue.', 'error');
  }
}

document.getElementById('auto-bienvenue').addEventListener('change', async (e) => {
  const caseEl = e.target;
  caseEl.disabled = true;
  try {
    const data = await appelerAPI({
      action: 'setAutoBienvenue',
      mdp: MOT_DE_PASSE,
      valeur: caseEl.checked ? 'true' : 'false'
    });
    afficherStatusBienvenue(data.message, data.result === 'success' ? 'success' : 'error');
    if (data.result !== 'success') caseEl.checked = !caseEl.checked;
  } catch (err) {
    caseEl.checked = !caseEl.checked;
    afficherStatusBienvenue('Erreur de connexion au serveur.', 'error');
  } finally {
    caseEl.disabled = false;
  }
});

document.getElementById('btn-bienvenue').addEventListener('click', async (e) => {
  const btn = e.target;
  btn.disabled = true;
  afficherStatusBienvenue('Envoi en cours…', 'success');
  try {
    const data = await appelerAPI({ action: 'bienvenue', mdp: MOT_DE_PASSE });
    afficherStatusBienvenue(data.message, data.result === 'success' ? 'success' : 'error');
    await chargerInfosBienvenue();
  } catch (err) {
    afficherStatusBienvenue('Erreur de connexion au serveur.', 'error');
  } finally {
    btn.disabled = false;
  }
});
