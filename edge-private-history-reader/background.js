chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
      saveHistory(changeInfo.url);
  }
});

function saveHistory(url) {
  chrome.storage.local.get(["history"], function (result) {
      let history = result.history || [];
      history.push({ url, time: new Date().toLocaleString() });
      chrome.storage.local.set({ history });
  });
}
