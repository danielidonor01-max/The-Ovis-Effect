/**
 * FINANCIAL ADVISORY — IMAGE CONFIGURATION
 */

const FIN_IMAGES = {
    // --- HERO IMAGE ---
    hero: "../assets/images/finance/hero-finance.jpg"
};

document.addEventListener('DOMContentLoaded', () => {
    const heroEl = document.querySelector('.fin-hero');
    if(heroEl && FIN_IMAGES.hero) {
        heroEl.style.backgroundImage = `linear-gradient(135deg, rgba(6, 15, 12, 0.95) 0%, rgba(13, 31, 24, 0.8) 100%), url('${FIN_IMAGES.hero}')`;
    }
});
