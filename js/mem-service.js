'use strict'
const STORAGE_KEY = 'memesDB';

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['baby'] },
    { id: 2, url: 'img/2.jpg', keywords: ['dance', 'woman', 'movie'] },
    { id: 3, url: 'img/3.jpg', keywords: ['politics', 'trump'] },
    { id: 4, url: 'img/4.jpg', keywords: ['love', 'happy', 'animals'] },
    { id: 5, url: 'img/5.jpg', keywords: ['sleep', 'animals', 'baby'] },
    { id: 6, url: 'img/6.jpg', keywords: ['sleep', 'animals'] },
    { id: 7, url: 'img/7.jpg', keywords: ['happy'] },
    { id: 8, url: 'img/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'img/9.jpg', keywords: ['movie'] },
    { id: 10, url: 'img/10.jpg', keywords: ['happy', 'baby', 'dance'] },
    { id: 11, url: 'img/11.jpg', keywords: ['politics', 'trump'] },
    { id: 12, url: 'img/12.jpg', keywords: ['baby', 'surprised'] },
    { id: 13, url: 'img/13.jpg', keywords: ['politics', 'happy'] },
    { id: 14, url: 'img/14.jpg', keywords: ['love'] },
    { id: 15, url: 'img/15.jpg', keywords: ['love', 'happy'] },
    { id: 12, url: 'img/12.jpg', keywords: ['movie'] },
    { id: 17, url: 'img/17.jpg', keywords: ['happy', 'gestures'] },
    { id: 18, url: 'img/18.jpg', keywords: ['happy', 'woman'] },
    { id: 19, url: 'img/19.jpg', keywords: ['gestures', 'surprised'] },
    { id: 22, url: 'img/22.jpg', keywords: ['gestures'] },
    { id: 26, url: 'img/26.jpg', keywords: ['happy', 'animals'] },
    { id: 29, url: 'img/29.jpg', keywords: ['happy', 'baby'] },
    { id: 30, url: 'img/30.jpg', keywords: ['movie', 'surprised']  },
    { id: 31, url: 'img/31.jpg', keywords: ['politics'] },
    { id: 32, url: 'img/32.jpg', keywords: ['happy','gestures', 'movie'] },
    { id: 33, url: 'img/33.jpg', keywords: ['coding','yaron'] },
    { id: 34, url: 'img/34.png', keywords: ['coding','nadav', 'template'] },
    { id: 35, url: 'img/35.jpg', keywords: ['animals'] },
    { id: 36, url: 'img/36.jpg', keywords: ['animals'] },
    { id: 37, url: 'img/37.jpg', keywords: ['animals'] },
    { id: 38, url: 'img/38.jpg', keywords: ['animals'] },
    { id: 39, url: 'img/39.jpg', keywords: ['animals'] },
    { id: 40, url: 'img/40.jpg', keywords: ['animals'] },
    { id: 41, url: 'img/41.jpg', keywords: ['animals'] },
    ];
    
    var gCommonSearchWords = [{word:'coding', weight:12},{word:'politics', weight: 12}, {word:'animals', weight: 12}, {word:'dance', weight: 12}, {word:'baby', weight: 12},  {word:'gestures', weight: 12}, {word:'happy', weight: 12}]
    
var gMemes;
var gMeme;
var gIdx;
var gImgFilter = 'all';

function getImgsForDisplay() {
    console.log(gImgFilter)
    let imgs = gImgs;
    if (gImgFilter !== 'all' && gImgFilter !== '') {
        imgs = gImgs.filter(img => img.keywords.find(keyword => keyword.includes(gImgFilter)));
    }
    return imgs;
}

function getSearchWords () {
    return gCommonSearchWords;
}

function updateKeywordSize(word) {
    const keywordIdx = gCommonSearchWords.findIndex( keyword => keyword.word === word)
    const maxWeight = window.innerWidth > 800 ? 40:30;
    if (gCommonSearchWords[keywordIdx].weight < maxWeight) gCommonSearchWords[keywordIdx].weight++;
}

