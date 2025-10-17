(() => {
  const video = document.querySelector('video');
  if (!video) {
    alert("No video found on this page.");
    return;
  }

  const info = {
    title: document.title,
    src: video.currentSrc || video.src,
    duration: video.duration,
    currentTime: video.currentTime,
    paused: video.paused
  };

  alert(`Video Info:
Title: ${info.title}
Source: ${info.src}
Duration: ${info.duration.toFixed(2)}s
Current Time: ${info.currentTime.toFixed(2)}s
Paused: ${info.paused}`);
})();
