class Swivel {
  constructor(images, options) {
    let opts = options || {};
    this.settings = {
      containerSelector: opts.containerSelector || '#swivel',
      startIndex: opts.startIndex || Math.round(images.length / 2) - 1,
      height: opts.height || null,
      width: opts.width || null,
      maxAngle: Math.min(opts.maxAngle, 180) || 40,
      smooth: (opts.smooth !== undefined) ? opts.smooth : true,
      smoothInterval: opts.smoothInterval || 100,
      callback: (typeof opts.callback === 'function') ? opts.callback : function(){},
    };
    this.images = this._preloadImages(images);
    this.container = document.querySelector(this.settings.containerSelector);
    this.displayedIndex = 0;
  }

  _preloadImages(images) {
    // preload startIndex image first
    let imgObj = new Image();
    imgObj.src = images[this.settings.startIndex];
    imgObj.onload = (e) => {
      this._startImgLoaded = true;
      this.settings.height = this.settings.height || e.target.height;
      this.settings.width = this.settings.width || e.target.width;
      if (this._runOnLoad) { this.run() };
    };

    let htmlImages = [];
    for (let i = 0; i < images.length; i++) {
      let imgObj = new Image()
      imgObj.src = images[i];
      imgObj.style.display = 'none';
      htmlImages.push(imgObj);
    }

    return htmlImages;
  }

  transitionToImage(index) {
    if (index == this._targetIndex) { return; }
    this._targetIndex = index;
    clearTimeout(this._intervalTimeout);

    if (!this.settings.smooth) {
      this._setImage(index);
      return;
    }

    let transitionFunc = () => {
      if (this.displayedIndex == this._targetIndex) { return; }
      if (this.displayedIndex > this._targetIndex) {
        this._setImage(this.displayedIndex - 1);
      } else {
        this._setImage(this.displayedIndex + 1);
      }
      this._intervalTimeout = setTimeout(transitionFunc, this.settings.smoothInterval);
    }
    transitionFunc();
  }

  _setImage(index) {
    this.images[index].style.display = null;
    this.images[this.displayedIndex].style.display = 'none';
    this.displayedIndex = index;
    this.settings.callback(index);
  }

  _addEventHandlers() {
    var self = this;

    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&
        window.DeviceOrientationEvent !== undefined &&
        window.orientation !== undefined) {

      window.addEventListener('deviceorientation', function (e) {
        let imgIdx = 0;
        let angle = Math.abs(window.orientation) == 90 ? e.beta : e.gamma;
        if (angle > self.settings.maxAngle) {
          imgIdx = self.images.length - 1;
        } else {
          let regionDegreeWidth = 2 * self.settings.maxAngle / self.images.length,
              regionStartDegree = -self.settings.maxAngle + regionDegreeWidth;
          while (true) {
            if (angle <= regionStartDegree) { break; }
            regionStartDegree += regionDegreeWidth;
            imgIdx++;
          }
        }
        self.transitionToImage(imgIdx);
      });
      return;
    }

    this.container.onmousemove = function (e) {
      let imgIdx = 0,
          regionWidth = self.settings.width / self.images.length,
          regionStartX = regionWidth;
      while (true) {
        if (e.offsetX <= regionStartX) { break; }
        regionStartX += regionWidth;
        imgIdx++;
      }
      self.transitionToImage(imgIdx);
    };
  }

  run() {
    if (!this._startImgLoaded) {
      this._runOnLoad = true;
      return;
    }

    this._addEventHandlers();

    this.container.style.height = this.settings.height + 'px';
    this.container.style.width = this.settings.width + 'px';

    for (let i = 0; i < this.images.length; i++) {
      this.container.appendChild(this.images[i]);
    }

    this._setImage(this.settings.startIndex);
  }
}

window.Swivel = Swivel;
