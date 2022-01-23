// let flag = false;

function translate(e) {
  console.log('楽に通訳くん');
  // chrome.storage.sync.set({ flag: !flag }, function () {
  //   console.log('Value is set to ' + !flag);
  // });

  let newP = document.createElement('p');
  newP.setAttribute('id', 'JP-raku-translate');
  let setStyle = [
    'position: absolute;',
    'max-width:400px;',
    'background: white;',
    'padding: 4px 8px;',
    'box-shadow: 2px 2px 10px #aaa;',
    'border-radius: 8px;',
    'z-index: 100;',
  ];
  newP.setAttribute('style', setStyle.join(''));
  document.body.appendChild(newP);
  const JP = document.getElementById('JP-raku-translate');
  window.addEventListener('mouseup', function test(evt) {
    //選択中の文字列を取得
    let text = window.getSelection().toString();
    if (text !== '') {
      callApi(text, evt.pageX, evt.pageY);
    }
  });

  JP.addEventListener('click', () => {
    JP.style.display = 'none';
    JP.innerHTML = '';
  });

  // api
  async function callApi(text, X, Y) {
    const res = await fetch(
      'https://script.google.com/macros/s/AKfycbxotWKpj0ynv747cuxN80Apy95OQ6EcXXNfG81_2rPBwTkZllUq4Y6TVZBFWFLeNB_vIA/exec?text=' +
        text +
        '&source=en&target=ja'
    );
    const result = await res.json();
    if (result.text == 'Bad Request') {
      return;
    }
    JP.style.left = X + 'px';
    JP.style.top = Y - 36 + 'px';
    JP.innerHTML = result.text;
    JP.style.display = 'inline-block';
  }
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: translate,
  });
});
