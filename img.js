window.onload = function () {
    imgLocation("container", "box");
    var imgData = {
        data: [
            { "src": "1.png" },
            { "src": "2.png" },
            { "src": "3.png" },
            { "src": "4.png" },
            { "src": "5.png" },
            { "src": "6.jfif" },
            { "src": "7.jpeg" },
            { "src": "8.jpg" },
            { "src": "9.jfif" },
            { "src": "10.jpeg" },
            { "src": "11.jpg" },
            { "src": "12.jfif" },
            { "src": "13.jpeg" },
            { "src": "14.jpg" },
            { "src": "15.jpg" },
            { "src": "16.png" },
            { "src": "17.jpg" },
            { "src": "18.jpg" },
            { "src": "19.jpg" },
            { "src": "20.jpg" },
            { "src": "21.jpg" },
            { "src": "22.jpg" },
            { "src": "23.jpg" }
        ]
    }
    var imgName = ["jpg", "jpeg", "png", "jfif"];
    window.onscroll = function () {
        if (checkFlag()) {
            var cparent = document.getElementById("container");
            for (var k = 0; k < 30; k++) {
                var i = randomNum(1, 102);
                var url;
                var img;
                for (var l = 0; l < imgName.length; l++) {
                    if (CheckImgExists("img/" + i + "." + imgName[l])) {
                        var ccontent = document.createElement("div");
                        ccontent.className = "box";
                        cparent.appendChild(ccontent);
                        var boximg = document.createElement("div");
                        boximg.className = "box_img";
                        ccontent.appendChild(boximg);
                        var img = document.createElement("img");
                        url = "img/" + i + "." + imgName[l];
                        img.src = url;
                        boximg.appendChild(img);
                        break;
                    }
                }
            } imgLocation("container", "box");
        }
    }
}
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}
function CheckImgExists(imgurl) {
    var ImgObj = new Image(); //判断图片是否存在  
    ImgObj.src = imgurl;
    //没有图片，则返回-1  
    if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
        return true;
    } else {
        return false;
    }
}
function checkFlag() {
    var cparent = document.getElementById("container");
    var ccontent = getChildElement(cparent, "box");
    var lastContentHeight = ccontent[ccontent.length - 1].offsetTop;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
    console.log(scrollTop);
    if (lastContentHeight < scrollTop + pageHeight) {
        return true;
    }
}
function imgLocation(parent, content) {
    //将每一个box取出来
    var cparent = document.getElementById(parent);
    var ccontent = getChildElement(cparent, content);
    var imgWidth = ccontent[0].offsetWidth;
    var num = Math.floor(document.documentElement.clientWidth / imgWidth);
    cparent.style.cssText = "width:" + imgWidth * num + "px;margin:0 auto";

    var BoxHeightArr = [];
    for (let index = 0; index < ccontent.length; index++) {
        if (index < num) {
            BoxHeightArr[index] = ccontent[index].offsetHeight;
        } else {
            var minHeight = Math.min.apply(null, BoxHeightArr);
            var minIndex = getMinHeightLocation(BoxHeightArr, minHeight)

            ccontent[index].style.position = "absolute";
            ccontent[index].style.top = minHeight + "px";
            ccontent[index].style.left = ccontent[minIndex].offsetLeft + "px";
            BoxHeightArr[minIndex] = BoxHeightArr[minIndex] + ccontent[index].offsetHeight;
        }

    }
}

function getMinHeightLocation(BoxHeightArr, minHeight) {
    for (const key in BoxHeightArr) {
        const element = BoxHeightArr[key];
        if (element == minHeight) {
            return key;
        }
    }
}
function getChildElement(parent, content) {
    var contentArr = [];
    var allcontent = parent.getElementsByTagName("*");
    for (var index = 0; index < allcontent.length; index++) {
        if (allcontent[index].className == content) {
            contentArr.push(allcontent[index]);
        }
    }
    return contentArr;
}