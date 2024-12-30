document.addEventListener("DOMContentLoaded", () => {
    const animeContainer = document.querySelector('.anime-container');
    const mangaContainer = document.querySelector('.manga-container');
    const videoModal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('video-player');
    const closeModal = document.getElementById('close-modal');
    const searchBar = document.getElementById('search-bar');
    const suggestionsBox = document.getElementById('suggestions-box');

    // تحميل البيانات
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            loadContent(data.animes, animeContainer, "anime");
            loadContent(data.mangas, mangaContainer, "manga");
        })
        .catch(error => {
            console.error('خطأ أثناء تحميل البيانات:', error);
            showAlert("خطأ في تحميل المحتوى. يرجى المحاولة لاحقًا.");
        });

    // تحميل المحتوى الديناميكي
    function loadContent(items, container, type) {
        container.innerHTML = '';
        items.forEach(item => {
            const card = `
                <div class="${type}-card">
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <button onclick="playVideo('${item.video}')">تشغيل</button>
                </div>
            `;
            container.innerHTML += card;
        });
    }

    // عرض الفيديو
    window.playVideo = function (videoUrl) {
        videoPlayer.src = videoUrl;
        videoModal.style.display = 'flex';
    };

    // إغلاق الفيديو
    closeModal.addEventListener('click', () => {
        videoModal.style.display = 'none';
        videoPlayer.src = '';
    });

    // البحث
    searchBar.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        suggestionsBox.innerHTML = '';
        if (query.length > 0) {
            // عرض اقتراحات
        }
    });
});

// عرض إشعارات
function showAlert(message) {
    alert(message);
}
