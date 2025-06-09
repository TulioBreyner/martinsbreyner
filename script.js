const musicas = [
  {
    titulo: "Os Anjos Cantam",
    artista: "Jorge & Mateus",
    arquivo: "musicas/Os Anjos Cantam.mp3",
    capa: "imagensMusicas/os anjos cantam.jpg"
  },
  {
    titulo: "Antídoto",
    artista: "Matheus & Kauan",
    arquivo: "musicas/Antídoto.mp3",
    capa: "imagensMusicas/matheus e kauan.jpeg"
  },
  {
    titulo: "Investimento",
    artista: "Matheus & Kauan",
    arquivo: "musicas/Matheus & Kauan - Investimento.mp3",
    capa: "imagensMusicas/matheus e kauan.jpeg"
  },
  {
    titulo: "Vem pra minha vida",
    artista: "Henrique & Juliano",
    arquivo: "musicas/Henrique e Juliano - VEM PRA MINHA VIDA - DVD O Céu Explica Tudo.mp3",
    capa: "imagensMusicas/O_Céu_Explica_Tudo.jpg"
  },{
    titulo: "Deixa eu amar você",
    artista: "Fernando & Sorocaba",
    arquivo: "musicas/Deixa Eu Amar Você - Fernando & Sorocaba ｜ On Fire.mp3",
    capa: "imagensMusicas/deixa eu amar voce.jpeg"
  },
  {
    titulo: "Tudo que você quiser",
    artista: "Luan Santana",
    arquivo: "musicas/Luan Santana - Tudo que você quiser - (DVD O nosso tempo é hoje).mp3",
    capa: "imagensMusicas/tudo que voce quiser.jpeg"
  }
];

let index = 0;
const audio = document.getElementById("audio");
const titulo = document.getElementById("titulo");
const artista = document.getElementById("artista");
const capa = document.getElementById("capa");
const volume = document.getElementById("volume");
const lista = document.getElementById("lista-musicas");
const playPauseBtn = document.getElementById("playPauseBtn");
const progresso = document.getElementById("progresso");
const tempoAtual = document.getElementById("tempo-atual");
const tempoTotal = document.getElementById("tempo-total");


function carregarMusica(i) {
  const musica = musicas[i];
  titulo.textContent = musica.titulo;
  artista.textContent = musica.artista;
  capa.src = musica.capa;
  audio.src = musica.arquivo;
  atualizarLista(i);
}

function playPause() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸";
  } else {
    audio.pause();
    playPauseBtn.textContent = "⏯";
  }
}

function proxima() {
  index = (index + 1) % musicas.length;
  carregarMusica(index);
  audio.play();
  playPauseBtn.textContent = "⏸";
}

function anterior() {
  index = (index - 1 + musicas.length) % musicas.length;
  carregarMusica(index);
  audio.play();
  playPauseBtn.textContent = "⏸";
}

function atualizarLista(atual) {
  lista.innerHTML = "";
  musicas.forEach((m, i) => {
    const li = document.createElement("li");
    li.textContent = `${m.titulo} - ${m.artista}`;
    li.className = i === atual ? "playing" : "";
    li.style.opacity = i === atual ? "1" : "0.4";
    li.onclick = () => {
      index = i;
      carregarMusica(index);
      audio.play();
      playPauseBtn.textContent = "⏸";
    };
    lista.appendChild(li);
  });
}


volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
  proxima();
});

function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min}:${seg < 10 ? "0" + seg : seg}`;
}

audio.addEventListener("loadedmetadata", () => {
  progresso.max = Math.floor(audio.duration);
  tempoTotal.textContent = formatarTempo(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progresso.value = Math.floor(audio.currentTime);
  tempoAtual.textContent = formatarTempo(audio.currentTime);
});

progresso.addEventListener("input", () => {
  audio.currentTime = progresso.value;
});

let timeoutScroll;

lista.addEventListener("scroll", () => {
  lista.classList.add("scrolling");
  clearTimeout(timeoutScroll);
  timeoutScroll = setTimeout(() => {
    lista.classList.remove("scrolling");
  }, 500); // Remove classe após meio segundo sem rolagem
});


carregarMusica(index);
