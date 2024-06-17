document.addEventListener('DOMContentLoaded', () => {
  const eyes = [
    { element: document.getElementById('eye1'), cx: 215.54, cy: 554.737 },
    { element: document.getElementById('eye2'), cx: 442.598, cy: 393.39 },
    { element: document.getElementById('eye3'), cx: 733.429, cy: 176.093 },
    { element: document.getElementById('eye4'), cx: 183.041, cy: 171.206 },
    { element: document.getElementById('eye5'), cx: 762.611, cy: 507.312 },
    { element: document.getElementById('eye6'), cx: 1175.26, cy: 392.127 },
  ];

  const constrain = (value, min, max) => Math.min(Math.max(value, min), max);

  document.addEventListener('mousemove', (event) => {
    const svg = document.querySelector('.eyes');
    if (!svg) return;

    const svgRect = svg.getBoundingClientRect();
    const ratioX = svgRect.width / 1527;
    const ratioY = svgRect.height / 706;

    const { clientX, clientY } = event;
    const maxMove = window.innerWidth * 0.01; // 1vw in pixels

    eyes.forEach(eye => {
      const dx = (clientX - svgRect.left) / ratioX - eye.cx;
      const dy = (clientY - svgRect.top) / ratioY - eye.cy;

      const angle = Math.atan2(dy, dx);
      const distance = Math.min(maxMove, Math.sqrt(dx * dx + dy * dy)); // ограничение движения

      const x = constrain(eye.cx + distance * Math.cos(angle), eye.cx - maxMove, eye.cx + maxMove);
      const y = constrain(eye.cy + distance * Math.sin(angle), eye.cy - maxMove, eye.cy + maxMove);

      eye.element.setAttribute('cx', x);
      eye.element.setAttribute('cy', y);
    });
  });

});

