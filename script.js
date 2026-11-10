/**
 * Portfolio Valérie ZOGNING - Script interactif
 * Fonctions : Filtrage des réalisations, modales détaillées, navigation mobile, gestion du CV
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Filtrage interactif des projets (les 3 volets)
    // -------------------------------------------------------------
    const tabBtns = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Mise à jour de l'onglet actif
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 2. Menu mobile responsive
    // -------------------------------------------------------------
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
        });

        // Fermeture automatique au clic sur un lien
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
            });
        });
    }

    // -------------------------------------------------------------
    // 3. Gestion de la touche Échap pour fermer les modales
    // -------------------------------------------------------------
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // -------------------------------------------------------------
    // 4. Surveillance du bouton de téléchargement de CV
    // -------------------------------------------------------------
    const cvDownloadBtn = document.getElementById('cvDownloadBtn');
    if (cvDownloadBtn) {
        cvDownloadBtn.addEventListener('click', (e) => {
            // Vérifie la présence du fichier, s'il n'est pas encore copié, avertit poliment l'utilisateur
            fetch(cvDownloadBtn.getAttribute('href'), { method: 'HEAD' })
                .then(response => {
                    if (!response.ok) {
                        console.info("Fichier PDF non détecté dans le dossier courant. Ouverture de la vue d'impression.");
                    }
                })
                .catch(() => {});
        });
    }
});

// -----------------------------------------------------------------
// Fonctions globales pour les modales
// -----------------------------------------------------------------
function openModal(modalId) {
    const overlay = document.getElementById('modalOverlay');
    const targetModal = document.getElementById(modalId);

    if (overlay && targetModal) {
        // Masquer toutes les modales d'abord
        document.querySelectorAll('.modal-box').forEach(box => {
            box.classList.remove('active');
        });

        // Afficher la modale ciblée
        overlay.classList.add('active');
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêcher le défilement arrière-plan
    }
}

function closeAllModals() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.querySelectorAll('.modal-box').forEach(box => {
            box.classList.remove('active');
        });
        document.body.style.overflow = 'auto'; // Réactiver le défilement
    }
}

function closeModalOnOverlay(event) {
    if (event.target.id === 'modalOverlay') {
        closeAllModals();
    }
}
