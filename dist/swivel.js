'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Swivel = (function () {
  function Swivel(images, options) {
    _classCallCheck(this, Swivel);

    var opts = options || {};
    this.settings = {
      containerSelector: opts.containerSelector || '#swivel',
      startIndex: opts.startIndex || Math.round(images.length / 2) - 1,
      height: opts.height || null,
      width: opts.width || null,
      maxAngle: Math.min(opts.maxAngle, 180) || 40,
      smooth: opts.smooth !== undefined ? opts.smooth : true,
      smoothInterval: opts.smoothInterval || 100,
      callback: typeof opts.callback === 'function' ? opts.callback : function () {}
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
    key: 'transitionToImage',
    value: function transitionToImage(index) {
      var _this2 = this;

      if (index == this._targetIndex) {
        return;
      }
      this._targetIndex = index;
      clearTimeout(this._intervalTimeout);

      if (!this.settings.smooth) {
        this._setImage(index);
        return;
      }

      var transitionFunc = function transitionFunc() {
        if (_this2.displayedIndex == _this2._targetIndex) {
          return;
        }
        if (_this2.displayedIndex > _this2._targetIndex) {
          _this2._setImage(_this2.displayedIndex - 1);
        } else {
          _this2._setImage(_this2.displayedIndex + 1);
        }
        _this2._intervalTimeout = setTimeout(transitionFunc, _this2.settings.smoothInterval);
      };
      transitionFunc();
    }
  }, {
    key: '_setImage',
    value: function _setImage(index) {
      this.images[index].style.display = null;
      this.images[this.displayedIndex].style.display = 'none';
      this.displayedIndex = index;
      this.settings.callback(index);
    }
  }, {
    key: '_addEventHandlers',
    value: function _addEventHandlers() {
      var self = this;

      if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && window.DeviceOrientationEvent !== undefined && window.orientation !== undefined) {

        window.addEventListener('deviceorientation', function (e) {
          var imgIdx = 0;
          var angle = Math.abs(window.orientation) == 90 ? e.beta : e.gamma;
          if (angle > self.settings.maxAngle) {
            imgIdx = self.images.length - 1;
          } else {
            var regionDegreeWidth = 2 * self.settings.maxAngle / self.images.length,
                regionStartDegree = -self.settings.maxAngle + regionDegreeWidth;
            while (true) {
              if (angle <= regionStartDegree) {
                break;
              }
              regionStartDegree += regionDegreeWidth;
              imgIdx++;
            }
          }
          self.transitionToImage(imgIdx);
        });
        return;
      }

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
        self.transitionToImage(imgIdx);
      };
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

      this._setImage(this.settings.startIndex);
    }
  }]);

  return Swivel;
})();

