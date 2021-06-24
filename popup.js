// Initialize butotn with users's prefered color
let changeColor = document.getElementById("audioRange");

changeColor.addEventListener("change", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  value = document.getElementById("audioRange").value;
  chrome.storage.sync.set({audioValue: value });


  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setAudio,
  });
});


// The body of this function will be execuetd as a content script inside the
// current page
function setAudio() {
  chrome.storage.sync.get("audioValue", ({ audioValue }) => {
    var audioTag = document.getElementById("remote-media");

    if(audioTag !== null){
      audioTag.volume = audioValue;
    }
  
  });
}

// set audiocontrol to current audioValue on reopen
window.onload = () => {
  chrome.storage.sync.get("audioValue", ({ audioValue }) => {
    if(audioValue !== null && changeColor !== null) {
      changeColor.value = audioValue;
    }
  });
}