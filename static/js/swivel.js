'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Swivel = (function () {
  function Swivel(images, options) {
    _classCallCheck(this, Swivel);

    var opts = options || {};
    this.settings = {
      containerSelector: opts.containerId || '#swivel',
      startIndex: opts.startIndex || Math.round(images.length / 2) - 1,
      height: opts.height || null,
      width: opts.width || null
    };
    this.images = this._preloadImages(images);
    this.container = document.querySelector(this.settings.containerSelector);
    this.displayedIndex = 0;
  }

  _createClass(Swivel, [{
    key: '_preloadImages',
    value: function _preloadImages(images) {
      var _this = this;

      // preload startIndex image first
      var imgObj = new Image();
      imgObj.src = images[this.settings.startIndex];
      imgObj.onload = function (e) {
        _this._startImgLoaded = true;
        _this.settings.height = _this.settings.height || e.target.height;
        _this.settings.width = _this.settings.width || e.target.width;
        if (_this._runOnLoad) {
          _this.run();
        };
      };

      var htmlImages = [];
      for (var i = 0; i < images.length; i++) {
        var _imgObj = new Image();
        _imgObj.src = images[i];
        _imgObj.style.display = 'none';
        htmlImages.push(_imgObj);
      }

      return htmlImages;
    }
  }, {
    key: 'displayImage',
    value: function displayImage(index) {
      if (index == this.displayedIndex) {
        return;
      }
      this.images[index].style.display = null;
      this.images[this.displayedIndex].style.display = 'none';
      this.displayedIndex = index;
    }
  }, {
    key: '_addEventHandlers',
    value: function _addEventHandlers() {
      var self = this;

      this.container.onmousemove = function (e) {
        var imgIdx = 0,
            regionWidth = self.settings.width / self.images.length,
            regionStartX = regionWidth;
        while (true) {
          if (e.offsetX <= regionStartX) {
            break;
          }
          regionStartX += regionWidth;
          imgIdx++;
        }
        self.displayImage(imgIdx);
      };

      if (!window.DeviceOrientationEvent) {
        return;
      }
      window.addEventListener('deviceorientation', function (e) {
        var imgIdx = 0;
        if (e.beta > 50) {
          imgIdx = self.images.length - 1;
        } else {
          var regionDegreeWidth = 100 / self.images.length,
              regionStartDegree = -50 + regionDegreeWidth;
          while (true) {
            if (e.beta <= regionStartDegree) {
              break;
            }
            regionStartDegree += regionDegreeWidth;
            imgIdx++;
          }
        }
        self.displayImage(imgIdx);
      });
    }
  }, {
    key: 'run',
    value: function run() {
      if (!this._startImgLoaded) {
        this._runOnLoad = true;
        return;
      }

      this._addEventHandlers();

      this.container.style.height = this.settings.height + 'px';
      this.container.style.width = this.settings.width + 'px';

      for (var i = 0; i < this.images.length; i++) {
        this.container.appendChild(this.images[i]);
      }

      this.displayImage(this.settings.startIndex);
    }
  }]);

  return Swivel;
})();

