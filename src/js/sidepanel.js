/**
 * @fileoverview
 * Contains logic for displaying tabs and bookmarks in the sidepanel
*/

import * as TabMangager from "./tabmanager.js";

const template = document.getElementById("li_template");

const openTabElements = new Map(); //key: tabId, value: dom element

{ //populate tab map

  // returns all tabs in all windows
  const tabs = await chrome.tabs.query({}); // TODO sorting by window

  //populates the side tab list with all currently open tabs
  for (const tab of tabs) {
    const element = template.content.firstElementChild.cloneNode(true);

    element.querySelector(".favicon").src = tab.favIconUrl // TODO defualt icon
    element.querySelector(".title").textContent = tab.title;
    element.querySelector(".tabContainer").addEventListener("click", async () => {
      await TabMangager.focusTab(tab.id, tab.windowId);
    // TODO close tab button
    // TODO stash tab button
    });

    openTabElements.set(tab.id, element);
  }

  //ads all elements in openTabElemetns to the side panel's first ul in order
  document.querySelector("ul").append(...openTabElements.values()); // TODO get specific ul
  
  //TODO bookmarks
}


// TODO make this work
/**
 * update the list of elements when a tab is closed
*/
chrome.runtime.onMessage.addListener((TAB_CLOSED, tabId) => {
  openTabElements.get(tabId).remove();
  openTabElements.delete(tabId);
})