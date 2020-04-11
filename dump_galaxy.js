async function toJson() {
  const galaxy = [];
  const doneSystems = {}
  for (let i = 1; i < 500; i++) {
    doneSystems[i] = false;
  }

  let nextSystem = 1;
  while (null !== nextSystem) {
    nextSystem = null;
    for (const keyPlanetSystemId in doneSystems) {
      if (!doneSystems[keyPlanetSystemId]) {
        nextSystem = keyPlanetSystemId;
        break;
      }
    }
    const systemInput = document.getElementById('system_input');
    systemInput.value = nextSystem;
    const submitButton = systemInput.parentElement.getElementsByClassName('btn_blue')[0];
    submitButton.click();

    await new Promise(r => setTimeout(r, Math.floor(Math.random() * (600)) + 500));
    const planetSystemId = parseInt(document.getElementById('galaxytable').getAttribute('data-system'));
    console.log('system: ' + planetSystemId);

    const planets = [];
    const rows = document.getElementById('galaxytable').tBodies[0].rows;

    for(let row of rows) {
      console.log('planet: ' + row.children[0].innerText);
      if (row.classList.contains('empty_filter')) continue;

      const statusList = []
      const spanStatusList = row.children[5].getElementsByClassName('status')[0].children
      for (let spanStatus of spanStatusList) {
        statusList.push(spanStatus.classList.value)
      }

      let tooltip;
      let tooltipReady = false;
      let tooltipExists = true;
      let retryCount = 0;
      const event = new MouseEvent('mouseover', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      });

      if (row.children[5].getElementsByTagName('a').length >= 1) {
        row.children[5].getElementsByTagName('a')[0].dispatchEvent(event);
      } else {
        tooltipExists = false;
      }
      while (tooltipExists && !tooltipReady) {
        if (document.getElementsByClassName('tpd-tooltip').length >= 1) {
          tooltip = document.getElementsByClassName('tpd-tooltip')[0].getElementsByClassName('galaxyTooltip')[0];
        }
        tooltipReady =
          tooltip &&
          tooltip.getElementsByTagName('h1').length >= 1;
        await new Promise(r => setTimeout(r, 20));
        retryCount++;
        if (retryCount === 20) {
          console.log('retry');
          retryCount = 0;
          row.children[5].getElementsByTagName('a')[0].dispatchEvent(event)
        }
      }
      let playerLevel = null;
      let playerName = null;
      if (tooltip &&
          tooltip.getElementsByClassName('rank').length >= 1 &&
          tooltip.getElementsByClassName('rank')[0].getElementsByTagName('a').length >= 1) {
        playerLevel = tooltip.getElementsByClassName('rank')[0].getElementsByTagName('a')[0].innerText;
        playerName = tooltip.getElementsByTagName('h1')[0].innerText;
      }
      if (tooltipExists) {
        document.getElementsByClassName('tpd-tooltip')[0].getElementsByClassName('close-tooltip')[0].click()
      }

      galaxy.push({
        'system': planetSystemId,
        'position': row.children[0].innerText,
        'name': row.children[2].innerText,
        'hasMoon': !row.children[3].classList.contains('js_no_action'),
        'playerName': playerName,
        'playerLevel': playerLevel,
        'playerStatus': statusList,
      });
    }

    doneSystems[planetSystemId] = true;
  }

  console.log(JSON.stringify(galaxy));
}
