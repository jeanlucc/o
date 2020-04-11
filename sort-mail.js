async function sort(fleetCount, criterion) {
  const defaultFleetCount = 20;
  const shipCargoSpace = 9500;
  const defaultCriterion = 'cristal';
  const availableShipsByPlanet = {
    '[7:206:12]': 500,
    '[7:128:7]': 500,
    '[7:289:7]': 1800,
    '[7:456:7]': 200,
    '[5:195:10]': 1500,
    '[5:356:10]': 2000,
    '[5:31:10]': 2000,
    '[2:449:10]': 2000,
    '[2:280:10]': 1000,
    '[2:102:10]': 1500,
  }

  fleetCount = fleetCount ? fleetCount : defaultFleetCount;
  criterion = criterion ? criterion : defaultCriterion;

  const potentialTargets = [];

  let currentPage = 0;
  let lastPage = 1;
  while (currentPage < lastPage) {
    const mailBox = document.getElementById('fleetsgenericpage');
    const pagination = mailBox.getElementsByClassName('pagination')[0];
    const curPageParts = pagination.getElementsByClassName('curPage')[0].innerText.split('/');
    currentPage = parseInt(curPageParts[0]);
    lastPage = parseInt(curPageParts[1]);
    console.log(currentPage+'/'+lastPage);

    const mailItems = mailBox.getElementsByClassName('msg');
    for (mailItem of mailItems) {
      const coefficient = parseInt(mailItem.getElementsByClassName('compacting')[3].getElementsByClassName('ctn ctn4')[0].innerText.match(/^Butin: (\d+)%$/)[1])/100;

      const resourcesText = mailItem.getElementsByClassName('compacting')[2].innerText;
      const metal = coefficient*getResourceAmount('Métal', resourcesText);
      const cristal = coefficient*getResourceAmount('Cristal', resourcesText);
      const deuterium = coefficient*getResourceAmount('Deutérium', resourcesText);
      const resources = coefficient*getResourceAmount('Ressources', resourcesText);

      const planetName = mailItem.getElementsByClassName('txt_link')[0].innerText;

      const attackUrl = mailItem.getElementsByClassName('icon_attack')[0].parentElement.href;
      const neededCargoShips = Math.round(resources/shipCargoSpace+2);
      const url = attackUrl+'&am202='+neededCargoShips;

      const now = new Date();
      const messageDate = new Date(mailItem.getElementsByClassName('msg_date')[0].innerText.replace(/(\d+)\.(\d+)\.(\d+)/g, '$3-$2-$1'));
      const elastedMinutes = Math.floor((now - messageDate)/1000/60);

      potentialTargets.push({
        elastedMinutes: elastedMinutes,
        neededCargoShips: neededCargoShips,
        metal: metal,
        cristal: cristal,
        deuterium: deuterium,
        resources: resources,
        planetName: planetName,
        page: currentPage,
        url: url,
      });
    }

    pagination.getElementsByClassName('paginator')[2].click();
    await new Promise(r => setTimeout(r, 1000));
  }

  const todo = getOptimisedTodo(criterion, fleetCount, availableShipsByPlanet, potentialTargets);
  console.log(criterion);
  console.log(JSON.stringify(todo));

  const resources = {
    metal: 0,
    cristal: 0,
    deuterium: 0,
  };
  todo.reduce(
    function(resources, todoItem) {
      resources.metal += todoItem.metal;
      resources.cristal += todoItem.cristal;
      resources.deuterium += todoItem.deuterium;
      return resources;
    },
    resources
  );
  console.log(resources)

  console.log(availableShipsByPlanet);
}

function getOptimisedTodo(criterion, fleetCount, availableShipsByPlanet, potentialTargets) {
  potentialTargets.sort(compareProperty(criterion)).reverse();
  potentialTargets = potentialTargets.filter(function(item, index) {
    if (item.elastedMinutes > 120) {
      return false;
    }
    const firstMatchingItem = potentialTargets.find(
      function(findItem) {
        return findItem.planetName === item.planetName
      }
    );
    return potentialTargets.indexOf(firstMatchingItem) === index;
  });

  const todo = [];
  for (potentialTarget of potentialTargets) {
    const closestPlanet = getClosestBasePlanet(Object.keys(availableShipsByPlanet), potentialTarget.planetName);
    if (!closestPlanet) {
      console.log('WARNING: '+potentialTarget.planetName)
      continue;
    }
    const availableShips = availableShipsByPlanet[closestPlanet];
    if (availableShips - potentialTarget.neededCargoShips < 0) {
      console.log('NEED SHIPS: '+(potentialTarget.neededCargoShips-availableShips)+' ON '+closestPlanet+'(NEED: '+potentialTarget.neededCargoShips+' AVAILABLE: '+availableShips+')');
      continue;
    }

    potentialTarget.closestPlanetName = closestPlanet;
    todo.push(potentialTarget);
    if (todo.length >= fleetCount) {
      break;
    }

    availableShipsByPlanet[closestPlanet] = availableShipsByPlanet[closestPlanet] - potentialTarget.neededCargoShips;
  }

  todo.sort(compareProperty('closestPlanetName'));

  return todo;
}

function getResourceAmount(resourceName, resourcesText) {
  const matches = resourcesText.match(new RegExp(resourceName+': ([0-9,.M]+)'))
  if (null === matches) {
    console.log(resourcesText);
    console.log(resourceName);
  }
  const amountString = resourcesText.match(new RegExp(resourceName+': ([0-9,.M]+)'))[1];
  if ('M' === amountString.slice(-1)) {
    return parseFloat(amountString.slice(0, -1).replace(',', '.'))*1000000
  } else {
    return parseFloat(amountString.replace(/\./,''));
  }
}

function compareProperty(propertyName) {
  return function (mail1, mail2) {
    const value1 = mail1[propertyName];
    const value2 = mail2[propertyName];
    if (value1 === value2) return 0;
    return value1 < value2 ? -1 : 1;
  }
}

function getClosestBasePlanet(availablePlanets, planetName) {
  targetPlanetCoordinates = parsePlanetName(planetName);
  for (availablePlanet of availablePlanets) {
    availablePlanetCoordinate = parsePlanetName(availablePlanet);
    if (targetPlanetCoordinates['galaxy'] === availablePlanetCoordinate['galaxy'] &&
        Math.abs(targetPlanetCoordinates['system'] - availablePlanetCoordinate['system']) < 42
    ) {
      return availablePlanet;
    }
  }
}

function parsePlanetName(planetName) {
  const parts = planetName.match(/\[(?<galaxy>\d+):(?<system>\d+):\d+\]/);
  return {
    'galaxy': parseInt(parts.groups['galaxy']),
    'system': parseInt(parts.groups['system']),
  }
}
