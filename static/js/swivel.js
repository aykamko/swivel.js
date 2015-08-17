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
  }

  _createClass(Swivel, [{
    key: '_preloadImages',
    value: function _preloadImages(images) {
      var _this = this;

      // preload startIndex image first
      var startImg = new Image();
      startImg.src = images[this.settings.startIndex];
      startImg.onload = function (e) {
        _this._startImgLoaded = true;
        _this.settings.height = _this.settings.height || e.target.height;
        _this.settings.width = _this.settings.width || e.target.width;
        if (_this._runOnLoad) {
          _this.run();
        };
      };

      var imgSources = [];
      for (var i = 0; i < images.length; i++) {
        var _ = new Image().src = images[i];
        imgSources.push(images[i]);
      }

      return imgSources;
    }
  }, {
    key: '_setContainerBackgroundImg',
    value: function _setContainerBackgroundImg(src) {
      if (src === this.containerSrc) {
        return;
      }
      this.containerSrc = src;
      this.container.style.background = 'url(' + src + ') no-repeat center';
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
        self._setContainerBackgroundImg(self.images[imgIdx]);
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
        self._setContainerBackgroundImg(self.images[imgIdx]);
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

      this._setContainerBackgroundImg(this.images[this.settings.startIndex]);
    }
  }]);

  return Swivel;
})();

