/*
 * Background script
*/

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