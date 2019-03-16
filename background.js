chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab)=>{
    if(tab.url && tab.url.match(/^http/) && changeInfo.status==="complete"){
        console.log("updated")
        chrome.tabs.executeScript(tabId,{
            file: "script.js"    
        },
        result => {
            const lastErr = chrome.runtime.lastError;
            if (lastErr) console.log('tab: ' + tabId + ' lastError: ' + JSON.stringify(lastErr));
        })
    }
})

