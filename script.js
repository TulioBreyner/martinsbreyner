// --- Lógica para a Seção de Fotos ---
const initialPhotoDiv = document.getElementById('photo-display');
const viewPhotosBtn = document.getElementById('view-photos-btn');
const photoCarousel = document.getElementById('photo-carousel');
const carouselSlide = photoCarousel.querySelector('.carousel-slide');
const prevBtn = photoCarousel.querySelector('.prev-btn');
const nextBtn = photoCarousel.querySelector('.next-btn');
const carouselDots = photoCarousel.querySelector('.carousel-dots');

// Lista de imagens para o carrossel (ajuste os caminhos conforme suas imagens)
// Exemplo: 'imagens/minhafoto1.jpg', 'imagens/minhafoto2.jpg'
const carouselImages = [
    'imagens/foto1.jpg',
    'imagens/foto2.jpg',
    'imagens/foto3.jpg',
    'imagens/foto4.jpg',
    'imagens/foto5.jpg',
    'imagens/foto6.jpg',
    'imagens/foto7.jpg',
    'imagens/foto8.jpg',
    'imagens/foto9.jpg',
    'imagens/foto10.jpg',
];

let currentImageIndex = 0;

// Função para carregar as imagens no carrossel
function loadCarouselImages() {
    carouselSlide.innerHTML = ''; // Limpa qualquer conteúdo anterior
    carouselImages.forEach(imageSrc => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'Nossa foto';
        carouselSlide.appendChild(img);
    });
    // Força o reajuste da posição das imagens após carregamento
    setTimeout(updateCarousel, 50); 
}

// Função para criar e atualizar os dots de navegação
function createDots() {
    carouselDots.innerHTML = '';
    carouselImages.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === currentImageIndex) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            currentImageIndex = index;
            updateCarousel();
        });
        carouselDots.appendChild(dot);
    });
}

// Função para atualizar a exibição do carrossel
function updateCarousel() {
    // Garante que o carrossel não está oculto para calcular a largura
    if (photoCarousel.classList.contains('hidden')) {
        return; 
    }
    const imgWidth = carouselSlide.children[0] ? carouselSlide.children[0].clientWidth : 0;
    carouselSlide.style.transform = `translateX(${-currentImageIndex * imgWidth}px)`;

    // Atualiza os dots
    const dots = carouselDots.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentImageIndex);
    });
}

// Evento para o botão "Ver Fotos"
viewPhotosBtn.addEventListener('click', () => {
    initialPhotoDiv.classList.add('hidden'); // Esconde a foto inicial e o botão
    photoCarousel.classList.remove('hidden'); // Mostra o carrossel
    loadCarouselImages(); // Carrega as imagens
    createDots(); // Cria os dots
    // updateCarousel(); // Chamado dentro de loadCarouselImages com um pequeno delay
});

// Evento para o botão "Próximo"
nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
    updateCarousel();
});

// Evento para o botão "Anterior"
prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
    updateCarousel();
});

// Atualiza o carrossel quando a janela é redimensionada
window.addEventListener('resize', updateCarousel);


// --- Lógica para o Marcador de Tempo ---
const startDate = new Date('2024-03-09T00:00:00'); // Data de início: 9 de março de 2024
const yearsSpan = document.getElementById('years');
const monthsSpan = document.getElementById('months');
const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');

function updateTimeMarker() {
    const now = new Date();
    const diffMillis = now.getTime() - startDate.getTime(); // Diferença em milissegundos

    // Cálculo de anos e meses é mais complexo devido à variação de dias nos meses/anos.
    // Usamos o objeto Date para simular o crescimento ao longo do tempo.
    let tempDate = new Date(startDate);
    let years = 0;
    let months = 0;

    // Calcula anos completos
    while (tempDate.getFullYear() < now.getFullYear() || 
           (tempDate.getFullYear() === now.getFullYear() && tempDate.getMonth() < now.getMonth()) ||
           (tempDate.getFullYear() === now.getFullYear() && tempDate.getMonth() === now.getMonth() && tempDate.getDate() <= now.getDate())) {
        
        const nextYearDate = new Date(tempDate.getFullYear() + 1, tempDate.getMonth(), tempDate.getDate());
        if (nextYearDate <= now) {
            years++;
            tempDate = nextYearDate;
        } else {
            break;
        }
    }

    // Calcula meses completos a partir da data ajustada pelos anos
    while (tempDate.getFullYear() < now.getFullYear() || 
           (tempDate.getFullYear() === now.getFullYear() && tempDate.getMonth() < now.getMonth()) ||
           (tempDate.getFullYear() === now.getFullYear() && tempDate.getMonth() === now.getMonth() && tempDate.getDate() <= now.getDate())) {
        
        const nextMonthDate = new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, tempDate.getDate());
        if (nextMonthDate <= now) {
            months++;
            tempDate = nextMonthDate;
        } else {
            break;
        }
    }

    // Calcula os dias restantes
    const msPerDay = 1000 * 60 * 60 * 24;
    const remainingDaysMillis = now.getTime() - tempDate.getTime();
    const days = Math.floor(remainingDaysMillis / msPerDay);

    // Calcula horas, minutos e segundos a partir do restante do dia atual
    const secondsTotal = Math.floor((remainingDaysMillis % msPerDay) / 1000);

    const hours = Math.floor(secondsTotal / (60 * 60)) % 24;
    const minutes = Math.floor((secondsTotal / 60) % 60);
    const seconds = secondsTotal % 60;
    

    yearsSpan.textContent = String(years).padStart(2, '0');
    monthsSpan.textContent = String(months).padStart(2, '0');
    daysSpan.textContent = String(days).padStart(2, '0');
    hoursSpan.textContent = String(hours).padStart(2, '0');
    minutesSpan.textContent = String(minutes).padStart(2, '0');
    secondsSpan.textContent = String(seconds).padStart(2, '0');
}

// Atualiza o marcador de tempo a cada segundo
setInterval(updateTimeMarker, 1000);

// Chama a função uma vez ao carregar a página para evitar o "00" inicial
updateTimeMarker();