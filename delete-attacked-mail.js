async function del(deleteAll = false) {
  let currentPage = parseInt(document.getElementById('fleetsgenericpage').getElementsByClassName('pagination')[0].getElementsByClassName('curPage')[0].innerText.split('/')[0]);
  while (true) {
    const mailBox = document.getElementById('fleetsgenericpage');
    const pagination = mailBox.getElementsByClassName('pagination')[0];
    const curPageParts = pagination.getElementsByClassName('curPage')[0].innerText.split('/');
    currentPage = parseInt(curPageParts[0]);
    lastPage = parseInt(curPageParts[1]);
    console.log(currentPage+'/'+lastPage);

    const mailItems = mailBox.getElementsByClassName('msg');
    for (let i = mailItems.length-1; i >= 0; i--) {
      mailItem = mailItems[i]
      const isUnderAttack = mailItem.getElementsByClassName('icon_attack')[0].children.length > 0;
      if (deleteAll || isUnderAttack) {
        const planetName = mailItem.getElementsByClassName('txt_link')[0].innerText;
        console.log('DELETE: '+planetName);
        mailItem.getElementsByClassName('icon_refuse')[0].click()
        await new Promise(r => setTimeout(r, 500));
      }
    }

    if (currentPage === 1) break;

    pagination.getElementsByClassName('paginator')[1].click();
    await new Promise(r => setTimeout(r, 1000));
  }
}
