//Change text of label - fileBtnHidden
const changeSrcImg = document.querySelector('#avatar')
const srcShowOnLabel = document.querySelector('label>span')

changeSrcImg.addEventListener('change', (ev) => {
    const target = ev.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0] //file as filelist get first object
    if (file.name.length > 22) {
        srcShowOnLabel.innerHTML = file.name.slice(0, 22)
    } else {
        srcShowOnLabel.innerHTML = file.name
    }
})