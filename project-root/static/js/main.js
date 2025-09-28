// Carrossel simples: avança um cartão por vez em intervalos e pausa no hover
document.addEventListener('DOMContentLoaded', function () {
		const track = document.querySelector('.carousel-track');
		let cards = Array.from(document.querySelectorAll('.carousel-card'));
		if (!track) return;

		// Tenta carregar dados dinamicamente da API se disponível
		(async function tryLoadRemote() {
			try {
				const res = await fetch('/api/titles');
				if (!res.ok) throw new Error('no api');
				const data = await res.json();
				if (Array.isArray(data) && data.length > 0) {
					// Reconstrói o conteúdo do track a partir dos dados remotos
					track.innerHTML = '';
					for (let rep = 0; rep < 2; rep++) {
						data.forEach(t => {
							const card = document.createElement('div');
							card.className = 'carousel-card';
							const img = document.createElement('img');
							img.src = `/static/img/${t.img}`;
							img.alt = t.title || '';
							card.appendChild(img);
							track.appendChild(card);
						});
					}
					cards = Array.from(document.querySelectorAll('.carousel-card'));
				}
			} catch (err) {
				// API não disponível — usa conteúdo embutido
				cards = Array.from(document.querySelectorAll('.carousel-card'));
			}
		})();

		cards = Array.from(document.querySelectorAll('.carousel-card'));
		if (cards.length === 0) return;

	let index = 0;
	let intervalId = null;
	let cardWidth = 0;

	function measure() {
		cards = Array.from(document.querySelectorAll('.carousel-card'));
		if (cards.length === 0) return;
		const style = getComputedStyle(cards[0]);
		const marginRight = parseFloat(style.marginRight) || 0;
		cardWidth = cards[0].getBoundingClientRect().width + marginRight;
	}

	function update() {
		const offset = index * cardWidth;
		track.style.transform = `translateX(-${offset}px)`;
	}

	function next() {
			index = (index + 1) % originalCountTotal();
			update();
	}

		function prev() {
			index = (index - 1 + originalCountTotal()) % originalCountTotal();
			update();
		}

		function goToOriginal(i) {
			// move para o i-ésimo item da lista original (não duplicada)
			index = i; // mantemos o primeiro bloco como referência
			update();
			updateIndicators(i);
		}

		function originalCountTotal() {
			// como duplicamos a lista duas vezes no template, o total é 2 * n
			const n = Math.max(1, Math.floor(cards.length / 2));
			return n * 2;
		}

	function start() {
		if (intervalId) return;
		intervalId = setInterval(next, 2500);
	}

	function stop() {
		if (!intervalId) return;
		clearInterval(intervalId);
		intervalId = null;
	}

		// Inicializa medidas e animação
		measure();
		start();

		// Controles
		const btnPrev = document.querySelector('.carousel-control.prev');
		const btnNext = document.querySelector('.carousel-control.next');
		if (btnPrev) btnPrev.addEventListener('click', function () { stop(); prev(); start(); });
		if (btnNext) btnNext.addEventListener('click', function () { stop(); next(); start(); });

		// Indicators
		const indicators = Array.from(document.querySelectorAll('.carousel-indicators .indicator'));
		function updateIndicators(activeOriginalIndex) {
			indicators.forEach((btn, idx) => {
				const selected = idx === activeOriginalIndex;
				btn.setAttribute('aria-selected', selected ? 'true' : 'false');
				btn.classList.toggle('active', selected);
			});
		}
		indicators.forEach((btn) => {
			btn.addEventListener('click', function (e) {
				const i = parseInt(btn.getAttribute('data-index'), 10);
				stop();
				goToOriginal(i);
				start();
			});
		});

		// inicializa indicadores (marca o primeiro)
		updateIndicators(0);

	// Pausa ao passar o mouse sobre o carrossel
	const carousel = document.getElementById('carousel');
	if (carousel) {
		carousel.addEventListener('mouseenter', stop);
		carousel.addEventListener('mouseleave', start);

		// suporte básico a touch: pausa enquanto toca e permite swipe
		let startX = 0;
		let moved = false;
		carousel.addEventListener('touchstart', function (e) {
			stop();
			startX = e.touches[0].clientX;
			moved = false;
		}, {passive: true});

		carousel.addEventListener('touchmove', function (e) {
			const dx = e.touches[0].clientX - startX;
			if (Math.abs(dx) > 10) moved = true;
		}, {passive: true});

		carousel.addEventListener('touchend', function (e) {
			if (moved) {
				const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX;
				const dx = endX - startX;
					if (dx < -30) next(); // swipe left
					else if (dx > 30) prev(); // swipe right
					// atualiza indicadores com índice original
					const origIndex = index % Math.max(1, Math.floor(cards.length / 2));
					updateIndicators(origIndex);
					update();
			}
			start();
		});
	}

		// Keyboard navigation (Left/Right/Home/End)
		document.addEventListener('keydown', function (e) {
			if (!document.body.contains(carousel)) return;
			if (e.key === 'ArrowRight') { stop(); next(); start(); }
			else if (e.key === 'ArrowLeft') { stop(); prev(); start(); }
			else if (e.key === 'Home') { stop(); goToOriginal(0); start(); }
			else if (e.key === 'End') { stop(); goToOriginal(Math.max(0, Math.floor(cards.length / 2) - 1)); start(); }
		});

	// Recalcula largura ao redimensionar
	let resizeTimeout = null;
	window.addEventListener('resize', function () {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function () {
			const prevIndex = index;
			measure();
			// tenta manter o mesmo item visível
			index = Math.min(prevIndex, Math.max(0, Math.floor((track.getBoundingClientRect().left) / cardWidth * -1)));
			index = Math.max(0, Math.min(index, cards.length - 1));
			update();
		}, 150);
	});
});
