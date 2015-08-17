class Swivel {
  constructor(images, options) {
    let opts = options || {};
    this.settings = {
      containerId: opts.containerId || "swivel",
      startIndex:  opts.startIndex || Math.round(images.length / 2) - 1,
      height:      opts.height || null,
      width:       opts.width || null,
    };
    this.images = this._loadImages(images);
    this.container = document.getElementById(this.settings.containerId);
  }

  _loadImages(images) {
    let htmlImages = [];
    let imgObj;
    // Load startIndex image first
    imgObj = new Image();
    imgObj.src = images[this.settings.startIndex];
    imgObj.onload = (e) => {
      this.settings.height = this.settings.height || e.target.height;
      this.settings.width = this.settings.width || e.target.width;
    };

    for (let i = 0; i < images.length; i++) {
      imgObj = new Image();
      imgObj.src = images[i];
      htmlImages.push(imgObj);
    }

    return htmlImages;
  }

  _setContainerBackgroundImg(src) {
    if (src === this.containerSrc) { return; }
    this.containerSrc = src;
    this.container.style.background = 'url(' + src + ') no-repeat center';
  }

  _addEventHandlers() {
    var self = this;
    this.container.onmousemove = function (e) {
      let imgIdx = 0,
          regionWidth = self.settings.width / self.images.length,
          regionStartX = regionWidth;
      while (true) {
        if (e.offsetX <= regionStartX) { break; }
        regionStartX += regionWidth;
        imgIdx++;
      }
      self._setContainerBackgroundImg(self.images[imgIdx].src);
    };
  }

  run() {
    this._addEventHandlers();

    //TODO: wait for start image to load
    this.container.style.height = this.settings.height + 'px';
    this.container.style.width = this.settings.width + 'px';

    this._setContainerBackgroundImg(this.images[this.settings.startIndex].src);
  }
}

window.Swivel = Swivel;
