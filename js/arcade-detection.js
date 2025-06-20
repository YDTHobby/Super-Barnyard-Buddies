(function() {
  window.addEventListener('load', function () {
    if (window.parent !== window) {
      const body = document.body;
      if (body) body.classList.add('in-arcade');

      if (window.Q) {
        window.Q.arcadeMode = true;

        const originalInput = window.Q.input.keyboardControls;
window.Q.input.keyboardControls = function (keys) {
  const arcadeKeys = keys || {};
  arcadeKeys['LEFT'] = 'left';
  arcadeKeys['RIGHT'] = 'right';
  arcadeKeys['SPACE'] = 'fire';
  arcadeKeys['Z'] = 'fire';
  arcadeKeys['X'] = 'action';
  arcadeKeys['ENTER'] = 'confirm';
  arcadeKeys['ESC'] = 'pause';
  arcadeKeys['P'] = 'pause';
  return originalInput.call(this, arcadeKeys);
};


        if (window.parent.postMessage) {
          window.parent.postMessage({ type: 'quintus-ready' }, '*');
        }
      }

      window.addEventListener('message', function (event) {
        if (event.data && event.data.type === 'arcade-control') {
          if (window.Q && window.Q.inputs) {
            if (event.data.input) {
              window.Q.inputs[event.data.input] = event.data.state;
            }
          }
        }
      });
    }
    // Sync arcade input states with Quintus input manager
setInterval(() => {
  if (window.Q && window.Q.inputs && window.Q.input && window.Q.input.keys) {
    for (const [key, state] of Object.entries(window.Q.inputs)) {
      window.Q.input.keys[key] = state;
    }
  }
}, 100);
  });
})();
