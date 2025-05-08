const tabs = await chrome.tabs.query({}); // returns all tabs in all windows

const template = document.getElementById("li_template");
const elements = new Set(); //set avoids duplicates, seems to still add two tabs if the same one is open twice

//populates the side panel with all tabs
for (const tab of tabs) {
  const element = template.content.firstElementChild.cloneNode(true);

  element.querySelector(".title").textContent = tab.title;
  element.querySelector("a").addEventListener("click", async () => {
    // focuses the window and tab of the clicked element
    await chrome.tabs.update(tab.id, { active: true });
    await chrome.windows.update(tab.windowId, { focused: true });
  });

  elements.add(element);
}

//ads all elements in elements to the first ul element in the side panel
document.querySelector("ul").append(...elements);

const button = document.querySelector("button");
button.addEventListener("click", async () => {
  const tabIds = tabs.map(({ id }) => id);
  if (tabIds.length) {
    const group = await chrome.tabs.group({ tabIds });
    await chrome.tabGroups.update(group, { title: "DOCS" });
  }
});