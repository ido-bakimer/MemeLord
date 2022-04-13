'use strict'
var gCanvas;
var gCtx;
var gFocus = true;

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    createMemes();
    renderGallery();
    renderSearchWords()
}

function renderCanvas() {
    const imgSrc = getImg();
    const lines = getLines();
    drawImg(imgSrc, lines);
}

function renderGallery() {
    const imgs = getImgsForDisplay();
    const strHtmls = imgs.map(img =>
        `<img onclick="onImgChosen('${img.id}')" src="${img.url}">`
    )
    document.querySelector('.img-gallery').innerHTML = strHtmls.join('')
}

function renderSearchWords() {
    const keywords = getSearchWords()
    const strHtmls = keywords.map(function (keyword) {
        return `<div style = "font-size: ${keyword.weight}px" onclick="onKeyWordChosen('${keyword.word}')">${keyword.word}</div>`;
    })
    document.querySelector('.keywords').innerHTML = strHtmls.join('')

}

function onKeyWordChosen(keyword) {
    updateKeywordSize(keyword.toLowerCase());
    renderSearchWords();
    document.querySelector('input[name=search-img]').value = keyword;
    onSetFilter();
}

function onSetFilter() {
    const filterWord = document.querySelector('input[name=search-img]').value;
    setFilter(filterWord.toLowerCase());
    renderGallery();
}

function renderLines(lines) {
    lines.forEach(line => drawText(line));
}

function onInputText() {
    const text = document.querySelector('input[name=inputText]').value;
    setLineText(text);
    renderCanvas() // TODO: handle overflow text and line break? no need because of drag... 
}

function onImgChosen(imgId) {
    const elEditor = document.querySelector('.editor')
    elEditor.style.display = 'flex'
    setImgChosen(+imgId)
    resizeCanvas();
    renderCanvas();
    document.querySelector('input[name=inputText]').value = ''
    document.querySelector('.search-img').style.display = 'none'
    document.querySelector('.img-gallery').style.display = 'none'
}

function resizeCanvas() {
    var img = new Image();
    img.src = getImg();
    img.onload = function () {
        const basicSize = window.innerWidth / 2 > 500 ? 500 : window.innerWidth * 0.7;
        if (this.width >= this.height) {
            gCanvas.width = basicSize;
            gCanvas.height = (basicSize / this.width) * this.height
        } else {
            gCanvas.height = basicSize;
            gCanvas.width = (basicSize / this.height) * this.width
        }
    }
}


function onChangedStroke() {
    const color = document.querySelector('input[name=stroke]').value;
    changeStroke(color)
    renderCanvas()
}

function onChangedFill() {
    const color = document.querySelector('input[name=fill]').value;
    changeFill(color)
    renderCanvas();
}


function onScreenClicked() {
    renderCanvas();
    gFocus = false;
}

function drawImg(imgSrc, lines) {
    var img = new Image();
    img.src = imgSrc;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        renderLines(lines);
    }
}

function onShowGallery() {
    const elEditor = document.querySelector('.editor')
    elEditor.style.display = 'none'
    const elMemeList = document.querySelector('.meme-list')
    elMemeList.style.display = 'none'
    const elImgGallery = document.querySelector('.img-gallery')
    elImgGallery.style.display = 'grid'
    const elImgSearch = document.querySelector('.search-img')
    elImgSearch.style.display = 'flex'
}

function drawText(line) {
    gCtx.lineWidth = '1.5'
    gCtx.strokeStyle = line.strokeColor;
    gCtx.fillStyle = line.color
    gCtx.font = `900 ${line.size}px ${line.font}`
    gCtx.textAlign = line.align;
    gCtx.fillText(line.txt, line.x, line.y)
    gCtx.strokeText(line.txt, line.x, line.y)
}