window.Swivel = Swivel;
//# sourceMappingURL=data:application/json;base64,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V0FBVyxDQUFDO0FBQy9CLGVBQU8sSUFBSSxFQUFFO0FBQ1gsY0FBSSxDQUFDLENBQUMsT0FBTyxJQUFJLFlBQVksRUFBRTtBQUFFLGtCQUFNO1dBQUU7QUFDekMsc0JBQVksSUFBSSxXQUFXLENBQUM7QUFDNUIsZ0JBQU0sRUFBRSxDQUFDO1NBQ1Y7QUFDRCxZQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7T0FDaEMsQ0FBQztLQUNIOzs7V0FFRSxlQUFHO0FBQ0osVUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7QUFDekIsWUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDdkIsZUFBTztPQUNSOztBQUVELFVBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDOztBQUV6QixVQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQzFELFVBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7O0FBRXhELFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMzQyxZQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDNUM7O0FBRUQsVUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzFDOzs7U0E1SEcsTUFBTTs7O0FBK0haLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDIiwiZmlsZSI6InNyYy9zd2l2ZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTd2l2ZWwge1xuICBjb25zdHJ1Y3RvcihpbWFnZXMsIG9wdGlvbnMpIHtcbiAgICBsZXQgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5zZXR0aW5ncyA9IHtcbiAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiBvcHRzLmNvbnRhaW5lclNlbGVjdG9yIHx8ICcjc3dpdmVsJyxcbiAgICAgIHN0YXJ0SW5kZXg6IG9wdHMuc3RhcnRJbmRleCB8fCBNYXRoLnJvdW5kKGltYWdlcy5sZW5ndGggLyAyKSAtIDEsXG4gICAgICBoZWlnaHQ6IG9wdHMuaGVpZ2h0IHx8IG51bGwsXG4gICAgICB3aWR0aDogb3B0cy53aWR0aCB8fCBudWxsLFxuICAgICAgbWF4QW5nbGU6IE1hdGgubWluKG9wdHMubWF4QW5nbGUsIDE4MCkgfHwgNDAsXG4gICAgICBzbW9vdGg6IChvcHRzLnNtb290aCAhPT0gdW5kZWZpbmVkKSA/IG9wdHMuc21vb3RoIDogdHJ1ZSxcbiAgICAgIHNtb290aEludGVydmFsOiBvcHRzLnNtb290aEludGVydmFsIHx8IDEwMCxcbiAgICAgIGNhbGxiYWNrOiAodHlwZW9mIG9wdHMuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpID8gb3B0cy5jYWxsYmFjayA6IGZ1bmN0aW9uKCl7fSxcbiAgICB9O1xuICAgIHRoaXMuaW1hZ2VzID0gdGhpcy5fcHJlbG9hZEltYWdlcyhpbWFnZXMpO1xuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNldHRpbmdzLmNvbnRhaW5lclNlbGVjdG9yKTtcbiAgICB0aGlzLmRpc3BsYXllZEluZGV4ID0gMDtcbiAgfVxuXG4gIF9wcmVsb2FkSW1hZ2VzKGltYWdlcykge1xuICAgIC8vIHByZWxvYWQgc3RhcnRJbmRleCBpbWFnZSBmaXJzdFxuICAgIGxldCBpbWdPYmogPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWdPYmouc3JjID0gaW1hZ2VzW3RoaXMuc2V0dGluZ3Muc3RhcnRJbmRleF07XG4gICAgaW1nT2JqLm9ubG9hZCA9IChlKSA9PiB7XG4gICAgICB0aGlzLl9zdGFydEltZ0xvYWRlZCA9IHRydWU7XG4gICAgICB0aGlzLnNldHRpbmdzLmhlaWdodCA9IHRoaXMuc2V0dGluZ3MuaGVpZ2h0IHx8IGUudGFyZ2V0LmhlaWdodDtcbiAgICAgIHRoaXMuc2V0dGluZ3Mud2lkdGggPSB0aGlzLnNldHRpbmdzLndpZHRoIHx8IGUudGFyZ2V0LndpZHRoO1xuICAgICAgaWYgKHRoaXMuX3J1bk9uTG9hZCkgeyB0aGlzLnJ1bigpIH07XG4gICAgfTtcblxuICAgIGxldCBodG1sSW1hZ2VzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBpbWdPYmogPSBuZXcgSW1hZ2UoKVxuICAgICAgaW1nT2JqLnNyYyA9IGltYWdlc1tpXTtcbiAgICAgIGltZ09iai5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgaHRtbEltYWdlcy5wdXNoKGltZ09iaik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGh0bWxJbWFnZXM7XG4gIH1cblxuICB0cmFuc2l0aW9uVG9JbWFnZShpbmRleCkge1xuICAgIGlmIChpbmRleCA9PSB0aGlzLl90YXJnZXRJbmRleCkgeyByZXR1cm47IH1cbiAgICB0aGlzLl90YXJnZXRJbmRleCA9IGluZGV4O1xuICAgIGNsZWFyVGltZW91dCh0aGlzLl9pbnRlcnZhbFRpbWVvdXQpO1xuXG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLnNtb290aCkge1xuICAgICAgdGhpcy5fc2V0SW1hZ2UoaW5kZXgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB0cmFuc2l0aW9uRnVuYyA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmRpc3BsYXllZEluZGV4ID09IHRoaXMuX3RhcmdldEluZGV4KSB7IHJldHVybjsgfVxuICAgICAgaWYgKHRoaXMuZGlzcGxheWVkSW5kZXggPiB0aGlzLl90YXJnZXRJbmRleCkge1xuICAgICAgICB0aGlzLl9zZXRJbWFnZSh0aGlzLmRpc3BsYXllZEluZGV4IC0gMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zZXRJbWFnZSh0aGlzLmRpc3BsYXllZEluZGV4ICsgMSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9pbnRlcnZhbFRpbWVvdXQgPSBzZXRUaW1lb3V0KHRyYW5zaXRpb25GdW5jLCB0aGlzLnNldHRpbmdzLnNtb290aEludGVydmFsKTtcbiAgICB9XG4gICAgdHJhbnNpdGlvbkZ1bmMoKTtcbiAgfVxuXG4gIF9zZXRJbWFnZShpbmRleCkge1xuICAgIHRoaXMuaW1hZ2VzW2luZGV4XS5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcbiAgICB0aGlzLmltYWdlc1t0aGlzLmRpc3BsYXllZEluZGV4XS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHRoaXMuZGlzcGxheWVkSW5kZXggPSBpbmRleDtcbiAgICB0aGlzLnNldHRpbmdzLmNhbGxiYWNrKGluZGV4KTtcbiAgfVxuXG4gIF9hZGRFdmVudEhhbmRsZXJzKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGlmICgvQW5kcm9pZHxpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiZcbiAgICAgICAgd2luZG93LkRldmljZU9yaWVudGF0aW9uRXZlbnQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICB3aW5kb3cub3JpZW50YXRpb24gIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBsZXQgaW1nSWR4ID0gMDtcbiAgICAgICAgbGV0IGFuZ2xlID0gTWF0aC5hYnMod2luZG93Lm9yaWVudGF0aW9uKSA9PSA5MCA/IGUuYmV0YSA6IGUuZ2FtbWE7XG4gICAgICAgIGlmIChhbmdsZSA+IHNlbGYuc2V0dGluZ3MubWF4QW5nbGUpIHtcbiAgICAgICAgICBpbWdJZHggPSBzZWxmLmltYWdlcy5sZW5ndGggLSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCByZWdpb25EZWdyZWVXaWR0aCA9IDIgKiBzZWxmLnNldHRpbmdzLm1heEFuZ2xlIC8gc2VsZi5pbWFnZXMubGVuZ3RoLFxuICAgICAgICAgICAgICByZWdpb25TdGFydERlZ3JlZSA9IC1zZWxmLnNldHRpbmdzLm1heEFuZ2xlICsgcmVnaW9uRGVncmVlV2lkdGg7XG4gICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGlmIChhbmdsZSA8PSByZWdpb25TdGFydERlZ3JlZSkgeyBicmVhazsgfVxuICAgICAgICAgICAgcmVnaW9uU3RhcnREZWdyZWUgKz0gcmVnaW9uRGVncmVlV2lkdGg7XG4gICAgICAgICAgICBpbWdJZHgrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi50cmFuc2l0aW9uVG9JbWFnZShpbWdJZHgpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jb250YWluZXIub25tb3VzZW1vdmUgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgbGV0IGltZ0lkeCA9IDAsXG4gICAgICAgICAgcmVnaW9uV2lkdGggPSBzZWxmLnNldHRpbmdzLndpZHRoIC8gc2VsZi5pbWFnZXMubGVuZ3RoLFxuICAgICAgICAgIHJlZ2lvblN0YXJ0WCA9IHJlZ2lvbldpZHRoO1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgaWYgKGUub2Zmc2V0WCA8PSByZWdpb25TdGFydFgpIHsgYnJlYWs7IH1cbiAgICAgICAgcmVnaW9uU3RhcnRYICs9IHJlZ2lvbldpZHRoO1xuICAgICAgICBpbWdJZHgrKztcbiAgICAgIH1cbiAgICAgIHNlbGYudHJhbnNpdGlvblRvSW1hZ2UoaW1nSWR4KTtcbiAgICB9O1xuICB9XG5cbiAgcnVuKCkge1xuICAgIGlmICghdGhpcy5fc3RhcnRJbWdMb2FkZWQpIHtcbiAgICAgIHRoaXMuX3J1bk9uTG9hZCA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fYWRkRXZlbnRIYW5kbGVycygpO1xuXG4gICAgdGhpcy5jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5zZXR0aW5ncy5oZWlnaHQgKyAncHgnO1xuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLndpZHRoID0gdGhpcy5zZXR0aW5ncy53aWR0aCArICdweCc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmltYWdlc1tpXSk7XG4gICAgfVxuXG4gICAgdGhpcy5fc2V0SW1hZ2UodGhpcy5zZXR0aW5ncy5zdGFydEluZGV4KTtcbiAgfVxufVxuXG53aW5kb3cuU3dpdmVsID0gU3dpdmVsO1xuIl19
//# sourceMappingURL=swivel.js.map
