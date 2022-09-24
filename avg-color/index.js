
function GetColor(imgElem, ratio,){
    const canvas = document.createElement('canvas')
    let width = canvas.width = imgElem.width;
    let height = canvas.height = imgElem.height;
    const context = canvas.getContext('2d')
    context.drawImage(imgElem,0,0)
    let data, length;
    let i = -4, count =0;

    try{
        data =context.getImageData(0,0,width,height)
        length = data.data.length
    }
    catch(err){
        console.error(err)
        return{
            R:0,
            G:0,
            B:0
        }
    }

    let R = G = B = 0

    while((i+=ratio*4)<length){
        ++count;
        R+=data.data[i];
        G+=data.data[i+1];
        B+=data.data[i+2];
    }

    R = ~~(R / count)
    G = ~~(G / count)
    B = ~~(B / count)

    return {R,G,B}
}

const image = document.querySelector('img');

image.onload = function(){
    const {R,G,B} = GetColor(image, 4)
    console.log(R,G,B)
    document.body.style.background = `linear-gradient(rgb(${R},${G},${B}), black)`
}