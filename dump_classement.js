async function toJson() {
  const classement = {};
  let page = 0;
  while (page < 9) {
    const pageElement = document.getElementById('content').getElementsByClassName('pagebar')[0].getElementsByClassName('activePager')[0];
    page = pageElement.innerText;

    const rows = document.getElementById('ranks').tBodies[0].rows;
    for(let row of rows) {
      const position = row.getElementsByClassName('position')[0].innerText;
      const playerName = row.getElementsByClassName('playername')[0].innerText.trim();
      const points = row.getElementsByClassName('score')[0].innerText.trim().replace(/\./g,'');
      classement[position] = {
        'position': position,
        'playerName': playerName,
        'points': points,
      };
    }

    pageElement.nextElementSibling.click();
    await new Promise(r => setTimeout(r, Math.floor(Math.random() * (600)) + 500));
  }

  console.log(JSON.stringify(classement));
}
