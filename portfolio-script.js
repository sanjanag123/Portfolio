// ========================================
// SANJU'S NOTEBOOK - PORTFOLIO SCRIPT
// Interactive Journal Experience 🩷
// ========================================

// Open the journal with animation
function openJournal() {
    const cover = document.getElementById('cover');
    const journal = document.getElementById('journal');
    
    // Fade out cover
    cover.style.animation = 'fadeOut 0.8s ease-out';
    
    setTimeout(() => {
        cover.style.display = 'none';
        journal.style.display = 'block';
    }, 800);
}

// Go back to home page
function goHome() {
    const cover = document.getElementById('cover');
    const journal = document.getElementById('journal');
    
    journal.style.display = 'none';
    cover.style.display = 'flex';
    cover.style.animation = 'fadeIn 1s ease-in';
}

// Navigate between pages
function showPage(pageId) {
    const currentActivePage = document.querySelector('.page-spread.active');
    const currentPageId = currentActivePage ? currentActivePage.id.replace('page-', '') : null;
    
    // If clicking on the same page, just collapse the bookmark
    if (currentPageId === pageId) {
        const activeBookmark = document.querySelector('.bookmark.active');
        if (activeBookmark) {
            // Temporarily remove active class to collapse
            activeBookmark.classList.remove('active');
            setTimeout(() => {
                activeBookmark.classList.add('active');
            }, 300);
        }
        return;
    }
    
    // Hide all pages
    const allPages = document.querySelectorAll('.page-spread');
    allPages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    // Show selected page
    const selectedPage = document.getElementById(`page-${pageId}`);
    if (selectedPage) {
        selectedPage.style.display = 'flex';
        setTimeout(() => {
            selectedPage.classList.add('active');
        }, 10);
    }
    
    // Update active bookmark
    const allBookmarks = document.querySelectorAll('.bookmark');
    allBookmarks.forEach(bookmark => {
        bookmark.classList.remove('active');
    });
    
    const activeBookmark = document.querySelector(`.bookmark[data-page="${pageId}"]`);
    if (activeBookmark) {
        activeBookmark.classList.add('active');
        
        // Auto-collapse bookmark after 1 second
        setTimeout(() => {
            activeBookmark.classList.remove('active');
        }, 1000);
    }
}

// Mascot removed per user request

// Add highlighting effect on text selection (like a marker)
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        ::selection {
            background-color: rgba(244, 143, 177, 0.5);
            color: #5d4037;
        }
        
        ::-moz-selection {
            background-color: rgba(244, 143, 177, 0.5);
            color: #5d4037;
        }
    `;
    document.head.appendChild(style);
});

// Page curl effect on hover for pages
document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    
    pages.forEach(page => {
        page.addEventListener('mouseenter', function() {
            this.style.transform = 'translateZ(10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        page.addEventListener('mouseleave', function() {
            this.style.transform = 'translateZ(0)';
        });
    });
});

// Add random paper texture variations
document.addEventListener('DOMContentLoaded', () => {
    const stickyNotes = document.querySelectorAll('.sticky-note');
    
    stickyNotes.forEach(note => {
        const randomRotation = (Math.random() - 0.5) * 4; // Random rotation between -2 and 2 degrees
        note.style.transform = `rotate(${randomRotation}deg)`;
    });
});

// Smooth scroll for project previews in iframes
document.addEventListener('DOMContentLoaded', () => {
    const iframes = document.querySelectorAll('.project-preview');
    
    iframes.forEach(iframe => {
        iframe.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const pages = ['about', 'farm', 'narrative', 'emotions'];
    const currentPage = document.querySelector('.page-spread.active');
    
    if (!currentPage) return;
    
    const currentId = currentPage.id.replace('page-', '');
    const currentIndex = pages.indexOf(currentId);
    
    // Left arrow - previous page
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        showPage(pages[currentIndex - 1]);
    }
    
    // Right arrow - next page
    if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
        showPage(pages[currentIndex + 1]);
    }
});

// Add fade-out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }
`;
document.head.appendChild(style);

// Console easter egg
console.log('%c🩷 Welcome to Sanju\'s Notebook! 🩷', 'font-size: 20px; color: #f48fb1; font-weight: bold;');
console.log('%c✨ Use ← → arrow keys to navigate between pages! ✨', 'font-size: 14px; color: #925285;');