window.Swivel = Swivel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zd2l2ZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQU0sTUFBTTtBQUNDLFdBRFAsTUFBTSxDQUNFLE1BQU0sRUFBRSxPQUFPLEVBQUU7MEJBRHpCLE1BQU07O0FBRVIsUUFBSSxJQUFJLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztBQUN6QixRQUFJLENBQUMsUUFBUSxHQUFHO0FBQ2QsdUJBQWlCLEVBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxTQUFTO0FBQ2hELGdCQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsSUFBWSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUN4RSxZQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFBb0IsSUFBSTtBQUMzQyxXQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBc0IsSUFBSTtLQUM1QyxDQUFDO0FBQ0YsUUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFDLFFBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7R0FDMUU7O2VBWEcsTUFBTTs7V0FhSSx3QkFBQyxNQUFNLEVBQUU7Ozs7QUFFckIsVUFBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUMzQixjQUFRLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2hELGNBQVEsQ0FBQyxNQUFNLEdBQUcsVUFBQyxDQUFDLEVBQUs7QUFDdkIsY0FBSyxlQUFlLEdBQUcsSUFBSSxDQUFDO0FBQzVCLGNBQUssUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFLLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDL0QsY0FBSyxRQUFRLENBQUMsS0FBSyxHQUFHLE1BQUssUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUM1RCxZQUFJLE1BQUssVUFBVSxFQUFFO0FBQUUsZ0JBQUssR0FBRyxFQUFFLENBQUE7U0FBRSxDQUFDO09BQ3JDLENBQUM7O0FBRUYsVUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3RDLFlBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQyxrQkFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztPQUM1Qjs7QUFFRCxhQUFPLFVBQVUsQ0FBQztLQUNuQjs7O1dBRXlCLG9DQUFDLEdBQUcsRUFBRTtBQUM5QixVQUFJLEdBQUcsS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFO0FBQUUsZUFBTztPQUFFO0FBQzFDLFVBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBQ3hCLFVBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLG9CQUFvQixDQUFDO0tBQ3ZFOzs7V0FFZ0IsNkJBQUc7QUFDbEIsVUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUVoQixVQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsRUFBRTtBQUN4QyxZQUFJLE1BQU0sR0FBRyxDQUFDO1lBQ1YsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtZQUN0RCxZQUFZLEdBQUcsV0FBVyxDQUFDO0FBQy9CLGVBQU8sSUFBSSxFQUFFO0FBQ1gsY0FBSSxDQUFDLENBQUMsT0FBTyxJQUFJLFlBQVksRUFBRTtBQUFFLGtCQUFNO1dBQUU7QUFDekMsc0JBQVksSUFBSSxXQUFXLENBQUM7QUFDNUIsZ0JBQU0sRUFBRSxDQUFDO1NBQ1Y7QUFDRCxZQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO09BQ3RELENBQUM7O0FBRUYsVUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRTtBQUFFLGVBQU87T0FBRTtBQUMvQyxZQUFNLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDeEQsWUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsWUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsRUFBRTtBQUNmLGdCQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ2pDLE1BQU07QUFDTCxjQUFJLGlCQUFpQixHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07Y0FDNUMsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFLEdBQUcsaUJBQWlCLENBQUM7QUFDaEQsaUJBQU8sSUFBSSxFQUFFO0FBQ1gsZ0JBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxpQkFBaUIsRUFBRTtBQUFFLG9CQUFNO2FBQUU7QUFDM0MsNkJBQWlCLElBQUksaUJBQWlCLENBQUM7QUFDdkMsa0JBQU0sRUFBRSxDQUFDO1dBQ1Y7U0FDRjtBQUNELFlBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7T0FDdEQsQ0FBQyxDQUFDO0tBQ0o7OztXQUVFLGVBQUc7QUFDSixVQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtBQUN6QixZQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztBQUN2QixlQUFPO09BQ1I7O0FBRUQsVUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7O0FBRXpCLFVBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDMUQsVUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzs7QUFFeEQsVUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0tBQ3hFOzs7U0FwRkcsTUFBTTs7O0FBdUZaLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDIiwiZmlsZSI6InNyYy9zd2l2ZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTd2l2ZWwge1xuICBjb25zdHJ1Y3RvcihpbWFnZXMsIG9wdGlvbnMpIHtcbiAgICBsZXQgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5zZXR0aW5ncyA9IHtcbiAgICAgIGNvbnRhaW5lclNlbGVjdG9yOiBvcHRzLmNvbnRhaW5lcklkIHx8ICcjc3dpdmVsJyxcbiAgICAgIHN0YXJ0SW5kZXg6IG9wdHMuc3RhcnRJbmRleCAgICAgICAgIHx8IE1hdGgucm91bmQoaW1hZ2VzLmxlbmd0aCAvIDIpIC0gMSxcbiAgICAgIGhlaWdodDogb3B0cy5oZWlnaHQgICAgICAgICAgICAgICAgIHx8IG51bGwsXG4gICAgICB3aWR0aDogb3B0cy53aWR0aCAgICAgICAgICAgICAgICAgICB8fCBudWxsLFxuICAgIH07XG4gICAgdGhpcy5pbWFnZXMgPSB0aGlzLl9wcmVsb2FkSW1hZ2VzKGltYWdlcyk7XG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc2V0dGluZ3MuY29udGFpbmVyU2VsZWN0b3IpO1xuICB9XG5cbiAgX3ByZWxvYWRJbWFnZXMoaW1hZ2VzKSB7XG4gICAgLy8gcHJlbG9hZCBzdGFydEluZGV4IGltYWdlIGZpcnN0XG4gICAgbGV0IHN0YXJ0SW1nID0gbmV3IEltYWdlKCk7XG4gICAgc3RhcnRJbWcuc3JjID0gaW1hZ2VzW3RoaXMuc2V0dGluZ3Muc3RhcnRJbmRleF07XG4gICAgc3RhcnRJbWcub25sb2FkID0gKGUpID0+IHtcbiAgICAgIHRoaXMuX3N0YXJ0SW1nTG9hZGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0dGluZ3MuaGVpZ2h0ID0gdGhpcy5zZXR0aW5ncy5oZWlnaHQgfHwgZS50YXJnZXQuaGVpZ2h0O1xuICAgICAgdGhpcy5zZXR0aW5ncy53aWR0aCA9IHRoaXMuc2V0dGluZ3Mud2lkdGggfHwgZS50YXJnZXQud2lkdGg7XG4gICAgICBpZiAodGhpcy5fcnVuT25Mb2FkKSB7IHRoaXMucnVuKCkgfTtcbiAgICB9O1xuXG4gICAgbGV0IGltZ1NvdXJjZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IF8gPSBuZXcgSW1hZ2UoKS5zcmMgPSBpbWFnZXNbaV07XG4gICAgICBpbWdTb3VyY2VzLnB1c2goaW1hZ2VzW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW1nU291cmNlcztcbiAgfVxuXG4gIF9zZXRDb250YWluZXJCYWNrZ3JvdW5kSW1nKHNyYykge1xuICAgIGlmIChzcmMgPT09IHRoaXMuY29udGFpbmVyU3JjKSB7IHJldHVybjsgfVxuICAgIHRoaXMuY29udGFpbmVyU3JjID0gc3JjO1xuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmJhY2tncm91bmQgPSAndXJsKCcgKyBzcmMgKyAnKSBuby1yZXBlYXQgY2VudGVyJztcbiAgfVxuXG4gIF9hZGRFdmVudEhhbmRsZXJzKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuY29udGFpbmVyLm9ubW91c2Vtb3ZlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGxldCBpbWdJZHggPSAwLFxuICAgICAgICAgIHJlZ2lvbldpZHRoID0gc2VsZi5zZXR0aW5ncy53aWR0aCAvIHNlbGYuaW1hZ2VzLmxlbmd0aCxcbiAgICAgICAgICByZWdpb25TdGFydFggPSByZWdpb25XaWR0aDtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGlmIChlLm9mZnNldFggPD0gcmVnaW9uU3RhcnRYKSB7IGJyZWFrOyB9XG4gICAgICAgIHJlZ2lvblN0YXJ0WCArPSByZWdpb25XaWR0aDtcbiAgICAgICAgaW1nSWR4Kys7XG4gICAgICB9XG4gICAgICBzZWxmLl9zZXRDb250YWluZXJCYWNrZ3JvdW5kSW1nKHNlbGYuaW1hZ2VzW2ltZ0lkeF0pO1xuICAgIH07XG5cbiAgICBpZiAoIXdpbmRvdy5EZXZpY2VPcmllbnRhdGlvbkV2ZW50KSB7IHJldHVybjsgfVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VvcmllbnRhdGlvbicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBsZXQgaW1nSWR4ID0gMDtcbiAgICAgIGlmIChlLmJldGEgPiA1MCkge1xuICAgICAgICBpbWdJZHggPSBzZWxmLmltYWdlcy5sZW5ndGggLSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHJlZ2lvbkRlZ3JlZVdpZHRoID0gMTAwIC8gc2VsZi5pbWFnZXMubGVuZ3RoLFxuICAgICAgICAgICAgcmVnaW9uU3RhcnREZWdyZWUgPSAtNTAgKyByZWdpb25EZWdyZWVXaWR0aDtcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICBpZiAoZS5iZXRhIDw9IHJlZ2lvblN0YXJ0RGVncmVlKSB7IGJyZWFrOyB9XG4gICAgICAgICAgcmVnaW9uU3RhcnREZWdyZWUgKz0gcmVnaW9uRGVncmVlV2lkdGg7XG4gICAgICAgICAgaW1nSWR4Kys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNlbGYuX3NldENvbnRhaW5lckJhY2tncm91bmRJbWcoc2VsZi5pbWFnZXNbaW1nSWR4XSk7XG4gICAgfSk7XG4gIH1cblxuICBydW4oKSB7XG4gICAgaWYgKCF0aGlzLl9zdGFydEltZ0xvYWRlZCkge1xuICAgICAgdGhpcy5fcnVuT25Mb2FkID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9hZGRFdmVudEhhbmRsZXJzKCk7XG5cbiAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSB0aGlzLnNldHRpbmdzLmhlaWdodCArICdweCc7XG4gICAgdGhpcy5jb250YWluZXIuc3R5bGUud2lkdGggPSB0aGlzLnNldHRpbmdzLndpZHRoICsgJ3B4JztcblxuICAgIHRoaXMuX3NldENvbnRhaW5lckJhY2tncm91bmRJbWcodGhpcy5pbWFnZXNbdGhpcy5zZXR0aW5ncy5zdGFydEluZGV4XSk7XG4gIH1cbn1cblxud2luZG93LlN3aXZlbCA9IFN3aXZlbDtcbiJdfQ==
//# sourceMappingURL=swivel.js.map
