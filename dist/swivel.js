'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Swivel = (function () {
  function Swivel(images, options) {
    _classCallCheck(this, Swivel);

    var opts = options || {};
    this.settings = {
      containerId: opts.containerId || "swivel",
      startIndex: opts.startIndex || Math.round(images.length / 2) - 1,
      height: opts.height || null,
      width: opts.width || null
    };
    this.images = this._loadImages(images);
    this.container = document.getElementById(this.settings.containerId);
  }

  _createClass(Swivel, [{
    key: '_loadImages',
    value: function _loadImages(images) {
      var _this = this;

      var htmlImages = [];
      var imgObj = undefined;
      // Load startIndex image first
      imgObj = new Image();
      imgObj.src = images[this.settings.startIndex];
      imgObj.onload = function (e) {
        _this.settings.height = _this.settings.height || e.target.height;
        _this.settings.width = _this.settings.width || e.target.width;
      };

      for (var i = 0; i < images.length; i++) {
        imgObj = new Image();
        imgObj.src = images[i];
        htmlImages.push(imgObj);
      }

      return htmlImages;
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
        self._setContainerBackgroundImg(self.images[imgIdx].src);
      };
    }
  }, {
    key: 'run',
    value: function run() {
      this._addEventHandlers();

      //TODO: wait for start image to load
      this.container.style.height = this.settings.height + 'px';
      this.container.style.width = this.settings.width + 'px';

      this._setContainerBackgroundImg(this.images[this.settings.startIndex].src);
    }
  }]);

  return Swivel;
})();

