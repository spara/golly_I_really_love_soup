walk(document.body);

function walk(rootNode)
{
    // Find all the text nodes in rootNode
    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
    node;

    // Modify each text node's value
    while (node = walker.nextNode()) {
        handleText(node);
    }
}

function handleText(textNode) {
  textNode.nodeValue = replaceText(textNode.nodeValue);
}


function replaceText(v) 
{
    // original
	v = v.replace(/\bTrump\b/g, "Golly, I really love soup");
	v = v.replace(/\bPresident\b/g, "Golly, I really love soup.");
	v = v.replace(/\bpresident\b/g, "Golly, I really love soup.");
	v = v.replace(/\b2016\b/g, "Golly, I really love soup.");
    
    // groups
    v = v.replace(/\balt-right\b/g, "racists");
    v = v.replace(/\bAlt-Right\b/g, "racists");
    v = v.replace(/\bPopulist Right\b/g, "racists");
    v = v.replace(/\bpopulist right\b/g, "racists");
    v = v.replace(/\bdeplorables\b/g, "racists, bigots, and misogynists")
    v = v.replace(/\bDeplorables\b/g, "racists, bigots, and misogynists")
    v = v.replace(/\bdeplorable\b/g, "I am a racist, bigot, and misogynist")
    v = v.replace(/\bDeplorable\b/g, "I am a racist, bigot, and misogynist")
	
    // people
    v = v.replace(/\bBannon\n/g, "Bannon, anti-semite," );

    return v;
}

// The callback used for the document body and title observers
function observerCallback(mutations) {
    var i;

    mutations.forEach(function(mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].nodeType === 3) {
                // Replace the text for text nodes
                handleText(mutation.addedNodes[i]);
            } else {
                // Otherwise, find text nodes within the given node and replace text
                walk(mutation.addedNodes[i]);
            }
        }
    });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
    var docTitle = doc.getElementsByTagName('title')[0],
    observerConfig = {
        characterData: true,
        childList: true,
        subtree: true
    },
    bodyObserver, titleObserver;

    // Do the initial text replacements in the document body and title
    walk(doc.body);
    doc.title = replaceText(doc.title);

    // Observe the body so that we replace text in any added/modified nodes
    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);

    // Observe the title so we can handle any modifications there
    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}
walkAndObserve(document);


