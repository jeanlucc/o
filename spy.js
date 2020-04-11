async function spy(fleetCount, initialFleetIndex) {
  const toSpyByPlanet = {
    '[7:206:12]': [
      {galaxy: 7, system: 207, planet: 8}, // [7:207:8]
      //{galaxy: 7, system: 226, planet: 8}, // [7:226:8]
      {galaxy: 7, system: 235, planet: 8}, // [7:235:8]
      {galaxy: 7, system: 235, planet: 7}, // [7:235:7]
      {galaxy: 7, system: 237, planet: 7}, // [7:237:7]
    ],
    '[7:128:7]': [
      //{galaxy: 7, system: 132, planet: 4}, // [7:132:4]
      //{galaxy: 7, system: 112, planet: 11}, // [7:112:11]
      //{galaxy: 7, system: 112, planet: 6}, // [7:112:6]
      {galaxy: 7, system: 112, planet: 7}, // [7:112:7]
      {galaxy: 7, system: 112, planet: 8}, // [7:112:8]
      {galaxy: 7, system: 112, planet: 9}, // [7:112:9]
    ],
    '[7:289:7]': [
      //{galaxy: 7, system: 311, planet: 8}, // [7:311:8]
      //{galaxy: 7, system: 303, planet: 7}, // [7:303:7]
      //{galaxy: 7, system: 304, planet: 6}, // [7:304:6]
      //{galaxy: 7, system: 303, planet: 8}, // [7:303:8]
      //{galaxy: 7, system: 303, planet: 9}, // [7:303:9]
      //{galaxy: 7, system: 303, planet: 6}, // [7:303:6]
      {galaxy: 7, system: 286, planet: 7}, // [7:286:7]
      {galaxy: 7, system: 288, planet: 10}, // [7:288:10]
      //{galaxy: 7, system: 288, planet: 11}, // [7:288:11]
      {galaxy: 7, system: 308, planet: 8}, // [7:308:8]
      {galaxy: 7, system: 330, planet: 7}, // [7:330:7]
    ],
    '[7:456:7]': [
      //{galaxy: 7, system: 455, planet: 9}, // [7:455:9]
      //{galaxy: 7, system: 469, planet: 11}, // [7:469:11]
      //{galaxy: 7, system: 434, planet: 6}, // [7:434:6]
    ],
    '[5:195:10]': [
      {galaxy: 5, system: 218, planet: 7}, // [5:218:7]
      {galaxy: 5, system: 184, planet: 8}, // [5:184:8]
      {galaxy: 5, system: 210, planet: 9}, // [5:210:9]
      //{galaxy: 5, system: 198, planet: 9}, // [5:198:9]
      //{galaxy: 5, system: 196, planet: 7}, // [5:196:7]
      //{galaxy: 5, system: 182, planet: 8}, // [5:182:8]
      {galaxy: 5, system: 210, planet: 6}, // [5:210:6]
      {galaxy: 5, system: 210, planet: 10}, // [5:210:10]
      {galaxy: 5, system: 211, planet: 7}, // [5:211:7]
      {galaxy: 5, system: 201, planet: 6}, // [5:201:6]
      {galaxy: 5, system: 218, planet: 4}, // [5:218:4]
      {galaxy: 5, system: 219, planet: 7}, // [5:219:7]
      {galaxy: 5, system: 219, planet: 8}, // [5:219:8]
      {galaxy: 5, system: 220, planet: 8}, // [5:220:8]
      {galaxy: 5, system: 218, planet: 6}, // [5:218:6]
      {galaxy: 5, system: 218, planet: 9}, // [5:218:9]
      {galaxy: 5, system: 218, planet: 8}, // [5:218:8]
      {galaxy: 5, system: 161, planet: 11}, // [5:161:11]
      {galaxy: 5, system: 227, planet: 8}, // [5:227:8]
      {galaxy: 5, system: 158, planet: 9}, // [5:158:9]
      {galaxy: 5, system: 228, planet: 8}, // [5:228:8]
      //{galaxy: 5, system: 229, planet: 7}, // [5:229:7]
    ],
    '[5:356:10]': [
      //{galaxy: 5, system: 360, planet: 9}, // [5:360:9]
      {galaxy: 5, system: 360, planet: 12}, // [5:360:12]
      {galaxy: 5, system: 360, planet: 7}, // [5:360:7]
      {galaxy: 5, system: 360, planet: 6}, // [5:360:6]
      {galaxy: 5, system: 361, planet: 7}, // [5:361:7]
      {galaxy: 5, system: 346, planet: 8}, // [5:346:8]
      {galaxy: 5, system: 346, planet: 7}, // [5:346:7]
      {galaxy: 5, system: 366, planet: 5}, // [5:366:5]
      {galaxy: 5, system: 364, planet: 6}, // [5:364:6]
      {galaxy: 5, system: 364, planet: 10}, // [5:364:10]
      {galaxy: 5, system: 348, planet: 7}, // [5:348:7]
      {galaxy: 5, system: 365, planet: 5}, // [5:365:5]
      {galaxy: 5, system: 345, planet: 8}, // [5:345:8]
      {galaxy: 5, system: 345, planet: 7}, // [5:345:7]
      {galaxy: 5, system: 345, planet: 10}, // [5:345:10]
      {galaxy: 5, system: 345, planet: 11}, // [5:345:11]
      {galaxy: 5, system: 345, planet: 12}, // [5:345:12]
    ],
    '[5:31:10]': [
      {galaxy: 5, system: 31, planet: 12}, // [5:31:12]
      {galaxy: 5, system: 12, planet: 7}, // [5:12:7]
      {galaxy: 5, system: 12, planet: 5}, // [5:12:5]
      //{galaxy: 5, system: 11, planet: 6}, // [5:11:6]
      {galaxy: 5, system: 26, planet: 8}, // [5:26:8]
      {galaxy: 5, system: 26, planet: 10}, // [5:26:10]
      {galaxy: 5, system: 26, planet: 7}, // [5:26:7]
      {galaxy: 5, system: 26, planet: 9}, // [5:26:9]
      //{galaxy: 5, system: 17, planet: 4}, // [5:17:4]
      {galaxy: 5, system: 15, planet: 5}, // [5:15:5]
      {galaxy: 5, system: 17, planet: 7}, // [5:17:7]
      //{galaxy: 5, system: 17, planet: 11}, // [5:17:11]
      {galaxy: 5, system: 14, planet: 12}, // [5:14:12]
      {galaxy: 5, system: 14, planet: 10}, // [5:14:10]
      //{galaxy: 5, system: 14, planet: 5}, // [5:14:5]
      {galaxy: 5, system: 14, planet: 11}, // [5:14:11]
      {galaxy: 5, system: 14, planet: 9}, // [5:14:9]
      {galaxy: 5, system: 51, planet: 12}, // [5:51:12]
    ],
    '[2:449:10]': [
      {galaxy: 2, system: 458, planet: 5}, // [2:458:5]
      {galaxy: 2, system: 458, planet: 10}, // [2:458:10]
      {galaxy: 2, system: 456, planet: 6}, // [2:456:6]
      {galaxy: 2, system: 456, planet: 8}, // [2:456:8]
      {galaxy: 2, system: 456, planet: 7}, // [2:456:7]
      {galaxy: 2, system: 456, planet: 5}, // [2:456:5]
      {galaxy: 2, system: 456, planet: 9}, // [2:456:9]
      {galaxy: 2, system: 459, planet: 8}, // [2:459:8]
      //{galaxy: 2, system: 458, planet: 6}, // [2:458:6]
      //{galaxy: 2, system: 443, planet: 7}, // [2:443:7]
      {galaxy: 2, system: 441, planet: 9}, // [2:441:9]
      {galaxy: 2, system: 441, planet: 8}, // [2:441:8]
      {galaxy: 2, system: 441, planet: 7}, // [2:441:7]
      //{galaxy: 2, system: 459, planet: 6}, // [2:459:6]
      {galaxy: 2, system: 444, planet: 10}, // [2:444:10]
    ],
    '[2:280:10]': [
      {galaxy: 2, system: 280, planet: 9}, // [2:280:9]
      {galaxy: 2, system: 275, planet: 11}, // [2:275:11]
      {galaxy: 2, system: 274, planet: 9}, // [2:274:9]
      {galaxy: 2, system: 276, planet: 11}, // [2:276:11]
      {galaxy: 2, system: 277, planet: 7}, // [2:277:7]
      {galaxy: 2, system: 275, planet: 10}, // [2:275:10]
      {galaxy: 2, system: 274, planet: 7}, // [2:274:7]
      //{galaxy: 2, system: 274, planet: 5}, // [2:274:5]
      //{galaxy: 2, system: 277, planet: 9}, // [2:277:9]
      {galaxy: 2, system: 278, planet: 6}, // [2:278:6]
      {galaxy: 2, system: 275, planet: 4}, // [2:275:4]
      {galaxy: 2, system: 275, planet: 6}, // [2:275:6]
      {galaxy: 2, system: 262, planet: 10}, // [2:262:10]
      {galaxy: 2, system: 260, planet: 8}, // [2:260:8]
    ],
    '[2:102:10]': [
      {galaxy: 2, system: 103, planet: 7}, // [2:103:7]
      //{galaxy: 2, system: 108, planet: 7}, // [2:108:7]
      {galaxy: 2, system: 111, planet: 12}, // [2:111:12]
      //{galaxy: 2, system: 111, planet: 8}, // [2:111:8]
      //{galaxy: 2, system: 95, planet: 9}, // [2:95:9]
      {galaxy: 2, system: 93, planet: 12}, // [2:93:12]
      //{galaxy: 2, system: 92, planet: 8}, // [2:92:8]
      {galaxy: 2, system: 92, planet: 6}, // [2:92:6]
      {galaxy: 2, system: 92, planet: 7}, // [2:92:7]
      {galaxy: 2, system: 88, planet: 5}, // [2:88:5]
      {galaxy: 2, system: 88, planet: 9}, // [2:88:9]
      {galaxy: 2, system: 86, planet: 7}, // [2:86:7]
      {galaxy: 2, system: 82, planet: 10}, // [2:82:10]
      {galaxy: 2, system: 82, planet: 8}, // [2:82:8]
      {galaxy: 2, system: 80, planet: 6}, // [2:80:6]
      //{galaxy: 2, system: 123, planet: 10}, // [2:123:10]
      {galaxy: 2, system: 127, planet: 5}, // [2:127:5]
    ],
  }
  const defaultFleetCount = 19;
  const secondsBetweenFlights = 2;
  const secondsBetweenWaves = 78;

  fleetCount = fleetCount ? fleetCount : defaultFleetCount;

  const currentPlannetCoordinates = document.getElementById('planetList').getElementsByClassName('planetlink active')[0].getElementsByClassName('planet-koords')[0].innerText;

  const listToSpy = toSpyByPlanet[currentPlannetCoordinates];
  let flightIndex = initialFleetIndex ? initialFleetIndex : 1;
  let spyIndex = 1;
  for (toSpy of listToSpy) {
    console.log('SPY: '+spyIndex+'/'+listToSpy.length+' ['+toSpy.galaxy+':'+toSpy.system+':'+toSpy.planet+']');
    sendShipsWithPopup(6, toSpy.galaxy, toSpy.system, toSpy.planet, 1, 1);
    const secondsTimeOut = flightIndex % fleetCount === 0 ? secondsBetweenWaves - fleetCount*secondsBetweenFlights : secondsBetweenFlights;
    flightIndex += 1;
    spyIndex += 1;
    await new Promise(r => setTimeout(r, secondsTimeOut*1000));
  }
}
