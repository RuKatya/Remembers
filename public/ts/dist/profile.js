//Change text of label - fileBtnHidden
var changeSrcImg = document.querySelector('#avatar');
var srcShowOnLabel = document.querySelector('label>span');
changeSrcImg.addEventListener('change', function (ev) {
    var target = ev.target;
    var file = target.files[0]; //file as filelist get first object
    if (file.name.length > 22) {
        srcShowOnLabel.innerHTML = file.name.slice(0, 22);
    }
    else {
        srcShowOnLabel.innerHTML = file.name;
    }
});