function getImg() {
    return gImgs.find(img => img.id === gMeme.selectedImgId).url
}

function setFilter(filterBy) {
    gImgFilter = filterBy;
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}
function getLines() {
    return gMeme.lines;
}

function setLineText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
}

function moveLine(diff) {
    gMeme.lines[gMeme.selectedLineIdx].y += diff;
}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff; 
}

function changeStroke(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}
function changeFill(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
}

function changeAlignment(alignment) {
    gMeme.lines[gMeme.selectedLineIdx].align = alignment;
    switch (alignment) {
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].x = gCanvas.width / 2;
            break;
        case 'left':
            gMeme.lines[gMeme.selectedLineIdx].x = 10;
            break;
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].x = gCanvas.width - 10;
            break;
    }
}

function addLine() {
    const emptyIdx = gMeme.lines.findIndex(line => line.txt === '')
    console.log(emptyIdx)
    if (emptyIdx !== -1) {
        gMeme.selectedLineIdx = emptyIdx;
        console.log('return')
        return;
    }
    gMeme.selectedLineIdx = gMeme.lines.length;
    gMeme.lines.push({ txt: '', size: 40, align: 'left', strokeColor: 'black', color: 'White', font: 'impact', x: 10, y: 0 })
    gMeme.lines[gMeme.selectedLineIdx].y = (gMeme.selectedLineIdx === 1) ? gCanvas.height - 50 : gCanvas.height / 2;
}

function delLine() {
    if (gMeme.selectedLineIdx !== (gMeme.lines.length - 1 || gMeme.lines.length === 1)) _cleanLine()
    else {
        gMeme.lines.pop()
        gMeme.selectedLineIdx--;
    }
}
function switchSelectedLine() {
    if (gMeme.selectedLineIdx === (gMeme.lines.length - 1))
        gMeme.selectedLineIdx = 0;
    else gMeme.selectedLineIdx++;
}

function setImgChosen(imgId) {
    _createMeme(imgId)
}

function setMoveActive(isActive, offsetX = 0, offsetY = 0) {
    gMeme.isMoveActive = isActive;
    if (!isActive) return // Mouse is up
    const lineIdx = checkClickPosition(offsetX, offsetY)
    if (lineIdx === -1) {
        gMeme.isMoveActive = false;
        return;
    }
    gMeme.selectedLineIdx = lineIdx;
    gMeme.relX = offsetX;
    gMeme.relY = offsetY;
}

function getIsMoveActive() {
    return gMeme.isMoveActive
}

function checkClickPosition(offsetX, offsetY) {
    const width = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width ? gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width : gCanvas.width - 15;
    return gMeme.lines.findIndex(line => (offsetX >= line.x - 5 && offsetX <= line.x + width + 5 && offsetY >= line.y - line.size - 5) && (offsetY <= line.y + 5))
}

function setLineLocation(offsetX, offsetY) {
    const diffX = offsetX - gMeme.relX;
    const diffY = offsetY - gMeme.relY;
    gMeme.lines[gMeme.selectedLineIdx].x += diffX;
    gMeme.lines[gMeme.selectedLineIdx].y += diffY;
    gMeme.relX = offsetX;
    gMeme.relY = offsetY;
}

function getMemes() {
    return gMemes;
}

function _createMeme(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedLineIdx: 0,
        isMoveActive: false,
        relX: 0,
        relY: 0,
        lines: [
            {
                txt: '',
                size: 40,
                align: 'left',
                strokeColor: 'black',
                color: 'white',
                font: 'impact',
                x: 10,
                y: 50
            }
        ]
    }
}

function _cleanLine() {
    gMeme.lines[gMeme.selectedLineIdx] = {
        txt: '',
        size: 40,
        align: 'left',
        strokeColor: 'black',
        color: 'White',
        font: 'impact',
        x: 10,
        y: gMeme.lines[gMeme.selectedLineIdx].y
    };
}