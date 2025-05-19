/*
 * Service worker
*/

chrom.runtime.onStartup.addListener(() => {
  console.log("script started");

  //populate the tabmanager list with current tabs
  //populate the tabmanager with all tabs in groups or bookmarks(undecided)
})

//should make the side panel close as well if it is alreadyt open
// Listens for the command to open the side panel
chrome.commands.onCommand.addListener(() => {
  console.log("opening side panel");
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.sidePanel.open({ windowId: tab.windowId });
  });
});

console.log('Background script loaded, listening for commands');

// Allows users to open the side panel by clicking on the action toolbar icon
/*
chrome.sidePanel
.setPanelBehavior({ openPanelOnActionClick: true })
.catch((error) => console.error(error)
);
*/

//chrome tab has been closed
chrome.tabs.onRemoved.addListener((tabId) => {
  //no good way to test if side panel is open or not
  chrome.runtime.sendMessage({type: 'TAB_CLOSED', tabId });
});