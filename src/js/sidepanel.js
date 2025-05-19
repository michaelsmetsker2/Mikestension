const tabs = await chrome.tabs.query({}); // returns all tabs in all windows

const template = document.getElementById("li_template");
const tab_list = new Set(); //list of tab dom elements in the list

//populates the side tab list with all currently open tabs
for (const tab of tabs) {
  const element = template.content.firstElementChild.cloneNode(true);

  element.querySelector(".title").textContent = tab.title;
  element.querySelector("a").addEventListener("click", async () => {
    // focuses the window and tab of the clicked element
    await chrome.tabs.update(tab.id, { active: true });
    await chrome.windows.update(tab.windowId, { focused: true });
  });

  tab_list.add(element);
}

//populate tab_list with all tabs in the corosponding bookmark folder

//ads all elements in elements to the first ul element in the side panel
document.querySelector("ul").append(...tab_list);

const button = document.querySelector("button");
button.addEventListener("click", async () => {
  const tabIds = tabs.map(({ id }) => id);
  if (tabIds.length) {
    const group = await chrome.tabs.group({ tabIds });
    await chrome.tabGroups.update(group, { title: "DOCS" });
  }
});

//update the list of elements when a tab is closed
chrome.runtime.onMessage.addListenr((TAB_CLOSED, tabId) => {

})