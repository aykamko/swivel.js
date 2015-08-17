class Swivel {
  constructor(images, options) {
    let opts = options || {};
    this.settings = {
      containerId: opts.containerId || "swivel",
    };
    this.images = this._loadImages(images)
  }

  _loadImages(images) {
    let htmlImages = [];
    let imgObj;
    for (let i = 0; i < images.length; i++) {
      imgObj = new Image();
      imgObj.src = images[i];
      htmlImages.push(imgObj);
    }
    return htmlImages;
  }

  run() {
    let container = document.getElementById(this.settings.containerId);
    for (let i = 0; i < this.images.length; i++) {
      container.appendChild(this.images[i]);
    }
  }
}

export { Swivel };
