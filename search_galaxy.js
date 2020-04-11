async function search(needle) {
  while (true) {
    i = parseInt(document.getElementById('galaxytable').getAttribute('data-system'));
    console.log(i + ": " + (window.find(needle) ? 'iciiiiiiiiiiiiiiii' : 'x'));
    if (i == 499) {
      break;
    }
    submitOnKey(39);
    await new Promise(r => setTimeout(r, Math.floor(Math.random() * (600)) + 500));
  }
}
