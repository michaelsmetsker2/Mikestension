/**
 * @fileoverview
 * Contains functions for various utilities related to tab management, stashing and grouping
 * for use in side panel and homepage.
 * 
 * @module TabManager
 */

/**
 * Focuses the given tab and its window.
 * 
 * @param {number} tabId - The ID of the tab to be focused.
 * @param {number} windowId - The ID of the window containing the tab.
 * @return {Promise<void>} - A promise that resolves when the tab and window are focused
*/
export async function focusTab(tabId, windowId) {
    await chrome.tabs.update(tabId, { active: true });
    await chrome.windows.update(windowId, { focused: true });
}

export function deleteTab(tabId) {

}

export function stashTab(tabId) {
    
}

export function unStashTab(tabId) {
    
}