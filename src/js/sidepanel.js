/**
 * @fileoverview
 * Contains logic for displaying tabs and bookmarks in the sidepanel
*/

import * as TabMangager from "./tabmanager.js";

const template = document.getElementById("li_template");
const tab_list = new Set(); //list of tab dom elements in the list

{ //populate tab list

  // returns all tabs in all windows
  const tabs = await chrome.tabs.query({}); // TODO sorting by window

  //populates the side tab list with all currently open tabs
  for (const tab of tabs) {
    const element = template.content.firstElementChild.cloneNode(true);

    element.querySelector(".favicon").src = tab.favIconUrl
    element.querySelector(".title").textContent = tab.title;
    element.querySelector(".tabContainer").addEventListener("click", async () => {
      await TabMangager.focusTab(tab.id, tab.windowId);
    // TODO close tab button
    // TODO stash tab button
    });

    tab_list.add(element);
  }

  //ads all elements in tab_list to the side panel's first ul in order
  document.querySelector("ul").append(...tab_list); // TODO get specific ul

  
  //TODO bookmarks
}

/**
 * update the list of elements when a tab is closed
 */
chrome.runtime.onMessage.addListener((TAB_CLOSED, tabId) => {
  for (const tab of tab_list) {
    if (tab.id === tabId) {
      console.log("yay");
    }
    return;
  }
})