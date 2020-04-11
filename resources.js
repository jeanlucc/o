async function r(initFromClipboard = false) {
  await new Promise(r => setTimeout(r, 500));

  let planetResources = [];
  if (initFromClipboard) {
    planetResources = JSON.parse(await navigator.clipboard.readText());
  }

  const resources = {
    metal: 0,
    cristal: 0,
    deuterium: 0,
  };

  resources['metal'] += parseInt(document.getElementById('resources_metal').innerText.replace(/\./g, ''));
  resources['cristal'] += parseInt(document.getElementById('resources_crystal').innerText.replace(/\./g, ''));
  resources['deuterium'] += parseInt(document.getElementById('resources_deuterium').innerText.replace(/\./g, ''));

  const currentPlannetCoordinates = document.getElementById('planetList').getElementsByClassName('planetlink active')[0].getElementsByClassName('planet-koords')[0].innerText;

  const eventbox = document.getElementById('eventboxFilled');
  if (document.getElementById('eventboxContent').style.display === "none") {
    eventbox.click()
    await new Promise(r => setTimeout(r, 800));
  }

  const flotteRows = document.getElementById('eventContent').rows;
  for (row of flotteRows) {
    let targetPlanetColumn = null;
    const fleetIconElement = row.cells[6];
    if (fleetIconElement.classList.contains('icon_movement')) {
      targetPlanetColumn = 8;
      sourcePlanetColumn = 4;
    } else if (fleetIconElement.classList.contains('icon_movement_reserve')) {
      targetPlanetColumn = 4;
      sourcePlanetColumn = 8;
    } else {
      continue;
    }

    const targetPlanetCoordinates = row.cells[targetPlanetColumn].innerText;
    const sourcePlanetCoordinates = row.cells[sourcePlanetColumn].innerText;
    if (targetPlanetCoordinates !== currentPlannetCoordinates && sourcePlanetCoordinates !== currentPlannetCoordinates) {
      continue;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(fleetIconElement.getElementsByTagName('span')[0].getAttribute('title'), "text/html")
    let fleetInfoRows = doc.getElementsByClassName('fleetinfo')[0].rows

    const metal = parseInt(fleetInfoRows[fleetInfoRows.length-3].getElementsByClassName('value')[0].innerText.replace(/\./g, ''));
    const cristal = parseInt(fleetInfoRows[fleetInfoRows.length-2].getElementsByClassName('value')[0].innerText.replace(/\./g, ''));
    const deuterium = parseInt(fleetInfoRows[fleetInfoRows.length-1].getElementsByClassName('value')[0].innerText.replace(/\./g, ''));

    if (targetPlanetCoordinates === currentPlannetCoordinates) {
      resources['metal'] += metal;
      resources['cristal'] += cristal;
      resources['deuterium'] += deuterium;
    }
    if (sourcePlanetCoordinates === currentPlannetCoordinates) {
      resources['metal'] -= metal;
      resources['cristal'] -= cristal;
      resources['deuterium'] -= deuterium;
    }
  }

  formatter = new Intl.NumberFormat('fr-FR');
  resources['metal'] = formatter.format(resources['metal']);
  resources['cristal'] = formatter.format(resources['cristal']);
  resources['deuterium'] = formatter.format(resources['deuterium']);

  console.log(JSON.stringify(resources));

  planetResources.push(resources);
  await navigator.clipboard.writeText(JSON.stringify(planetResources));

  console.log(JSON.stringify(planetResources));
}
