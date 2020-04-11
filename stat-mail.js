async function stat() {
  let stats = []

  let currentPage = 0;
  let lastPage = 1;
  while (currentPage < lastPage) {
    const mailBox = document.getElementById('ui-id-24');
    const pagination = mailBox.getElementsByClassName('pagination')[0];
    const curPageParts = pagination.getElementsByClassName('curPage')[0].innerText.split('/');
    currentPage = parseInt(curPageParts[0]);
    lastPage = parseInt(curPageParts[1]);
    console.log(currentPage+'/'+lastPage);

    const mailItems = mailBox.getElementsByClassName('msg');
    for (mailItem of mailItems) {
      if (
        mailItem.getElementsByClassName('msg_title').length < 1 ||
          'Retour d`une flotte' !== mailItem.getElementsByClassName('msg_title')[0].innerText ||
          mailItem.getElementsByClassName('msg_content').length < 1 ||
          null !== mailItem.getElementsByClassName('msg_content')[0].innerText.match(/ne livre pas de ressources/)
      ) {
        continue;
      }

      stats.push(mailItem.getElementsByClassName('msg_content')[0].innerText.match(/(?<planetName>\[[0-9:]+\]).*planète (?<targetName>.*\]).*\n\nLa flotte livre (?<metal>[0-9.]+)[^0-9.]*(?<cristal>[0-9.]+)[^0-9.]*(?<deuterium>[0-9.]+)/).groups);
    }

    pagination.getElementsByClassName('paginator')[2].click();
    await new Promise(r => setTimeout(r, 2000));
  }

  stats = stats.filter(function(item, index) {
    const firstMatchingItem = stats.find(
      function(findItem) {
        return JSON.stringify(findItem) === JSON.stringify(item);
      }
    );
    return stats.indexOf(firstMatchingItem) === index;
  });

  console.log(JSON.stringify(stats));
}
