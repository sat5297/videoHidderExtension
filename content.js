// (function monitorSubtitles() {
//   const keyword = "confidential";  // Hardcoded
//   const imageUrl = chrome.runtime.getURL('warning.png');

//   let img = null;

//   function toggleImage(show) {
//     if (show) {
//       console.log('Showing image');
//       if (!document.getElementById('keyword-alert-image')) {
//         img = document.createElement('img');
//         img.id = 'keyword-alert-image';
//         img.src = imageUrl;
//         img.style.position = 'fixed';
//         img.style.bottom = '10px';
//         img.style.right = '10px';
//         img.style.width = '50px';
//         img.style.height = '50px';
//         img.style.zIndex = '9999';
//         document.body.appendChild(img);
//       }
//     } else {
//       console.log('Hiding image');
//       const existingImg = document.getElementById('keyword-alert-image');
//       if (existingImg) existingImg.remove();
//     }
//   }

//   // Use a reliable subtitle container for the site
//   const subtitleContainer = document.querySelector('.ytp-caption-segment, .caption-window, .ytp-caption-window-container');

//   if (!subtitleContainer) {
//     console.warn('Subtitle container not found.');
//     return;
//   }

//   // Observe changes
//   const observer = new MutationObserver(mutations => {
//     let found = false;
//     for (const mutation of mutations) {
//       const textContent = subtitleContainer.innerText || '';
//       console.log('Subtitle text:', textContent);
//       if (textContent.toLowerCase().includes(keyword.toLowerCase())) {
//         found = true;
//         break;
//       }
//     }
//     toggleImage(found);
//   });

//   observer.observe(subtitleContainer, { childList: true, subtree: true, characterData: true });

//   // Also check on load
//   if ((subtitleContainer.innerText || '').toLowerCase().includes(keyword.toLowerCase())) {
//     toggleImage(true);
//   }
// })();


(function logSubtitles() {
  const subtitleContainer = document.querySelector('.ytp-caption-segment, .ytp-caption-window-container');

  if (!subtitleContainer) {
    console.warn('Subtitle container not found.');
    return;
  }

  console.log('Found subtitle container:', subtitleContainer);

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      const currentText = subtitleContainer.innerText.trim();
      if (currentText.length > 0) {
        console.log('Subtitle text in logging :', currentText);
      }
    });
  });

  observer.observe(subtitleContainer, { characterData: true, subtree: true, childList: true });

  // Also log current subtitle on script start
  if (subtitleContainer.innerText.trim().length > 0) {
    console.log('Initial subtitle text:', subtitleContainer.innerText);
  }
})();

(function monitorSubtitles() {
  const keyword = "you";  // Hardcoded keyword
  const imageUrl = chrome.runtime.getURL('bestOfBilly.png');
  console.log('Logging imageURL:', imageUrl);

  let img = null;

  function toggleImage(show) {
    console.log('toggleImage called with:', show);
    if (show) {
        console.log('Creating image since show is true');
        if (!document.getElementById('keyword-alert-image')) {
            console.log('in toggleImage: Image not present, creating new one');
            console.log('Creating and appending image');
            img = document.createElement('img');
            img.id = 'keyword-alert-image';
            img.style.position = 'fixed';
            img.style.width = '100vw';
            img.style.height = '100vh';
            img.style.opacity = '1';  // Fully opaque
            console.log('Creating and appending image 1');
            img.style.backgroundColor = 'rgb(255, 0, 0)';
            img.src = '';
            console.log('Creating and appending image 34');
            console.log('Image src set to:', img.src);
            document.body.appendChild(img);
        } else {
        console.log('Image already present');
        }
    } else {
        const existingImg = document.getElementById('keyword-alert-image');
        if (existingImg) {
        console.log('Removing image');
        existingImg.remove();
        }
    }
}


  // Adjust selector for your platform if needed
  const subtitleContainer = document.querySelector('.ytp-caption-segment, .ytp-caption-window-container');

  if (!subtitleContainer) {
    console.warn('Subtitle container not found.');
    return;
  }

  const observer = new MutationObserver(() => {
    const textContent = subtitleContainer.innerText || '';
    console.log('Subtitle text in monitoring:', textContent);
    if (textContent.toLowerCase().includes(keyword.toLowerCase())) {
        console.log('Keyword detected:', keyword);
      toggleImage(true);
    } else {
      toggleImage(false);
    }
  });

  observer.observe(subtitleContainer, { childList: true, subtree: true, characterData: true });

  // Initial check
  if ((subtitleContainer.innerText || '').toLowerCase().includes(keyword.toLowerCase())) {
    toggleImage(true);
  }
})();