window.Swivel = Swivel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zd2l2ZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQU0sTUFBTTtBQUNDLFdBRFAsTUFBTSxDQUNFLE1BQU0sRUFBRSxPQUFPLEVBQUU7MEJBRHpCLE1BQU07O0FBRVIsUUFBSSxJQUFJLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztBQUN6QixRQUFJLENBQUMsUUFBUSxHQUFHO0FBQ2QsaUJBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLFFBQVE7QUFDekMsZ0JBQVUsRUFBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ2pFLFlBQU0sRUFBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUk7QUFDaEMsV0FBSyxFQUFRLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSTtLQUNoQyxDQUFDO0FBQ0YsUUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZDLFFBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0dBQ3JFOztlQVhHLE1BQU07O1dBYUMscUJBQUMsTUFBTSxFQUFFOzs7QUFDbEIsVUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFVBQUksTUFBTSxZQUFBLENBQUM7O0FBRVgsWUFBTSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7QUFDckIsWUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM5QyxZQUFNLENBQUMsTUFBTSxHQUFHLFVBQUMsQ0FBQyxFQUFLO0FBQ3JCLGNBQUssUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFLLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDL0QsY0FBSyxRQUFRLENBQUMsS0FBSyxHQUFHLE1BQUssUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztPQUM3RCxDQUFDOztBQUVGLFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3RDLGNBQU0sR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0FBQ3JCLGNBQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLGtCQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO09BQ3pCOztBQUVELGFBQU8sVUFBVSxDQUFDO0tBQ25COzs7V0FFeUIsb0NBQUMsR0FBRyxFQUFFO0FBQzlCLFVBQUksR0FBRyxLQUFLLElBQUksQ0FBQyxZQUFZLEVBQUU7QUFBRSxlQUFPO09BQUU7QUFDMUMsVUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7QUFDeEIsVUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsb0JBQW9CLENBQUM7S0FDdkU7OztXQUVnQiw2QkFBRztBQUNsQixVQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDaEIsVUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLEVBQUU7QUFDeEMsWUFBSSxNQUFNLEdBQUcsQ0FBQztZQUNWLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07WUFDdEQsWUFBWSxHQUFHLFdBQVcsQ0FBQztBQUMvQixlQUFPLElBQUksRUFBRTtBQUNYLGNBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxZQUFZLEVBQUU7QUFBRSxrQkFBTTtXQUFFO0FBQ3pDLHNCQUFZLElBQUksV0FBVyxDQUFDO0FBQzVCLGdCQUFNLEVBQUUsQ0FBQztTQUNWO0FBQ0QsWUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDMUQsQ0FBQztLQUNIOzs7V0FFRSxlQUFHO0FBQ0osVUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7OztBQUd6QixVQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQzFELFVBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7O0FBRXhELFVBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDNUU7OztTQTlERyxNQUFNOzs7QUFpRVosTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMiLCJmaWxlIjoic3JjL3N3aXZlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFN3aXZlbCB7XG4gIGNvbnN0cnVjdG9yKGltYWdlcywgb3B0aW9ucykge1xuICAgIGxldCBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLnNldHRpbmdzID0ge1xuICAgICAgY29udGFpbmVySWQ6IG9wdHMuY29udGFpbmVySWQgfHwgXCJzd2l2ZWxcIixcbiAgICAgIHN0YXJ0SW5kZXg6ICBvcHRzLnN0YXJ0SW5kZXggfHwgTWF0aC5yb3VuZChpbWFnZXMubGVuZ3RoIC8gMikgLSAxLFxuICAgICAgaGVpZ2h0OiAgICAgIG9wdHMuaGVpZ2h0IHx8IG51bGwsXG4gICAgICB3aWR0aDogICAgICAgb3B0cy53aWR0aCB8fCBudWxsLFxuICAgIH07XG4gICAgdGhpcy5pbWFnZXMgPSB0aGlzLl9sb2FkSW1hZ2VzKGltYWdlcyk7XG4gICAgdGhpcy5jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnNldHRpbmdzLmNvbnRhaW5lcklkKTtcbiAgfVxuXG4gIF9sb2FkSW1hZ2VzKGltYWdlcykge1xuICAgIGxldCBodG1sSW1hZ2VzID0gW107XG4gICAgbGV0IGltZ09iajtcbiAgICAvLyBMb2FkIHN0YXJ0SW5kZXggaW1hZ2UgZmlyc3RcbiAgICBpbWdPYmogPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWdPYmouc3JjID0gaW1hZ2VzW3RoaXMuc2V0dGluZ3Muc3RhcnRJbmRleF07XG4gICAgaW1nT2JqLm9ubG9hZCA9IChlKSA9PiB7XG4gICAgICB0aGlzLnNldHRpbmdzLmhlaWdodCA9IHRoaXMuc2V0dGluZ3MuaGVpZ2h0IHx8IGUudGFyZ2V0LmhlaWdodDtcbiAgICAgIHRoaXMuc2V0dGluZ3Mud2lkdGggPSB0aGlzLnNldHRpbmdzLndpZHRoIHx8IGUudGFyZ2V0LndpZHRoO1xuICAgIH07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaW1nT2JqID0gbmV3IEltYWdlKCk7XG4gICAgICBpbWdPYmouc3JjID0gaW1hZ2VzW2ldO1xuICAgICAgaHRtbEltYWdlcy5wdXNoKGltZ09iaik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGh0bWxJbWFnZXM7XG4gIH1cblxuICBfc2V0Q29udGFpbmVyQmFja2dyb3VuZEltZyhzcmMpIHtcbiAgICBpZiAoc3JjID09PSB0aGlzLmNvbnRhaW5lclNyYykgeyByZXR1cm47IH1cbiAgICB0aGlzLmNvbnRhaW5lclNyYyA9IHNyYztcbiAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kID0gJ3VybCgnICsgc3JjICsgJykgbm8tcmVwZWF0IGNlbnRlcic7XG4gIH1cblxuICBfYWRkRXZlbnRIYW5kbGVycygpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5jb250YWluZXIub25tb3VzZW1vdmUgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgbGV0IGltZ0lkeCA9IDAsXG4gICAgICAgICAgcmVnaW9uV2lkdGggPSBzZWxmLnNldHRpbmdzLndpZHRoIC8gc2VsZi5pbWFnZXMubGVuZ3RoLFxuICAgICAgICAgIHJlZ2lvblN0YXJ0WCA9IHJlZ2lvbldpZHRoO1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgaWYgKGUub2Zmc2V0WCA8PSByZWdpb25TdGFydFgpIHsgYnJlYWs7IH1cbiAgICAgICAgcmVnaW9uU3RhcnRYICs9IHJlZ2lvbldpZHRoO1xuICAgICAgICBpbWdJZHgrKztcbiAgICAgIH1cbiAgICAgIHNlbGYuX3NldENvbnRhaW5lckJhY2tncm91bmRJbWcoc2VsZi5pbWFnZXNbaW1nSWR4XS5zcmMpO1xuICAgIH07XG4gIH1cblxuICBydW4oKSB7XG4gICAgdGhpcy5fYWRkRXZlbnRIYW5kbGVycygpO1xuXG4gICAgLy9UT0RPOiB3YWl0IGZvciBzdGFydCBpbWFnZSB0byBsb2FkXG4gICAgdGhpcy5jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5zZXR0aW5ncy5oZWlnaHQgKyAncHgnO1xuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLndpZHRoID0gdGhpcy5zZXR0aW5ncy53aWR0aCArICdweCc7XG5cbiAgICB0aGlzLl9zZXRDb250YWluZXJCYWNrZ3JvdW5kSW1nKHRoaXMuaW1hZ2VzW3RoaXMuc2V0dGluZ3Muc3RhcnRJbmRleF0uc3JjKTtcbiAgfVxufVxuXG53aW5kb3cuU3dpdmVsID0gU3dpdmVsO1xuIl19
//# sourceMappingURL=swivel.js.map