window.Swivel = Swivel;
//# sourceMappingURL=data:application/json;base64,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VSxHQUFHLElBQUksQ0FBQztBQUN2QixlQUFPO09BQ1I7O0FBRUQsVUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7O0FBRXpCLFVBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDMUQsVUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzs7QUFFeEQsV0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNDLFlBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztPQUM1Qzs7QUFFRCxVQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDN0M7OztTQTVGRyxNQUFNOzs7QUErRlosTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMiLCJmaWxlIjoic3JjL3N3aXZlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFN3aXZlbCB7XG4gIGNvbnN0cnVjdG9yKGltYWdlcywgb3B0aW9ucykge1xuICAgIGxldCBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLnNldHRpbmdzID0ge1xuICAgICAgY29udGFpbmVyU2VsZWN0b3I6IG9wdHMuY29udGFpbmVySWQgfHwgJyNzd2l2ZWwnLFxuICAgICAgc3RhcnRJbmRleDogb3B0cy5zdGFydEluZGV4ICAgICAgICAgfHwgTWF0aC5yb3VuZChpbWFnZXMubGVuZ3RoIC8gMikgLSAxLFxuICAgICAgaGVpZ2h0OiBvcHRzLmhlaWdodCAgICAgICAgICAgICAgICAgfHwgbnVsbCxcbiAgICAgIHdpZHRoOiBvcHRzLndpZHRoICAgICAgICAgICAgICAgICAgIHx8IG51bGwsXG4gICAgfTtcbiAgICB0aGlzLmltYWdlcyA9IHRoaXMuX3ByZWxvYWRJbWFnZXMoaW1hZ2VzKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZXR0aW5ncy5jb250YWluZXJTZWxlY3Rvcik7XG4gICAgdGhpcy5kaXNwbGF5ZWRJbmRleCA9IDA7XG4gIH1cblxuICBfcHJlbG9hZEltYWdlcyhpbWFnZXMpIHtcbiAgICAvLyBwcmVsb2FkIHN0YXJ0SW5kZXggaW1hZ2UgZmlyc3RcbiAgICBsZXQgaW1nT2JqID0gbmV3IEltYWdlKCk7XG4gICAgaW1nT2JqLnNyYyA9IGltYWdlc1t0aGlzLnNldHRpbmdzLnN0YXJ0SW5kZXhdO1xuICAgIGltZ09iai5vbmxvYWQgPSAoZSkgPT4ge1xuICAgICAgdGhpcy5fc3RhcnRJbWdMb2FkZWQgPSB0cnVlO1xuICAgICAgdGhpcy5zZXR0aW5ncy5oZWlnaHQgPSB0aGlzLnNldHRpbmdzLmhlaWdodCB8fCBlLnRhcmdldC5oZWlnaHQ7XG4gICAgICB0aGlzLnNldHRpbmdzLndpZHRoID0gdGhpcy5zZXR0aW5ncy53aWR0aCB8fCBlLnRhcmdldC53aWR0aDtcbiAgICAgIGlmICh0aGlzLl9ydW5PbkxvYWQpIHsgdGhpcy5ydW4oKSB9O1xuICAgIH07XG5cbiAgICBsZXQgaHRtbEltYWdlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgaW1nT2JqID0gbmV3IEltYWdlKClcbiAgICAgIGltZ09iai5zcmMgPSBpbWFnZXNbaV07XG4gICAgICBpbWdPYmouc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGh0bWxJbWFnZXMucHVzaChpbWdPYmopO1xuICAgIH1cblxuICAgIHJldHVybiBodG1sSW1hZ2VzO1xuICB9XG5cbiAgZGlzcGxheUltYWdlKGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID09IHRoaXMuZGlzcGxheWVkSW5kZXgpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5pbWFnZXNbaW5kZXhdLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xuICAgIHRoaXMuaW1hZ2VzW3RoaXMuZGlzcGxheWVkSW5kZXhdLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgdGhpcy5kaXNwbGF5ZWRJbmRleCA9IGluZGV4O1xuICB9XG5cbiAgX2FkZEV2ZW50SGFuZGxlcnMoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5jb250YWluZXIub25tb3VzZW1vdmUgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgbGV0IGltZ0lkeCA9IDAsXG4gICAgICAgICAgcmVnaW9uV2lkdGggPSBzZWxmLnNldHRpbmdzLndpZHRoIC8gc2VsZi5pbWFnZXMubGVuZ3RoLFxuICAgICAgICAgIHJlZ2lvblN0YXJ0WCA9IHJlZ2lvbldpZHRoO1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgaWYgKGUub2Zmc2V0WCA8PSByZWdpb25TdGFydFgpIHsgYnJlYWs7IH1cbiAgICAgICAgcmVnaW9uU3RhcnRYICs9IHJlZ2lvbldpZHRoO1xuICAgICAgICBpbWdJZHgrKztcbiAgICAgIH1cbiAgICAgIHNlbGYuZGlzcGxheUltYWdlKGltZ0lkeCk7XG4gICAgfTtcblxuICAgIGlmICghd2luZG93LkRldmljZU9yaWVudGF0aW9uRXZlbnQpIHsgcmV0dXJuOyB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZW9yaWVudGF0aW9uJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGxldCBpbWdJZHggPSAwO1xuICAgICAgaWYgKGUuYmV0YSA+IDUwKSB7XG4gICAgICAgIGltZ0lkeCA9IHNlbGYuaW1hZ2VzLmxlbmd0aCAtIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcmVnaW9uRGVncmVlV2lkdGggPSAxMDAgLyBzZWxmLmltYWdlcy5sZW5ndGgsXG4gICAgICAgICAgICByZWdpb25TdGFydERlZ3JlZSA9IC01MCArIHJlZ2lvbkRlZ3JlZVdpZHRoO1xuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgIGlmIChlLmJldGEgPD0gcmVnaW9uU3RhcnREZWdyZWUpIHsgYnJlYWs7IH1cbiAgICAgICAgICByZWdpb25TdGFydERlZ3JlZSArPSByZWdpb25EZWdyZWVXaWR0aDtcbiAgICAgICAgICBpbWdJZHgrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2VsZi5kaXNwbGF5SW1hZ2UoaW1nSWR4KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJ1bigpIHtcbiAgICBpZiAoIXRoaXMuX3N0YXJ0SW1nTG9hZGVkKSB7XG4gICAgICB0aGlzLl9ydW5PbkxvYWQgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2FkZEV2ZW50SGFuZGxlcnMoKTtcblxuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IHRoaXMuc2V0dGluZ3MuaGVpZ2h0ICsgJ3B4JztcbiAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS53aWR0aCA9IHRoaXMuc2V0dGluZ3Mud2lkdGggKyAncHgnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5pbWFnZXNbaV0pO1xuICAgIH1cblxuICAgIHRoaXMuZGlzcGxheUltYWdlKHRoaXMuc2V0dGluZ3Muc3RhcnRJbmRleCk7XG4gIH1cbn1cblxud2luZG93LlN3aXZlbCA9IFN3aXZlbDtcbiJdfQ==
//# sourceMappingURL=swivel.js.map
