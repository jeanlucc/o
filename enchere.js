async function e(limit = 1000000, shouldWait = false) {
  if (shouldWait) {
    let lastValue = null;
    let safestDate = new Date(Date.now()+3600000);
    while (new Date() < safestDate) {
      const value = parseInt(document.getElementsByClassName('auction_info')[0].getElementsByTagName('b')[0].innerText.match(/(?<remainingMinutes>\d+)/).groups.remainingMinutes);
      if (lastValue !== value) {
        const date = new Date();

        console.log('LAST: '+lastValue+' NEW: '+value+' ON: '+date.getMinutes()+':'+date.getSeconds());

        const potentialDate = new Date(date.getTime()+value*60000-30000);
        safestDate = potentialDate < safestDate ? potentialDate : safestDate;
        console.log('WAIT: '+safestDate)

        lastValue = value;
      }
      await new Promise(r => setTimeout(r, 100));
    }
  }

  let invested = 0;
  let auctionIsOver = false;
  console.log('BID TIME: '+new Date());
  while (!auctionIsOver) {
    const toInvest = parseInt(document.getElementsByClassName('table_ressources_sum')[0].rows[2].cells[1].innerText.replace(/\./g,''));
    if (toInvest > limit) {
      console.log('ABORT BECAUSE TO INVEST IS: '+toInvest+' AND LIMIT IS: '+limit+'      '+new Date());
      break;
    }

    invested = parseInt(document.getElementsByClassName('table_ressources_sum')[0].rows[1].cells[1].innerText.replace(/\./g,''));
    const currentBid = parseInt(document.getElementsByClassName('currentSum')[0].innerText.replace(/\./g, ''));
    if (invested === 0 || currentBid > invested) {
      const lastInvested = invested;

      const toAdd = Math.ceil((toInvest - invested)/3);
      console.log('TO ADD: '+toAdd+' '+new Date());
      document.getElementsByClassName('js_deuterium')[0].value = toAdd;
      document.getElementsByClassName('normalResource')[4].cells[4].getElementsByClassName('value-control')[0].click();
      document.getElementsByClassName('normalResource')[4].cells[4].getElementsByClassName('value-control')[0].click();
      document.getElementsByClassName('pay')[0].click();

      invested = parseInt(document.getElementsByClassName('table_ressources_sum')[0].rows[1].cells[1].innerText.replace(/\./g,''));
      console.log('GO FROM: '+lastInvested+' TO: '+invested+' (+'+(invested-lastInvested)+')'+'          '+new Date());
    }

    await new Promise(r => setTimeout(r, 1));

    auctionIsOver =
      document.getElementsByClassName('noAuctionOverlay').length > 0 &&
      null !== document.getElementsByClassName('noAuctionOverlay')[0].offsetParent;
  }
  console.log('AUCTION IS OVER: '+new Date());
}
