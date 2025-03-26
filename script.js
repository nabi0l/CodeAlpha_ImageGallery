let currentGallery = 1;

function toggleGallery() {
    const gallery1 = document.querySelector(".gallery-1");
    const gallery2 = document.querySelector(".gallery-2");

    if (currentGallery === 1) {
        gallery1.style.display = "none"; 
        gallery2.style.display = "grid"; 
        currentGallery = 2;
    } else {
        gallery2.style.display = "none"; 
        gallery1.style.display = "grid"; 
        currentGallery = 1;
    }
}

function nextImage() {
    if (currentGallery === 1) toggleGallery();
}

function previousImage() {
    if (currentGallery === 2) toggleGallery();
}

document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".gallery-1 img, .gallery-2 img");
    const overlay = document.getElementById("overlay");
    const detailImage = document.getElementById("detailImage");
    const imgName = document.getElementById("imgName");
    const imgWidth = document.getElementById("imgWidth");
    const imgHeight = document.getElementById("imgHeight");
    const imgSize = document.getElementById("imgSize");
    const counter = document.getElementById("counter");
    let currentIndex = 0; 

    images.forEach((img, index) => {
        img.addEventListener("click", function () {
            currentIndex = index; 
            showImageDetails(img.src, img.alt);
            updateCounter();
        });
    });

    
    function showImageDetails(src, alt) {
        detailImage.src = src;
        imgName.textContent = alt || "Unknown";


        fetch(src)
            .then(response => response.blob())
            .then(blob => {
                imgSize.textContent = (blob.size / 1024).toFixed(2);
            });

        
        const tempImg = new Image();
        tempImg.src = src;
        tempImg.onload = function () {
            imgWidth.textContent = tempImg.width;
            imgHeight.textContent = tempImg.height;
        };

        overlay.style.display = "block";
        document.getElementById("imageDetails").style.display = "block";
    }

    function updateCounter() {
        const totalImages = images.length;
        counter.textContent = `Image ${currentIndex + 1} of ${totalImages}`;
    }


    function closeModal() {
        overlay.style.display = "none";
        document.getElementById("imageDetails").style.display = "none";
    }

    overlay.addEventListener("click", closeModal);
});
function closeModal() {
  const detailDiv = document.getElementById("imageDetails");
  const overlay = document.getElementById("overlay");
  detailDiv.style.display = "none";
  overlay.style.display = "none";
}

