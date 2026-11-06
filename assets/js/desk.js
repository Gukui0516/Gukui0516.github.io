(function () {
  var clock = document.getElementById('clock');
  var format = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit' });
  var tick = function () { clock.textContent = 'SEOUL ' + format.format(new Date()); };
  tick();
  setInterval(tick, 30000);

  var later = document.getElementById('later');
  if (later) {
    later.addEventListener('click', function () {
      document.getElementById('dialog').setAttribute('data-gone', '');
    });
  }

  // Chrome does not match :focus on an embedded video while focus is inside it, so mark it by hand.
  var markFocus = function () {
    document.querySelectorAll(".video iframe").forEach(function (frame) {
      frame.classList.toggle("is-focused", document.activeElement === frame);
    });
  };
  window.addEventListener("blur", function () { setTimeout(markFocus, 0); });
  window.addEventListener("focus", markFocus);

  // On wide screens the small home windows can be dragged by their title bars.
  document.querySelectorAll('[data-drag]').forEach(function (win) {
    var bar = win.querySelector('.bar');
    var x = 0, y = 0, startX = 0, startY = 0, dragging = false;
    bar.addEventListener('pointerdown', function (event) {
      if (window.innerWidth < 960) return;
      dragging = true;
      startX = event.clientX - x;
      startY = event.clientY - y;
      bar.setPointerCapture(event.pointerId);
      win.classList.add('is-dragging');
    });
    bar.addEventListener('pointermove', function (event) {
      if (!dragging) return;
      x = event.clientX - startX;
      y = event.clientY - startY;
      win.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    });
    bar.addEventListener('pointerup', function () {
      dragging = false;
      win.classList.remove('is-dragging');
    });
  });
})();
