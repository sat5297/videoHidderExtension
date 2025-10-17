document.getElementById('blur').addEventListener('click', async () => {
  // Hardcoded keyword here
  const keyword = "confidential"; 

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: blurKeywordOnPage,
    args: [keyword]
  });
});

function blurKeywordOnPage(keyword) {
  const regex = new RegExp(keyword, "gi");

  // Walk through all text nodes
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach(node => {
    if (node.nodeValue.match(regex)) {
      const span = document.createElement('span');
      span.innerHTML = node.nodeValue.replace(regex, match => `<span class="blurry">${match}</span>`);
      node.parentNode.replaceChild(span, node);
    }
  });

  if (!document.querySelector('#blur-style')) {
    const style = document.createElement('style');
    style.id = 'blur-style';
    style.textContent = `.blurry { filter: blur(5px); background-color: rgba(255,255,255,0.5); border-radius:3px; }`;
    document.head.appendChild(style);
  }
}
