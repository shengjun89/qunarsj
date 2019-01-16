require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"carouselcomponent/CarouselComponent":[function(require,module,exports){

/*
	 * USING THE CAROUSELCOMPONENT

	 * Require the module
	CarouselComponent = require "CarouselComponent"

	myCarousel = new CarouselComponent
		 * Item cells
		itemCount: <number>
		rounded: <boolean>
		itemMargin: <number>
		itemBorderRadius: <number>
		itemWidth: <number>
		itemHeight: <number>
		smallItemWidth: <number>
		smallItemHeight: <number>

		 * Labels
		title: <string>
		link: <string>
		captions: <array of strings>
		subcaptions: <array of strings>

		 * Layout
		margins: <array of numbers> ([topMargin, rightMargin, bottomMargin, leftMargin])
		wrap: <boolean>
		sideCaptions: <boolean>
		topAlignSideCaptions: <boolean>

		 * Hero-specific controls
		heroCaptionAlign: <string> ("left" | "center" | "right")
		centerheroItem: <boolean>
		sideHeroCaption: <boolean>
		topAlignHeroCaption: <boolean>

		 * Colors
		boxColor: <string> (hex or rgba)
		iconColor: <string> (hex or rgba)
		titleColor: <string> (hex or rgba)
		linkColor: <string> (hex or rgba)
		captionColor: <string> (hex or rgba)
		subcaptionColor: <string> (hex or rgba)

		 * Typography
		fontFamily: <string>
		titleFontSize: <number>
		titleFontWeight: <number>
		titleMargin: <number>
		linkFontSize: <number>
		linkFontWeight: <number>
		captionFontSize: <number>
		captionFontWeight: <number>
		captionMargin: <number>
		captionMaxHeight: <number>
		subcaptionFontSize: <number>
		subcaptionFontWeight: <number>
		subcaptionMargin: <number>
		subcaptionMaxHeight: <number>
		titleAlign: <string> ("left" | "center" | "right")
		captionAlign: <string> ("left" | "center" | "right")

		 * Icons
		icons: <boolean>
		iconBorderRadius: <number>
		iconSize: <number>
		iconMargin: <number>

		 * Image assets
		imagePrefix: <string> ("images" directory assumed)
		imageSuffix: <string>
		iconPrefix: <string> ("images" directory assumed)
		iconSuffix: <string>

		 * Actions
		itemActions: <array of actions>
		linkAction: <action>

		 * View CarouselComponent frame
		debug: <boolean>

		 * Other
		forceScrolling: <boolean>

	 * Using side captions
	Specify sideCaptions: true to vertically align captions alongside cells rather than underneath. Specify topAlignSideCaptions: true to align side captions to the tops of their adjacent cells.

	 * Using the wrap feature
	 * If you specify wrap: true, the first item in the carousel will display on its own row as a "hero" item. This item can be controlled independently of the rest of the carousel. Secondary cells will be sized according to smallItemWidth and smallItemHeight rather than itemWidth and itemHeight.

	 * Using icons
	 * Icons can be displayed under each item's cell. Specify icons: true to enable this. Enabling icons prevents the use of side captions.

	 * Using images
	 * All images are assumed to live in the images directory and be numbered with an initial index of zero. You may supply both a prefix and suffix. If your item images are located in an "items" directory within "images" and named:

	cell0.png
	cell1.png
	cell2.png

	 * then your imagePrefix would be "items/cell" and your suffix would be "png".

	 * Icon assets work the same way.

	 * Do not include the images directory in imagePrefix or iconPrefix.

	 * Assigning margins
	 * Margins are supplied in the same order as for CSS. margins: [40, 10, 15, 5] will provide a top margin of 40, a right margin of 10, a bottom margin of 15 and a left margin of 5. The first item is positioned according to the top margin; however the title and link are positioned relative to the first item using titleMargin.

	 * Scrolling
	 * The CarouselComponent will attempt to provide scrolling only when its content extends beyond the visible area. To enforce scrolling regardless, specify forceScrolling: true.

	 * Assigning actions
	 * The link button in the upper right of the carousel can be given an action, as can individual item cells. The link will only appear if you supply a string with link: <string> and the CarouselComponent includes at least two items. Item actions should be arranged in a comma-separated array, one action per line.
	linkAction: -> print "link"
	itemActions: [
		-> print "1",
		-> print "second",
		-> print "item the third"
	]

	 * Referring to parts of the CarouselComponent
	 * The CarouselComponent contains a PageComponent which can be accessed with .row. Items and their components can be accessed with the .items array. .heroItem is available when wrap is set to true.
	print myCarousel.row.currentPage
	print myCarousel.heroItem?.caption?.text
	print myCarousel.items[0].textBlock
	print myCarousel.items[0].cell
 */
var CarouselComponent, defaults, rounded,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

defaults = {
  itemCount: 3,
  debug: false,
  rounded: false,
  wrap: false,
  sideCaptions: false,
  captionAlign: "left",
  titleAlign: "left",
  topAlignSideCaptions: false,
  centerheroItem: false,
  heroCaptionAlign: "left",
  sideHeroCaption: false,
  topAlignHeroCaption: true,
  icons: false,
  clip: true,
  forceScrolling: false,
  margins: [40, 0, 0, 0],
  itemMargin: 12,
  itemBorderRadius: 10,
  itemWidth: 160,
  itemHeight: 120,
  smallItemWidth: 80,
  smallItemHeight: 60,
  titleFontSize: 20,
  titleFontWeight: 800,
  titleMargin: 4,
  linkFontSize: 16,
  linkFontWeight: 400,
  captionFontSize: 18,
  captionFontWeight: 400,
  captionMaxHeight: 100,
  subcaptionFontSize: 16,
  subcaptionFontWeight: 400,
  subcaptionMaxHeight: 100,
  iconBorderRadius: 10,
  iconSize: 40,
  iconMargin: 8,
  captionMargin: 10,
  subcaptionMargin: 0,
  backgroundColor: "clear",
  boxColor: "#F5F5F5",
  iconColor: "",
  titleColor: "#F5F5F5",
  linkColor: "",
  captionColor: "",
  subcaptionColor: "",
  fontFamily: "",
  title: "Carousel Title",
  link: "",
  imagePrefix: "",
  imageSuffix: "png",
  iconPrefix: "",
  iconSuffix: "png",
  captions: [],
  subcaptions: [],
  itemActions: [],
  linkAction: function() {}
};

rounded = {
  itemWidth: 120,
  itemHeight: 120,
  smallItemWidth: 60,
  smallItemHeight: 60
};

CarouselComponent = (function(superClass) {
  extend(CarouselComponent, superClass);

  function CarouselComponent(options) {
    var bottomMargin, createItem, heroItemContainer, i, j, leftMargin, link, margin, noop, offset, ref, ref1, ref2, ref3, rightMargin, row, title, topMargin;
    this.options = options != null ? options : {};
    this.options = _.assign({}, defaults, this.options);
    if (this.options.rounded === true) {
      this.options = _.assign({}, rounded, this.options);
    }
    CarouselComponent.__super__.constructor.call(this, this.options);
    noop = function() {};
    this.items = [];
    ref = this.options.margins, topMargin = ref[0], rightMargin = ref[1], bottomMargin = ref[2], leftMargin = ref[3];
    this.clip = this.options.clip;
    this.backgroundColor = this.options.backgroundColor;
    this.width = this.options.width || Screen.width;
    this.x = this.options.x;
    if (this.options.debug === true) {
      this.backgroundColor = "rgba(254, 163, 32, 0.25)";
    }
    if (this.options.icons === true) {
      this.options.sideCaptions = "none";
    }
    offset = this.options.wrap === true ? 1 : 0;
    margin = new Layer({
      parent: this,
      name: "margin",
      width: this.width,
      height: 1,
      visible: false
    });
    this.margin = margin;
    title = new TextLayer({
      parent: this,
      x: leftMargin,
      text: this.options.title,
      fontSize: this.options.titleFontSize,
      color: this.options.titleColor,
      textAlign: this.options.titleAlign,
      fontWeight: this.options.titleFontWeight,
      width: this.width - leftMargin - rightMargin
    });
    this.title = title;
    title.maxY = topMargin - this.options.titleMargin;
    if (this.options.fontFamily !== "") {
      title.fontFamily = this.options.fontFamily;
    }
    if (this.options.link !== "") {
      link = new TextLayer({
        parent: this,
        text: this.options.link,
        fontSize: this.options.titleFontSize,
        originX: 1,
        originY: 1,
        autoSize: true,
        autoSizeHeight: true,
        color: this.options.linkColor || this.options.captionColor || this.options.titleColor,
        textAlign: "right",
        fontWeight: this.options.linkFontWeight,
        x: Align.right(-rightMargin),
        y: title.y,
        scale: this.options.linkFontSize / this.options.titleFontSize
      });
      this.link = link;
      if (this.options.fontFamily !== "") {
        link.fontFamily = this.options.fontFamily;
      }
      if (this.options.linkAction !== noop) {
        link.onClick((function(_this) {
          return function() {
            return _this.options.linkAction();
          };
        })(this));
      }
    }
    createItem = (function(_this) {
      return function(i, parent, hero) {
        var block, caption, icon, indexOffset, item, itemHeight, itemWidth, subcaption, textBlock;
        if (i == null) {
          i = 0;
        }
        if (parent == null) {
          parent = null;
        }
        if (hero == null) {
          hero = false;
        }
        if (hero === false && _this.options.wrap === true) {
          indexOffset = 1;
          itemWidth = _this.options.smallItemWidth;
          itemHeight = _this.options.smallItemHeight;
        } else {
          indexOffset = 0;
          itemWidth = _this.options.itemWidth;
          itemHeight = _this.options.itemHeight;
        }
        item = new Layer({
          name: "item" + (i + indexOffset),
          width: itemWidth,
          height: itemHeight,
          backgroundColor: "clear",
          clip: false
        });
        if (parent instanceof PageComponent) {
          parent.addPage(item);
        } else {
          item.parent = parent;
        }
        block = new Layer({
          parent: item,
          name: "block" + (i + indexOffset),
          width: itemWidth,
          height: itemHeight,
          backgroundColor: _this.options.boxColor,
          borderRadius: _this.options.itemBorderRadius,
          image: "images/" + _this.options.imagePrefix + (i + indexOffset) + "." + _this.options.imageSuffix,
          style: {
            "background-position": "center center",
            "background-size": "cover"
          }
        });
        item.cell = block;
        if (_this.options.itemActions[i + indexOffset] !== noop && _this.options.itemActions[i + indexOffset] !== void 0) {
          item.onClick(function() {
            if (parent.parent.isDragging) {
              return;
            }
            return _this.options.itemActions[i + indexOffset]();
          });
        }
        if (_this.options.icons === true) {
          icon = new Layer({
            parent: item,
            name: "icon" + (i + indexOffset),
            width: _this.options.iconSize,
            height: _this.options.iconSize,
            backgroundColor: _this.options.iconColor || _this.options.boxColor,
            borderRadius: _this.options.iconBorderRadius,
            y: block.maxY + _this.options.iconMargin,
            image: "images/" + _this.options.iconPrefix + (i + indexOffset) + "." + _this.options.iconSuffix,
            style: {
              "background-position": "center center",
              "background-size": "cover"
            }
          });
          item.icon = icon;
        }
        textBlock = new Layer({
          parent: item,
          name: "textBlock" + (i + indexOffset),
          width: _this.options.icons === true ? itemWidth - _this.options.iconSize - _this.options.iconMargin : itemWidth,
          height: item.height,
          backgroundColor: "clear",
          x: _this.captionAlignHorizontal((_this.options.icons === true ? _this.options.iconSize : block.width), hero)
        });
        item.textBlock = textBlock;
        caption = new TextLayer({
          parent: textBlock,
          name: "caption" + (i + indexOffset),
          width: textBlock.width,
          color: _this.options.captionColor || _this.options.titleColor,
          text: _this.options.captions[i + indexOffset] || "",
          textAlign: "left",
          fontWeight: _this.options.captionFontWeight,
          fontSize: _this.options.captionFontSize
        });
        item.caption = caption;
        if (caption.height > _this.options.captionMaxHeight) {
          caption.height = _this.options.captionMaxHeight;
          caption.truncate = true;
        }
        if (_this.options.fontFamily !== "") {
          caption.fontFamily = _this.options.fontFamily;
        }
        if (_this.options.subcaptions !== []) {
          subcaption = new TextLayer({
            parent: textBlock,
            name: "subcaption" + (i + indexOffset),
            width: textBlock.width,
            color: _this.options.subcaptionColor || _this.options.captionColor || _this.options.titleColor,
            text: _this.options.subcaptions[i + indexOffset] || "",
            textAlign: "left",
            fontWeight: _this.options.subcaptionFontWeight,
            fontSize: _this.options.subcaptionFontSize,
            letterSpacing: -0.6,
            y: caption.maxY + _this.options.subcaptionMargin
          });
          item.subcaption = subcaption;
          if (subcaption.height > _this.options.subcaptionMaxHeight) {
            subcaption.height = _this.options.subcaptionMaxHeight;
            subcaption.truncate = true;
          }
          if (_this.options.fontFamily !== "") {
            subcaption.fontFamily = _this.options.fontFamily;
          }
        }
        if (_this.options.rounded === true) {
          block.borderRadius = Math.max(_this.options.itemWidth, _this.options.itemHeight) / 2;
        }
        caption.textAlign = _this.options.captionAlign;
        if (subcaption != null) {
          subcaption.textAlign = _this.options.captionAlign;
        }
        _this.items.push(item);
        textBlock.height = textBlock.contentFrame().height;
        textBlock.y = _this.captionAlignVertical(block.height, hero);
        item.height = item.contentFrame().height;
        item.width = item.contentFrame().width;
        if (_this.items.indexOf(item) > offset) {
          return item.x = item.x + _this.options.itemMargin;
        }
      };
    })(this);
    if (this.options.wrap === true) {
      heroItemContainer = new Layer({
        parent: this,
        name: "heroItemContainer",
        y: topMargin,
        x: this.options.centerheroItem === true ? Align.center : leftMargin,
        backgroundColor: "clear"
      });
      createItem(0, heroItemContainer, true);
      heroItemContainer.height = heroItemContainer.contentFrame().height;
      heroItemContainer.width = heroItemContainer.contentFrame().width;
      this.heroItem = heroItemContainer.children[0];
      this.heroItem.name = "heroItem";
      this.heroItem.caption.textAlign = this.options.heroCaptionAlign;
      if ((ref1 = this.heroItem.subcaption) != null) {
        ref1.textAlign = this.options.heroCaptionAlign;
      }
    }
    row = new PageComponent({
      parent: this,
      name: "row",
      y: this.options.wrap === true ? heroItemContainer.maxY + this.options.itemMargin : topMargin,
      scrollVertical: false,
      scrollHorizontal: true,
      velocityThreshold: 0.1,
      clip: false,
      originX: 0,
      contentInset: {
        top: 0,
        right: rightMargin,
        bottom: 0,
        left: leftMargin
      }
    });
    this.row = row;
    if (this.options.itemCount < 2) {
      row.scrollHorizontal = false;
      if (link != null) {
        link.destroy();
      }
    }
    for (i = j = 0, ref2 = this.options.itemCount - offset; 0 <= ref2 ? j < ref2 : j > ref2; i = 0 <= ref2 ? ++j : --j) {
      createItem(i, row, false);
    }
    row.onSwipeLeft((function(_this) {
      return function() {
        var maxPage;
        if (_this.options.forceScrolling !== true && _this.checkIfNeedsScrolling(row)) {
          maxPage = _this.options.itemCount - Math.floor(_this.width / (_this.options.itemWidth + _this.options.itemMargin)) - offset;
          if (row.content.maxX < _this.maxX) {
            return row.snapToPage(_this.items[maxPage]);
          }
        }
      };
    })(this));
    row.width = (ref3 = row.content.children[0]) != null ? ref3.width : void 0;
    row.content.width = row.content.contentFrame().width;
    row.content.height = row.content.contentFrame().height;
    row.height = row.contentFrame().height;
    row.content.clip = false;
    row.scrollHorizontal = this.checkIfNeedsScrolling(row);
    this.height = this.contentFrame().height + bottomMargin;
  }

  CarouselComponent.prototype.checkIfNeedsScrolling = function(layer) {
    var needsScrolling, ref;
    if (layer == null) {
      layer = null;
    }
    if (this.options.forceScrolling === true) {
      needsScrolling = true;
    } else if (((ref = layer.content) != null ? ref.contentFrame().width : void 0) > this.width) {
      needsScrolling = true;
    } else {
      needsScrolling = false;
    }
    return needsScrolling;
  };

  CarouselComponent.prototype.captionAlignVertical = function(itemHeight, hero) {
    var align;
    if (itemHeight == null) {
      itemHeight = 0;
    }
    if (hero == null) {
      hero = false;
    }
    align = itemHeight + this.options.captionMargin;
    if (this.options.icons === true) {
      align = itemHeight + this.options.iconMargin;
    } else if (hero === true) {
      if (this.options.sideHeroCaption === true) {
        if (this.options.topAlignHeroCaption === true) {
          align = Align.top;
        } else {
          align = Align.center;
        }
      }
    } else if (this.options.sideCaptions === true) {
      if (this.options.topAlignCaptions === true) {
        align = Align.top;
      } else {
        align = Align.center;
      }
    }
    return align;
  };

  CarouselComponent.prototype.captionAlignHorizontal = function(itemWidth, hero) {
    var align;
    if (itemWidth == null) {
      itemWidth = 0;
    }
    if (hero == null) {
      hero = false;
    }
    align = Align.left;
    if (this.options.icons === true) {
      align = itemWidth + this.options.iconMargin;
    } else if (hero === true) {
      if (this.options.sideHeroCaption === true) {
        align = itemWidth + this.options.captionMargin;
      }
    } else if (this.options.sideCaptions === true) {
      align = itemWidth + this.options.captionMargin;
    } else if (this.options.sideCaptions === true) {
      align = itemWidth + this.options.captionMargin;
    }
    return align;
  };

  return CarouselComponent;

})(Layer);

module.exports = CarouselComponent;


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3NoZW5nanVuL0Rlc2t0b3AvZnJhbWVyL2xvY2FscXVuYXJzai5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9zaGVuZ2p1bi9EZXNrdG9wL2ZyYW1lci9sb2NhbHF1bmFyc2ouZnJhbWVyL21vZHVsZXMvY2Fyb3VzZWxjb21wb25lbnQvQ2Fyb3VzZWxDb21wb25lbnQuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIiwiIyMjXG5cdCMgVVNJTkcgVEhFIENBUk9VU0VMQ09NUE9ORU5UXG5cblx0IyBSZXF1aXJlIHRoZSBtb2R1bGVcblx0Q2Fyb3VzZWxDb21wb25lbnQgPSByZXF1aXJlIFwiQ2Fyb3VzZWxDb21wb25lbnRcIlxuXG5cdG15Q2Fyb3VzZWwgPSBuZXcgQ2Fyb3VzZWxDb21wb25lbnRcblx0XHQjIEl0ZW0gY2VsbHNcblx0XHRpdGVtQ291bnQ6IDxudW1iZXI+XG5cdFx0cm91bmRlZDogPGJvb2xlYW4+XG5cdFx0aXRlbU1hcmdpbjogPG51bWJlcj5cblx0XHRpdGVtQm9yZGVyUmFkaXVzOiA8bnVtYmVyPlxuXHRcdGl0ZW1XaWR0aDogPG51bWJlcj5cblx0XHRpdGVtSGVpZ2h0OiA8bnVtYmVyPlxuXHRcdHNtYWxsSXRlbVdpZHRoOiA8bnVtYmVyPlxuXHRcdHNtYWxsSXRlbUhlaWdodDogPG51bWJlcj5cblxuXHRcdCMgTGFiZWxzXG5cdFx0dGl0bGU6IDxzdHJpbmc+XG5cdFx0bGluazogPHN0cmluZz5cblx0XHRjYXB0aW9uczogPGFycmF5IG9mIHN0cmluZ3M+XG5cdFx0c3ViY2FwdGlvbnM6IDxhcnJheSBvZiBzdHJpbmdzPlxuXG5cdFx0IyBMYXlvdXRcblx0XHRtYXJnaW5zOiA8YXJyYXkgb2YgbnVtYmVycz4gKFt0b3BNYXJnaW4sIHJpZ2h0TWFyZ2luLCBib3R0b21NYXJnaW4sIGxlZnRNYXJnaW5dKVxuXHRcdHdyYXA6IDxib29sZWFuPlxuXHRcdHNpZGVDYXB0aW9uczogPGJvb2xlYW4+XG5cdFx0dG9wQWxpZ25TaWRlQ2FwdGlvbnM6IDxib29sZWFuPlxuXG5cdFx0IyBIZXJvLXNwZWNpZmljIGNvbnRyb2xzXG5cdFx0aGVyb0NhcHRpb25BbGlnbjogPHN0cmluZz4gKFwibGVmdFwiIHwgXCJjZW50ZXJcIiB8IFwicmlnaHRcIilcblx0XHRjZW50ZXJoZXJvSXRlbTogPGJvb2xlYW4+XG5cdFx0c2lkZUhlcm9DYXB0aW9uOiA8Ym9vbGVhbj5cblx0XHR0b3BBbGlnbkhlcm9DYXB0aW9uOiA8Ym9vbGVhbj5cblxuXHRcdCMgQ29sb3JzXG5cdFx0Ym94Q29sb3I6IDxzdHJpbmc+IChoZXggb3IgcmdiYSlcblx0XHRpY29uQ29sb3I6IDxzdHJpbmc+IChoZXggb3IgcmdiYSlcblx0XHR0aXRsZUNvbG9yOiA8c3RyaW5nPiAoaGV4IG9yIHJnYmEpXG5cdFx0bGlua0NvbG9yOiA8c3RyaW5nPiAoaGV4IG9yIHJnYmEpXG5cdFx0Y2FwdGlvbkNvbG9yOiA8c3RyaW5nPiAoaGV4IG9yIHJnYmEpXG5cdFx0c3ViY2FwdGlvbkNvbG9yOiA8c3RyaW5nPiAoaGV4IG9yIHJnYmEpXG5cblx0XHQjIFR5cG9ncmFwaHlcblx0XHRmb250RmFtaWx5OiA8c3RyaW5nPlxuXHRcdHRpdGxlRm9udFNpemU6IDxudW1iZXI+XG5cdFx0dGl0bGVGb250V2VpZ2h0OiA8bnVtYmVyPlxuXHRcdHRpdGxlTWFyZ2luOiA8bnVtYmVyPlxuXHRcdGxpbmtGb250U2l6ZTogPG51bWJlcj5cblx0XHRsaW5rRm9udFdlaWdodDogPG51bWJlcj5cblx0XHRjYXB0aW9uRm9udFNpemU6IDxudW1iZXI+XG5cdFx0Y2FwdGlvbkZvbnRXZWlnaHQ6IDxudW1iZXI+XG5cdFx0Y2FwdGlvbk1hcmdpbjogPG51bWJlcj5cblx0XHRjYXB0aW9uTWF4SGVpZ2h0OiA8bnVtYmVyPlxuXHRcdHN1YmNhcHRpb25Gb250U2l6ZTogPG51bWJlcj5cblx0XHRzdWJjYXB0aW9uRm9udFdlaWdodDogPG51bWJlcj5cblx0XHRzdWJjYXB0aW9uTWFyZ2luOiA8bnVtYmVyPlxuXHRcdHN1YmNhcHRpb25NYXhIZWlnaHQ6IDxudW1iZXI+XG5cdFx0dGl0bGVBbGlnbjogPHN0cmluZz4gKFwibGVmdFwiIHwgXCJjZW50ZXJcIiB8IFwicmlnaHRcIilcblx0XHRjYXB0aW9uQWxpZ246IDxzdHJpbmc+IChcImxlZnRcIiB8IFwiY2VudGVyXCIgfCBcInJpZ2h0XCIpXG5cblx0XHQjIEljb25zXG5cdFx0aWNvbnM6IDxib29sZWFuPlxuXHRcdGljb25Cb3JkZXJSYWRpdXM6IDxudW1iZXI+XG5cdFx0aWNvblNpemU6IDxudW1iZXI+XG5cdFx0aWNvbk1hcmdpbjogPG51bWJlcj5cblxuXHRcdCMgSW1hZ2UgYXNzZXRzXG5cdFx0aW1hZ2VQcmVmaXg6IDxzdHJpbmc+IChcImltYWdlc1wiIGRpcmVjdG9yeSBhc3N1bWVkKVxuXHRcdGltYWdlU3VmZml4OiA8c3RyaW5nPlxuXHRcdGljb25QcmVmaXg6IDxzdHJpbmc+IChcImltYWdlc1wiIGRpcmVjdG9yeSBhc3N1bWVkKVxuXHRcdGljb25TdWZmaXg6IDxzdHJpbmc+XG5cblx0XHQjIEFjdGlvbnNcblx0XHRpdGVtQWN0aW9uczogPGFycmF5IG9mIGFjdGlvbnM+XG5cdFx0bGlua0FjdGlvbjogPGFjdGlvbj5cblxuXHRcdCMgVmlldyBDYXJvdXNlbENvbXBvbmVudCBmcmFtZVxuXHRcdGRlYnVnOiA8Ym9vbGVhbj5cblxuXHRcdCMgT3RoZXJcblx0XHRmb3JjZVNjcm9sbGluZzogPGJvb2xlYW4+XG5cblx0IyBVc2luZyBzaWRlIGNhcHRpb25zXG5cdFNwZWNpZnkgc2lkZUNhcHRpb25zOiB0cnVlIHRvIHZlcnRpY2FsbHkgYWxpZ24gY2FwdGlvbnMgYWxvbmdzaWRlIGNlbGxzIHJhdGhlciB0aGFuIHVuZGVybmVhdGguIFNwZWNpZnkgdG9wQWxpZ25TaWRlQ2FwdGlvbnM6IHRydWUgdG8gYWxpZ24gc2lkZSBjYXB0aW9ucyB0byB0aGUgdG9wcyBvZiB0aGVpciBhZGphY2VudCBjZWxscy5cblxuXHQjIFVzaW5nIHRoZSB3cmFwIGZlYXR1cmVcblx0IyBJZiB5b3Ugc3BlY2lmeSB3cmFwOiB0cnVlLCB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgY2Fyb3VzZWwgd2lsbCBkaXNwbGF5IG9uIGl0cyBvd24gcm93IGFzIGEgXCJoZXJvXCIgaXRlbS4gVGhpcyBpdGVtIGNhbiBiZSBjb250cm9sbGVkIGluZGVwZW5kZW50bHkgb2YgdGhlIHJlc3Qgb2YgdGhlIGNhcm91c2VsLiBTZWNvbmRhcnkgY2VsbHMgd2lsbCBiZSBzaXplZCBhY2NvcmRpbmcgdG8gc21hbGxJdGVtV2lkdGggYW5kIHNtYWxsSXRlbUhlaWdodCByYXRoZXIgdGhhbiBpdGVtV2lkdGggYW5kIGl0ZW1IZWlnaHQuXG5cblx0IyBVc2luZyBpY29uc1xuXHQjIEljb25zIGNhbiBiZSBkaXNwbGF5ZWQgdW5kZXIgZWFjaCBpdGVtJ3MgY2VsbC4gU3BlY2lmeSBpY29uczogdHJ1ZSB0byBlbmFibGUgdGhpcy4gRW5hYmxpbmcgaWNvbnMgcHJldmVudHMgdGhlIHVzZSBvZiBzaWRlIGNhcHRpb25zLlxuXG5cdCMgVXNpbmcgaW1hZ2VzXG5cdCMgQWxsIGltYWdlcyBhcmUgYXNzdW1lZCB0byBsaXZlIGluIHRoZSBpbWFnZXMgZGlyZWN0b3J5IGFuZCBiZSBudW1iZXJlZCB3aXRoIGFuIGluaXRpYWwgaW5kZXggb2YgemVyby4gWW91IG1heSBzdXBwbHkgYm90aCBhIHByZWZpeCBhbmQgc3VmZml4LiBJZiB5b3VyIGl0ZW0gaW1hZ2VzIGFyZSBsb2NhdGVkIGluIGFuIFwiaXRlbXNcIiBkaXJlY3Rvcnkgd2l0aGluIFwiaW1hZ2VzXCIgYW5kIG5hbWVkOlxuXG5cdGNlbGwwLnBuZ1xuXHRjZWxsMS5wbmdcblx0Y2VsbDIucG5nXG5cblx0IyB0aGVuIHlvdXIgaW1hZ2VQcmVmaXggd291bGQgYmUgXCJpdGVtcy9jZWxsXCIgYW5kIHlvdXIgc3VmZml4IHdvdWxkIGJlIFwicG5nXCIuXG5cblx0IyBJY29uIGFzc2V0cyB3b3JrIHRoZSBzYW1lIHdheS5cblxuXHQjIERvIG5vdCBpbmNsdWRlIHRoZSBpbWFnZXMgZGlyZWN0b3J5IGluIGltYWdlUHJlZml4IG9yIGljb25QcmVmaXguXG5cblx0IyBBc3NpZ25pbmcgbWFyZ2luc1xuXHQjIE1hcmdpbnMgYXJlIHN1cHBsaWVkIGluIHRoZSBzYW1lIG9yZGVyIGFzIGZvciBDU1MuIG1hcmdpbnM6IFs0MCwgMTAsIDE1LCA1XSB3aWxsIHByb3ZpZGUgYSB0b3AgbWFyZ2luIG9mIDQwLCBhIHJpZ2h0IG1hcmdpbiBvZiAxMCwgYSBib3R0b20gbWFyZ2luIG9mIDE1IGFuZCBhIGxlZnQgbWFyZ2luIG9mIDUuIFRoZSBmaXJzdCBpdGVtIGlzIHBvc2l0aW9uZWQgYWNjb3JkaW5nIHRvIHRoZSB0b3AgbWFyZ2luOyBob3dldmVyIHRoZSB0aXRsZSBhbmQgbGluayBhcmUgcG9zaXRpb25lZCByZWxhdGl2ZSB0byB0aGUgZmlyc3QgaXRlbSB1c2luZyB0aXRsZU1hcmdpbi5cblxuXHQjIFNjcm9sbGluZ1xuXHQjIFRoZSBDYXJvdXNlbENvbXBvbmVudCB3aWxsIGF0dGVtcHQgdG8gcHJvdmlkZSBzY3JvbGxpbmcgb25seSB3aGVuIGl0cyBjb250ZW50IGV4dGVuZHMgYmV5b25kIHRoZSB2aXNpYmxlIGFyZWEuIFRvIGVuZm9yY2Ugc2Nyb2xsaW5nIHJlZ2FyZGxlc3MsIHNwZWNpZnkgZm9yY2VTY3JvbGxpbmc6IHRydWUuXG5cblx0IyBBc3NpZ25pbmcgYWN0aW9uc1xuXHQjIFRoZSBsaW5rIGJ1dHRvbiBpbiB0aGUgdXBwZXIgcmlnaHQgb2YgdGhlIGNhcm91c2VsIGNhbiBiZSBnaXZlbiBhbiBhY3Rpb24sIGFzIGNhbiBpbmRpdmlkdWFsIGl0ZW0gY2VsbHMuIFRoZSBsaW5rIHdpbGwgb25seSBhcHBlYXIgaWYgeW91IHN1cHBseSBhIHN0cmluZyB3aXRoIGxpbms6IDxzdHJpbmc+IGFuZCB0aGUgQ2Fyb3VzZWxDb21wb25lbnQgaW5jbHVkZXMgYXQgbGVhc3QgdHdvIGl0ZW1zLiBJdGVtIGFjdGlvbnMgc2hvdWxkIGJlIGFycmFuZ2VkIGluIGEgY29tbWEtc2VwYXJhdGVkIGFycmF5LCBvbmUgYWN0aW9uIHBlciBsaW5lLlxuXHRsaW5rQWN0aW9uOiAtPiBwcmludCBcImxpbmtcIlxuXHRpdGVtQWN0aW9uczogW1xuXHRcdC0+IHByaW50IFwiMVwiLFxuXHRcdC0+IHByaW50IFwic2Vjb25kXCIsXG5cdFx0LT4gcHJpbnQgXCJpdGVtIHRoZSB0aGlyZFwiXG5cdF1cblxuXHQjIFJlZmVycmluZyB0byBwYXJ0cyBvZiB0aGUgQ2Fyb3VzZWxDb21wb25lbnRcblx0IyBUaGUgQ2Fyb3VzZWxDb21wb25lbnQgY29udGFpbnMgYSBQYWdlQ29tcG9uZW50IHdoaWNoIGNhbiBiZSBhY2Nlc3NlZCB3aXRoIC5yb3cuIEl0ZW1zIGFuZCB0aGVpciBjb21wb25lbnRzIGNhbiBiZSBhY2Nlc3NlZCB3aXRoIHRoZSAuaXRlbXMgYXJyYXkuIC5oZXJvSXRlbSBpcyBhdmFpbGFibGUgd2hlbiB3cmFwIGlzIHNldCB0byB0cnVlLlxuXHRwcmludCBteUNhcm91c2VsLnJvdy5jdXJyZW50UGFnZVxuXHRwcmludCBteUNhcm91c2VsLmhlcm9JdGVtPy5jYXB0aW9uPy50ZXh0XG5cdHByaW50IG15Q2Fyb3VzZWwuaXRlbXNbMF0udGV4dEJsb2NrXG5cdHByaW50IG15Q2Fyb3VzZWwuaXRlbXNbMF0uY2VsbFxuIyMjXG5cbmRlZmF1bHRzID1cblx0aXRlbUNvdW50OiAzXG5cblx0ZGVidWc6IGZhbHNlXG5cdHJvdW5kZWQ6IGZhbHNlXG5cdHdyYXA6IGZhbHNlXG5cdHNpZGVDYXB0aW9uczogZmFsc2Vcblx0Y2FwdGlvbkFsaWduOiBcImxlZnRcIlxuXHR0aXRsZUFsaWduOiBcImxlZnRcIlxuXHR0b3BBbGlnblNpZGVDYXB0aW9uczogZmFsc2Vcblx0Y2VudGVyaGVyb0l0ZW06IGZhbHNlXG5cdGhlcm9DYXB0aW9uQWxpZ246IFwibGVmdFwiXG5cdHNpZGVIZXJvQ2FwdGlvbjogZmFsc2Vcblx0dG9wQWxpZ25IZXJvQ2FwdGlvbjogdHJ1ZVxuXHRpY29uczogZmFsc2Vcblx0Y2xpcDogdHJ1ZVxuXHRmb3JjZVNjcm9sbGluZzogZmFsc2Vcblx0bWFyZ2luczogWzQwLDAsMCwwXVxuXHRpdGVtTWFyZ2luOiAxMlxuXHRpdGVtQm9yZGVyUmFkaXVzOiAxMFxuXHRpdGVtV2lkdGg6IDE2MFxuXHRpdGVtSGVpZ2h0OiAxMjBcblx0c21hbGxJdGVtV2lkdGg6IDgwXG5cdHNtYWxsSXRlbUhlaWdodDogNjBcblx0dGl0bGVGb250U2l6ZTogMjBcblx0dGl0bGVGb250V2VpZ2h0OiA4MDBcblx0dGl0bGVNYXJnaW46IDRcblx0bGlua0ZvbnRTaXplOiAxNlxuXHRsaW5rRm9udFdlaWdodDogNDAwXG5cdGNhcHRpb25Gb250U2l6ZTogMThcblx0Y2FwdGlvbkZvbnRXZWlnaHQ6IDQwMFxuXHRjYXB0aW9uTWF4SGVpZ2h0OiAxMDBcblx0c3ViY2FwdGlvbkZvbnRTaXplOiAxNlxuXHRzdWJjYXB0aW9uRm9udFdlaWdodDogNDAwXG5cdHN1YmNhcHRpb25NYXhIZWlnaHQ6IDEwMFxuXG5cdGljb25Cb3JkZXJSYWRpdXM6IDEwXG5cdGljb25TaXplOiA0MFxuXHRpY29uTWFyZ2luOiA4XG5cblx0Y2FwdGlvbk1hcmdpbjogMTBcblx0c3ViY2FwdGlvbk1hcmdpbjogMFxuXG5cdGJhY2tncm91bmRDb2xvcjogXCJjbGVhclwiXG5cdGJveENvbG9yOiBcIiNGNUY1RjVcIlxuXHRpY29uQ29sb3I6IFwiXCJcblx0dGl0bGVDb2xvcjogXCIjRjVGNUY1XCJcblx0bGlua0NvbG9yOiBcIlwiXG5cdGNhcHRpb25Db2xvcjogXCJcIlxuXHRzdWJjYXB0aW9uQ29sb3I6IFwiXCJcblxuXHRmb250RmFtaWx5OiBcIlwiXG5cdHRpdGxlOiBcIkNhcm91c2VsIFRpdGxlXCJcblx0bGluazogXCJcIlxuXHRpbWFnZVByZWZpeDogXCJcIlxuXHRpbWFnZVN1ZmZpeDogXCJwbmdcIlxuXHRpY29uUHJlZml4OiBcIlwiXG5cdGljb25TdWZmaXg6IFwicG5nXCJcblx0Y2FwdGlvbnM6IFtdXG5cdHN1YmNhcHRpb25zOiBbXVxuXHRpdGVtQWN0aW9uczogW11cblx0bGlua0FjdGlvbjogKCkgLT5cblxucm91bmRlZCA9XG5cdGl0ZW1XaWR0aDogMTIwXG5cdGl0ZW1IZWlnaHQ6IDEyMFxuXHRzbWFsbEl0ZW1XaWR0aDogNjBcblx0c21hbGxJdGVtSGVpZ2h0OiA2MFxuXG4jIENhcm91c2VsQ29tcG9uZW50IGNsYXNzXG5jbGFzcyBDYXJvdXNlbENvbXBvbmVudCBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0QG9wdGlvbnMgPSBfLmFzc2lnbih7fSwgZGVmYXVsdHMsIEBvcHRpb25zKVxuXHRcdGlmIEBvcHRpb25zLnJvdW5kZWQgPT0gdHJ1ZVxuXHRcdFx0QG9wdGlvbnMgPSBfLmFzc2lnbih7fSwgcm91bmRlZCwgQG9wdGlvbnMpXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdG5vb3AgPSAoKSAtPlxuXHRcdEAuaXRlbXMgPSBbXVxuXG5cdFx0IyBicmVhayBvdXQgbWFyZ2luc1xuXHRcdFt0b3BNYXJnaW4sIHJpZ2h0TWFyZ2luLCBib3R0b21NYXJnaW4sIGxlZnRNYXJnaW5dID0gQG9wdGlvbnMubWFyZ2luc1xuXG5cdFx0IyBjb250YWluZXIgdmlld1xuXHRcdEAuY2xpcCA9IEBvcHRpb25zLmNsaXBcblx0XHRALmJhY2tncm91bmRDb2xvciA9IEBvcHRpb25zLmJhY2tncm91bmRDb2xvclxuXHRcdEAud2lkdGggPSBAb3B0aW9ucy53aWR0aCBvciBTY3JlZW4ud2lkdGhcblx0XHRALnggPSBAb3B0aW9ucy54XG5cdFx0aWYgQG9wdGlvbnMuZGVidWcgPT0gdHJ1ZVxuXHRcdFx0QC5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMjU0LCAxNjMsIDMyLCAwLjI1KVwiXG5cblx0XHQjIGljb24gc2V0dGluZyBpbmNvbXBhdGliaWxlIHdpdGggc2lkZSBjYXB0aW9ucyBmb3Igbm93XG5cdFx0aWYgQG9wdGlvbnMuaWNvbnMgPT0gdHJ1ZVxuXHRcdFx0QG9wdGlvbnMuc2lkZUNhcHRpb25zID0gXCJub25lXCJcblxuXHRcdCMgb2Zmc2V0IGlzIHVzZWQgdG8gcGFzcyBvdmVyIDFzdCBjZWxsIGluIGEgd3JhcHBpbmcgc2l0dWF0aW9uXG5cdFx0b2Zmc2V0ID0gaWYgQG9wdGlvbnMud3JhcCA9PSB0cnVlIHRoZW4gMSBlbHNlIDBcblxuXHRcdCMgaGlkZGVuIG1hcmdpbiBoZWxwcyBjb250ZW50RnJhbWUoKSBwZXJmb3JtIGNvcnJlY3RseVxuXHRcdG1hcmdpbiA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHRuYW1lOiBcIm1hcmdpblwiXG5cdFx0XHR3aWR0aDogQC53aWR0aFxuXHRcdFx0aGVpZ2h0OiAxXG5cdFx0XHR2aXNpYmxlOiBmYWxzZVxuXG5cdFx0QC5tYXJnaW4gPSBtYXJnaW5cblxuXHRcdCMgY2Fyb3VzZWwgdGl0bGVcblx0XHR0aXRsZSA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0eDogbGVmdE1hcmdpblxuXHRcdFx0dGV4dDogQG9wdGlvbnMudGl0bGVcblx0XHRcdGZvbnRTaXplOiBAb3B0aW9ucy50aXRsZUZvbnRTaXplXG5cdFx0XHRjb2xvcjogQG9wdGlvbnMudGl0bGVDb2xvclxuXHRcdFx0dGV4dEFsaWduOiBAb3B0aW9ucy50aXRsZUFsaWduXG5cdFx0XHRmb250V2VpZ2h0OiBAb3B0aW9ucy50aXRsZUZvbnRXZWlnaHRcblx0XHRcdHdpZHRoOiBALndpZHRoIC0gbGVmdE1hcmdpbiAtIHJpZ2h0TWFyZ2luXG5cblx0XHRALnRpdGxlID0gdGl0bGVcblxuXHRcdHRpdGxlLm1heFkgPSB0b3BNYXJnaW4gLSBAb3B0aW9ucy50aXRsZU1hcmdpblxuXHRcdGlmIEBvcHRpb25zLmZvbnRGYW1pbHkgIT0gXCJcIiB0aGVuIHRpdGxlLmZvbnRGYW1pbHkgPSBAb3B0aW9ucy5mb250RmFtaWx5XG5cblx0XHQjIGNhcm91c2VsIGxpbmtcblx0XHRpZiBAb3B0aW9ucy5saW5rICE9IFwiXCJcblx0XHRcdGxpbmsgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRcdHBhcmVudDogQFxuXHRcdFx0XHR0ZXh0OiBAb3B0aW9ucy5saW5rXG5cdFx0XHRcdGZvbnRTaXplOiBAb3B0aW9ucy50aXRsZUZvbnRTaXplXG5cdFx0XHRcdG9yaWdpblg6IDFcblx0XHRcdFx0b3JpZ2luWTogMVxuXHRcdFx0XHRhdXRvU2l6ZTogdHJ1ZVxuXHRcdFx0XHRhdXRvU2l6ZUhlaWdodDogdHJ1ZVxuXHRcdFx0XHRjb2xvcjogQG9wdGlvbnMubGlua0NvbG9yIG9yIEBvcHRpb25zLmNhcHRpb25Db2xvciBvciBAb3B0aW9ucy50aXRsZUNvbG9yXG5cdFx0XHRcdHRleHRBbGlnbjogXCJyaWdodFwiXG5cdFx0XHRcdGZvbnRXZWlnaHQ6IEBvcHRpb25zLmxpbmtGb250V2VpZ2h0XG5cdFx0XHRcdHg6IEFsaWduLnJpZ2h0KC1yaWdodE1hcmdpbilcblx0XHRcdFx0eTogdGl0bGUueVxuXHRcdFx0XHRzY2FsZTogQG9wdGlvbnMubGlua0ZvbnRTaXplL0BvcHRpb25zLnRpdGxlRm9udFNpemVcblxuXHRcdFx0QC5saW5rID0gbGlua1xuXG5cdFx0XHRpZiBAb3B0aW9ucy5mb250RmFtaWx5ICE9IFwiXCIgdGhlbiBsaW5rLmZvbnRGYW1pbHkgPSBAb3B0aW9ucy5mb250RmFtaWx5XG5cdFx0XHRpZiBAb3B0aW9ucy5saW5rQWN0aW9uICE9IG5vb3Bcblx0XHRcdFx0bGluay5vbkNsaWNrID0+XG5cdFx0XHRcdFx0QG9wdGlvbnMubGlua0FjdGlvbigpXG5cblx0XHQjIGl0ZW0gY3JlYXRpb25cblx0XHRjcmVhdGVJdGVtID0gKGkgPSAwLCBwYXJlbnQgPSBudWxsLCBoZXJvID0gZmFsc2UpID0+XG5cdFx0XHRpZiBoZXJvID09IGZhbHNlIGFuZCBAb3B0aW9ucy53cmFwID09IHRydWVcblx0XHRcdFx0aW5kZXhPZmZzZXQgPSAxXG5cdFx0XHRcdGl0ZW1XaWR0aCA9IEBvcHRpb25zLnNtYWxsSXRlbVdpZHRoXG5cdFx0XHRcdGl0ZW1IZWlnaHQgPSBAb3B0aW9ucy5zbWFsbEl0ZW1IZWlnaHRcblx0XHRcdGVsc2Vcblx0XHRcdFx0aW5kZXhPZmZzZXQgPSAwXG5cdFx0XHRcdGl0ZW1XaWR0aCA9IEBvcHRpb25zLml0ZW1XaWR0aFxuXHRcdFx0XHRpdGVtSGVpZ2h0ID0gQG9wdGlvbnMuaXRlbUhlaWdodFxuXHRcdFx0aXRlbSA9IG5ldyBMYXllclxuXHRcdFx0XHRuYW1lOiBcIml0ZW1cIiArIChpICsgaW5kZXhPZmZzZXQpXG5cdFx0XHRcdHdpZHRoOiBpdGVtV2lkdGhcblx0XHRcdFx0aGVpZ2h0OiBpdGVtSGVpZ2h0XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJjbGVhclwiXG5cdFx0XHRcdGNsaXA6IGZhbHNlXG5cdFx0XHRpZiBwYXJlbnQgaW5zdGFuY2VvZiBQYWdlQ29tcG9uZW50XG5cdFx0XHRcdHBhcmVudC5hZGRQYWdlKGl0ZW0pXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGl0ZW0ucGFyZW50ID0gcGFyZW50XG5cblx0XHRcdCMgaXRlbSBjZWxsXG5cdFx0XHRibG9jayA9IG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IGl0ZW1cblx0XHRcdFx0bmFtZTogXCJibG9ja1wiICsgKGkgKyBpbmRleE9mZnNldClcblx0XHRcdFx0d2lkdGg6IGl0ZW1XaWR0aFxuXHRcdFx0XHRoZWlnaHQ6IGl0ZW1IZWlnaHRcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBAb3B0aW9ucy5ib3hDb2xvclxuXHRcdFx0XHRib3JkZXJSYWRpdXM6IEBvcHRpb25zLml0ZW1Cb3JkZXJSYWRpdXNcblx0XHRcdFx0aW1hZ2U6IFwiaW1hZ2VzL1wiICsgQG9wdGlvbnMuaW1hZ2VQcmVmaXggKyAoaSArIGluZGV4T2Zmc2V0KSArIFwiLlwiICsgQG9wdGlvbnMuaW1hZ2VTdWZmaXhcblx0XHRcdFx0c3R5bGU6XG5cdFx0XHRcdFx0XCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCIgOiBcImNlbnRlciBjZW50ZXJcIlxuXHRcdFx0XHRcdFwiYmFja2dyb3VuZC1zaXplXCIgOiBcImNvdmVyXCJcblxuXHRcdFx0aXRlbS5jZWxsID0gYmxvY2tcblxuXHRcdFx0IyBhc3NpZ24gaXRlbSBhY3Rpb25cblx0XHRcdGlmIEBvcHRpb25zLml0ZW1BY3Rpb25zW2kgKyBpbmRleE9mZnNldF0gIT0gbm9vcCBhbmQgQG9wdGlvbnMuaXRlbUFjdGlvbnNbaSArIGluZGV4T2Zmc2V0XSAhPSB1bmRlZmluZWRcblx0XHRcdFx0aXRlbS5vbkNsaWNrID0+XG5cdFx0XHRcdFx0cmV0dXJuIGlmIHBhcmVudC5wYXJlbnQuaXNEcmFnZ2luZ1xuXHRcdFx0XHRcdEBvcHRpb25zLml0ZW1BY3Rpb25zW2kgKyBpbmRleE9mZnNldF0oKVxuXG5cdFx0XHQjIGl0ZW0gaWNvblxuXHRcdFx0aWYgQG9wdGlvbnMuaWNvbnMgPT0gdHJ1ZVxuXHRcdFx0XHRpY29uID0gbmV3IExheWVyXG5cdFx0XHRcdFx0cGFyZW50OiBpdGVtXG5cdFx0XHRcdFx0bmFtZTogXCJpY29uXCIgKyAoaSArIGluZGV4T2Zmc2V0KVxuXHRcdFx0XHRcdHdpZHRoOiBAb3B0aW9ucy5pY29uU2l6ZVxuXHRcdFx0XHRcdGhlaWdodDogQG9wdGlvbnMuaWNvblNpemVcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBvcHRpb25zLmljb25Db2xvciBvciBAb3B0aW9ucy5ib3hDb2xvclxuXHRcdFx0XHRcdGJvcmRlclJhZGl1czogQG9wdGlvbnMuaWNvbkJvcmRlclJhZGl1c1xuXHRcdFx0XHRcdHk6IGJsb2NrLm1heFkgKyBAb3B0aW9ucy5pY29uTWFyZ2luXG5cdFx0XHRcdFx0aW1hZ2U6IFwiaW1hZ2VzL1wiICsgQG9wdGlvbnMuaWNvblByZWZpeCArIChpICsgaW5kZXhPZmZzZXQpICsgXCIuXCIgKyBAb3B0aW9ucy5pY29uU3VmZml4XG5cdFx0XHRcdFx0c3R5bGU6XG5cdFx0XHRcdFx0XHRcImJhY2tncm91bmQtcG9zaXRpb25cIiA6IFwiY2VudGVyIGNlbnRlclwiXG5cdFx0XHRcdFx0XHRcImJhY2tncm91bmQtc2l6ZVwiIDogXCJjb3ZlclwiXG5cblx0XHRcdFx0aXRlbS5pY29uID0gaWNvblxuXG5cdFx0XHQjIGl0ZW0gdGV4dCBjb250YWluZXIsIGVuYWJsZXMgdmVydGljYWwgYWxpZ25tZW50XG5cdFx0XHR0ZXh0QmxvY2sgPSBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBpdGVtXG5cdFx0XHRcdG5hbWU6IFwidGV4dEJsb2NrXCIgKyAoaSArIGluZGV4T2Zmc2V0KVxuXHRcdFx0XHR3aWR0aDogaWYgQG9wdGlvbnMuaWNvbnMgPT0gdHJ1ZSB0aGVuIGl0ZW1XaWR0aCAtIEBvcHRpb25zLmljb25TaXplIC0gQG9wdGlvbnMuaWNvbk1hcmdpbiBlbHNlIGl0ZW1XaWR0aFxuXHRcdFx0XHRoZWlnaHQ6IGl0ZW0uaGVpZ2h0XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJjbGVhclwiXG5cdFx0XHRcdHg6IEBjYXB0aW9uQWxpZ25Ib3Jpem9udGFsKChpZiBAb3B0aW9ucy5pY29ucyA9PSB0cnVlIHRoZW4gQG9wdGlvbnMuaWNvblNpemUgZWxzZSBibG9jay53aWR0aCksIGhlcm8pXG5cblx0XHRcdGl0ZW0udGV4dEJsb2NrID0gdGV4dEJsb2NrXG5cblx0XHRcdCMgaXRlbSBjYXB0aW9uXG5cdFx0XHRjYXB0aW9uID0gbmV3IFRleHRMYXllclxuXHRcdFx0XHRwYXJlbnQ6IHRleHRCbG9ja1xuXHRcdFx0XHRuYW1lOiBcImNhcHRpb25cIiArIChpICsgaW5kZXhPZmZzZXQpXG5cdFx0XHRcdHdpZHRoOiB0ZXh0QmxvY2sud2lkdGhcblx0XHRcdFx0Y29sb3I6IEBvcHRpb25zLmNhcHRpb25Db2xvciBvciBAb3B0aW9ucy50aXRsZUNvbG9yXG5cdFx0XHRcdHRleHQ6IEBvcHRpb25zLmNhcHRpb25zWyhpICsgaW5kZXhPZmZzZXQpXSBvciBcIlwiXG5cdFx0XHRcdHRleHRBbGlnbjogXCJsZWZ0XCJcblx0XHRcdFx0Zm9udFdlaWdodDogQG9wdGlvbnMuY2FwdGlvbkZvbnRXZWlnaHRcblx0XHRcdFx0Zm9udFNpemU6IEBvcHRpb25zLmNhcHRpb25Gb250U2l6ZVxuXG5cdFx0XHRpdGVtLmNhcHRpb24gPSBjYXB0aW9uXG5cblx0XHRcdGlmIGNhcHRpb24uaGVpZ2h0ID4gQG9wdGlvbnMuY2FwdGlvbk1heEhlaWdodFxuXHRcdFx0XHRjYXB0aW9uLmhlaWdodCA9IEBvcHRpb25zLmNhcHRpb25NYXhIZWlnaHRcblx0XHRcdFx0Y2FwdGlvbi50cnVuY2F0ZSA9IHRydWVcblxuXHRcdFx0aWYgQG9wdGlvbnMuZm9udEZhbWlseSAhPSBcIlwiIHRoZW4gY2FwdGlvbi5mb250RmFtaWx5ID0gQG9wdGlvbnMuZm9udEZhbWlseVxuXG5cdFx0XHQjIGl0ZW0gc3ViY2FwdGlvblxuXHRcdFx0aWYgQG9wdGlvbnMuc3ViY2FwdGlvbnMgIT0gW11cblx0XHRcdFx0c3ViY2FwdGlvbiA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdFx0XHRwYXJlbnQ6IHRleHRCbG9ja1xuXHRcdFx0XHRcdG5hbWU6IFwic3ViY2FwdGlvblwiICsgKGkgKyBpbmRleE9mZnNldClcblx0XHRcdFx0XHR3aWR0aDogdGV4dEJsb2NrLndpZHRoXG5cdFx0XHRcdFx0Y29sb3I6IEBvcHRpb25zLnN1YmNhcHRpb25Db2xvciBvciBAb3B0aW9ucy5jYXB0aW9uQ29sb3Igb3IgQG9wdGlvbnMudGl0bGVDb2xvclxuXHRcdFx0XHRcdHRleHQ6IEBvcHRpb25zLnN1YmNhcHRpb25zWyhpICsgaW5kZXhPZmZzZXQpXSBvciBcIlwiXG5cdFx0XHRcdFx0dGV4dEFsaWduOiBcImxlZnRcIlxuXHRcdFx0XHRcdGZvbnRXZWlnaHQ6IEBvcHRpb25zLnN1YmNhcHRpb25Gb250V2VpZ2h0XG5cdFx0XHRcdFx0Zm9udFNpemU6IEBvcHRpb25zLnN1YmNhcHRpb25Gb250U2l6ZVxuXHRcdFx0XHRcdGxldHRlclNwYWNpbmc6IC0wLjZcblx0XHRcdFx0XHR5OiBjYXB0aW9uLm1heFkgKyBAb3B0aW9ucy5zdWJjYXB0aW9uTWFyZ2luXG5cblx0XHRcdFx0aXRlbS5zdWJjYXB0aW9uID0gc3ViY2FwdGlvblxuXG5cdFx0XHRcdGlmIHN1YmNhcHRpb24uaGVpZ2h0ID4gQG9wdGlvbnMuc3ViY2FwdGlvbk1heEhlaWdodFxuXHRcdFx0XHRcdHN1YmNhcHRpb24uaGVpZ2h0ID0gQG9wdGlvbnMuc3ViY2FwdGlvbk1heEhlaWdodFxuXHRcdFx0XHRcdHN1YmNhcHRpb24udHJ1bmNhdGUgPSB0cnVlXG5cblx0XHRcdFx0aWYgQG9wdGlvbnMuZm9udEZhbWlseSAhPSBcIlwiIHRoZW4gc3ViY2FwdGlvbi5mb250RmFtaWx5ID0gQG9wdGlvbnMuZm9udEZhbWlseVxuXG5cdFx0XHQjIHJvdW5kIGl0ZW0gYmxvY2sgaWYgc3BlY2lmaWVkXG5cdFx0XHRpZiBAb3B0aW9ucy5yb3VuZGVkID09IHRydWVcblx0XHRcdFx0YmxvY2suYm9yZGVyUmFkaXVzID0gTWF0aC5tYXgoQG9wdGlvbnMuaXRlbVdpZHRoLCBAb3B0aW9ucy5pdGVtSGVpZ2h0KS8yXG5cblx0XHRcdCMgdGV4dCBhbGlnbm1lbnRcblx0XHRcdGNhcHRpb24udGV4dEFsaWduID0gQG9wdGlvbnMuY2FwdGlvbkFsaWduXG5cdFx0XHRzdWJjYXB0aW9uPy50ZXh0QWxpZ24gPSBAb3B0aW9ucy5jYXB0aW9uQWxpZ25cblxuXHRcdFx0IyBhZGQgdG8gYXJyYXlcblx0XHRcdEAuaXRlbXMucHVzaChpdGVtKVxuXG5cdFx0XHQjIHNpemUgdGV4dCBibG9jayBoZWlnaHQgdG8gbWF0Y2ggY29udGVudFxuXHRcdFx0dGV4dEJsb2NrLmhlaWdodCA9IHRleHRCbG9jay5jb250ZW50RnJhbWUoKS5oZWlnaHRcblx0XHRcdHRleHRCbG9jay55ID0gQGNhcHRpb25BbGlnblZlcnRpY2FsKGJsb2NrLmhlaWdodCwgaGVybylcblxuXHRcdFx0IyBzaXplIGl0ZW0gaGVpZ2h0IHRvIG1hdGNoIGNvbnRlbnRcblx0XHRcdGl0ZW0uaGVpZ2h0ID0gaXRlbS5jb250ZW50RnJhbWUoKS5oZWlnaHRcblx0XHRcdGl0ZW0ud2lkdGggPSBpdGVtLmNvbnRlbnRGcmFtZSgpLndpZHRoXG5cblx0XHRcdCMgY2Fyb3VzZWwgbWFyaWducyBhcmUgYXBwbGllZCBhZnRlciBwYWdlIGlzIGluIHBsYWNlXG5cdFx0XHRpZiBALml0ZW1zLmluZGV4T2YoaXRlbSkgPiBvZmZzZXRcblx0XHRcdFx0aXRlbS54ID0gaXRlbS54ICsgQG9wdGlvbnMuaXRlbU1hcmdpblxuXG5cdFx0IyBjcmVhdGUgaGVybyBjZWxsXG5cdFx0aWYgQG9wdGlvbnMud3JhcCA9PSB0cnVlXG5cdFx0XHRoZXJvSXRlbUNvbnRhaW5lciA9IG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0bmFtZTogXCJoZXJvSXRlbUNvbnRhaW5lclwiXG5cdFx0XHRcdHk6IHRvcE1hcmdpblxuXHRcdFx0XHR4OiBpZiBAb3B0aW9ucy5jZW50ZXJoZXJvSXRlbSA9PSB0cnVlIHRoZW4gQWxpZ24uY2VudGVyIGVsc2UgbGVmdE1hcmdpblxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiY2xlYXJcIlxuXHRcdFx0Y3JlYXRlSXRlbSgwLCBoZXJvSXRlbUNvbnRhaW5lciwgdHJ1ZSlcblx0XHRcdGhlcm9JdGVtQ29udGFpbmVyLmhlaWdodCA9IGhlcm9JdGVtQ29udGFpbmVyLmNvbnRlbnRGcmFtZSgpLmhlaWdodFxuXHRcdFx0aGVyb0l0ZW1Db250YWluZXIud2lkdGggPSBoZXJvSXRlbUNvbnRhaW5lci5jb250ZW50RnJhbWUoKS53aWR0aFxuXG5cdFx0XHRALmhlcm9JdGVtID0gaGVyb0l0ZW1Db250YWluZXIuY2hpbGRyZW5bMF1cblx0XHRcdEAuaGVyb0l0ZW0ubmFtZSA9IFwiaGVyb0l0ZW1cIlxuXG5cdFx0XHQjIGhlcm8gdGV4dCBhbGlnbm1lbnRcblx0XHRcdEAuaGVyb0l0ZW0uY2FwdGlvbi50ZXh0QWxpZ24gPSBAb3B0aW9ucy5oZXJvQ2FwdGlvbkFsaWduXG5cdFx0XHRALmhlcm9JdGVtLnN1YmNhcHRpb24/LnRleHRBbGlnbiA9IEBvcHRpb25zLmhlcm9DYXB0aW9uQWxpZ25cblxuXHRcdCMgY3JlYXRlIHRoZSBjYXJvdXNlbFxuXHRcdHJvdyA9IG5ldyBQYWdlQ29tcG9uZW50XG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdG5hbWU6IFwicm93XCJcblx0XHRcdHk6IGlmIEBvcHRpb25zLndyYXAgPT0gdHJ1ZSB0aGVuIGhlcm9JdGVtQ29udGFpbmVyLm1heFkgKyBAb3B0aW9ucy5pdGVtTWFyZ2luIGVsc2UgdG9wTWFyZ2luXG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogZmFsc2Vcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IHRydWVcblx0XHRcdHZlbG9jaXR5VGhyZXNob2xkOiAwLjFcblx0XHRcdGNsaXA6IGZhbHNlXG5cdFx0XHRvcmlnaW5YOiAwXG5cdFx0XHRjb250ZW50SW5zZXQ6XG5cdFx0XHRcdHRvcDogMFxuXHRcdFx0XHRyaWdodDogcmlnaHRNYXJnaW5cblx0XHRcdFx0Ym90dG9tOiAwXG5cdFx0XHRcdGxlZnQ6IGxlZnRNYXJnaW5cblxuXHRcdEAucm93ID0gcm93XG5cblx0XHQjIGFjY291bnQgZm9yIGEgXCJzaG9ydFwiIGNhcm91c2VsXG5cdFx0aWYgQG9wdGlvbnMuaXRlbUNvdW50IDwgMlxuXHRcdFx0cm93LnNjcm9sbEhvcml6b250YWwgPSBmYWxzZVxuXHRcdFx0bGluaz8uZGVzdHJveSgpXG5cblx0XHQjIGFjdHVhbGx5IHBvcHVsYXRlIHRoZSBjYXJvdXNlbCByb3cgd2l0aCBpdHMgaXRlbXNcblx0XHRmb3IgaSBpbiBbMC4uLkBvcHRpb25zLml0ZW1Db3VudCAtIG9mZnNldF1cblx0XHRcdGNyZWF0ZUl0ZW0oaSwgcm93LCBmYWxzZSlcblxuXHRcdCMgcHJldmVudCBvdmVyc2Nyb2xsXG5cdFx0cm93Lm9uU3dpcGVMZWZ0ID0+XG5cdFx0XHRpZiBAb3B0aW9ucy5mb3JjZVNjcm9sbGluZyAhPSB0cnVlIGFuZCBAY2hlY2tJZk5lZWRzU2Nyb2xsaW5nKHJvdylcblx0XHRcdFx0bWF4UGFnZSA9IEBvcHRpb25zLml0ZW1Db3VudCAtIE1hdGguZmxvb3IoQC53aWR0aCAvIChAb3B0aW9ucy5pdGVtV2lkdGggKyBAb3B0aW9ucy5pdGVtTWFyZ2luKSkgLSBvZmZzZXRcblx0XHRcdFx0aWYgcm93LmNvbnRlbnQubWF4WCA8IEAubWF4WFxuXHRcdFx0XHRcdHJvdy5zbmFwVG9QYWdlKEAuaXRlbXNbbWF4UGFnZV0pXG5cblx0XHQjIGFkanVzdCBjYXJvdXNlbCB0byBtYXRjaCBjb250ZW50XG5cdFx0cm93LndpZHRoID0gcm93LmNvbnRlbnQuY2hpbGRyZW5bMF0/LndpZHRoXG5cdFx0cm93LmNvbnRlbnQud2lkdGggPSByb3cuY29udGVudC5jb250ZW50RnJhbWUoKS53aWR0aFxuXHRcdHJvdy5jb250ZW50LmhlaWdodCA9IHJvdy5jb250ZW50LmNvbnRlbnRGcmFtZSgpLmhlaWdodFxuXHRcdHJvdy5oZWlnaHQgPSByb3cuY29udGVudEZyYW1lKCkuaGVpZ2h0XG5cdFx0cm93LmNvbnRlbnQuY2xpcCA9IGZhbHNlXG5cdFx0cm93LnNjcm9sbEhvcml6b250YWwgPSBAY2hlY2tJZk5lZWRzU2Nyb2xsaW5nKHJvdylcblx0XHRALmhlaWdodCA9IEAuY29udGVudEZyYW1lKCkuaGVpZ2h0ICsgYm90dG9tTWFyZ2luXG5cblx0Y2hlY2tJZk5lZWRzU2Nyb2xsaW5nOiAobGF5ZXIgPSBudWxsKSAtPlxuXHRcdGlmIEBvcHRpb25zLmZvcmNlU2Nyb2xsaW5nID09IHRydWVcblx0XHRcdG5lZWRzU2Nyb2xsaW5nID0gdHJ1ZVxuXHRcdGVsc2UgaWYgbGF5ZXIuY29udGVudD8uY29udGVudEZyYW1lKCkud2lkdGggPiBALndpZHRoXG5cdFx0XHRuZWVkc1Njcm9sbGluZyA9IHRydWVcblx0XHRlbHNlXG5cdFx0XHRuZWVkc1Njcm9sbGluZyA9IGZhbHNlXG5cdFx0cmV0dXJuIG5lZWRzU2Nyb2xsaW5nXG5cblx0Y2FwdGlvbkFsaWduVmVydGljYWw6IChpdGVtSGVpZ2h0ID0gMCwgaGVybyA9IGZhbHNlKSAtPlxuXHRcdGFsaWduID0gaXRlbUhlaWdodCArIEBvcHRpb25zLmNhcHRpb25NYXJnaW5cblx0XHRpZiBAb3B0aW9ucy5pY29ucyA9PSB0cnVlXG5cdFx0XHRhbGlnbiA9IGl0ZW1IZWlnaHQgKyBAb3B0aW9ucy5pY29uTWFyZ2luXG5cdFx0ZWxzZSBpZiBoZXJvID09IHRydWVcblx0XHRcdGlmIEBvcHRpb25zLnNpZGVIZXJvQ2FwdGlvbiA9PSB0cnVlXG5cdFx0XHRcdGlmIEBvcHRpb25zLnRvcEFsaWduSGVyb0NhcHRpb24gPT0gdHJ1ZVxuXHRcdFx0XHRcdGFsaWduID0gQWxpZ24udG9wXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRhbGlnbiA9IEFsaWduLmNlbnRlclxuXHRcdGVsc2UgaWYgQG9wdGlvbnMuc2lkZUNhcHRpb25zID09IHRydWVcblx0XHRcdGlmIEBvcHRpb25zLnRvcEFsaWduQ2FwdGlvbnMgPT0gdHJ1ZVxuXHRcdFx0XHRhbGlnbiA9IEFsaWduLnRvcFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRhbGlnbiA9IEFsaWduLmNlbnRlclxuXHRcdHJldHVybiBhbGlnblxuXG5cdGNhcHRpb25BbGlnbkhvcml6b250YWw6IChpdGVtV2lkdGggPSAwLCBoZXJvID0gZmFsc2UpIC0+XG5cdFx0YWxpZ24gPSBBbGlnbi5sZWZ0XG5cdFx0aWYgQG9wdGlvbnMuaWNvbnMgPT0gdHJ1ZVxuXHRcdFx0YWxpZ24gPSBpdGVtV2lkdGggKyBAb3B0aW9ucy5pY29uTWFyZ2luXG5cdFx0ZWxzZSBpZiBoZXJvID09IHRydWVcblx0XHRcdGlmIEBvcHRpb25zLnNpZGVIZXJvQ2FwdGlvbiA9PSB0cnVlXG5cdFx0XHRcdGFsaWduID0gaXRlbVdpZHRoICsgQG9wdGlvbnMuY2FwdGlvbk1hcmdpblxuXHRcdGVsc2UgaWYgQG9wdGlvbnMuc2lkZUNhcHRpb25zID09IHRydWVcblx0XHRcdGFsaWduID0gaXRlbVdpZHRoICsgQG9wdGlvbnMuY2FwdGlvbk1hcmdpblxuXHRcdGVsc2UgaWYgQG9wdGlvbnMuc2lkZUNhcHRpb25zID09IHRydWVcblx0XHRcdGFsaWduID0gaXRlbVdpZHRoICsgQG9wdGlvbnMuY2FwdGlvbk1hcmdpblxuXHRcdHJldHVybiBhbGlnblxubW9kdWxlLmV4cG9ydHMgPSBDYXJvdXNlbENvbXBvbmVudFxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFFQUE7O0FEQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBLG9DQUFBO0VBQUE7OztBQWdJQSxRQUFBLEdBQ0M7RUFBQSxTQUFBLEVBQVcsQ0FBWDtFQUVBLEtBQUEsRUFBTyxLQUZQO0VBR0EsT0FBQSxFQUFTLEtBSFQ7RUFJQSxJQUFBLEVBQU0sS0FKTjtFQUtBLFlBQUEsRUFBYyxLQUxkO0VBTUEsWUFBQSxFQUFjLE1BTmQ7RUFPQSxVQUFBLEVBQVksTUFQWjtFQVFBLG9CQUFBLEVBQXNCLEtBUnRCO0VBU0EsY0FBQSxFQUFnQixLQVRoQjtFQVVBLGdCQUFBLEVBQWtCLE1BVmxCO0VBV0EsZUFBQSxFQUFpQixLQVhqQjtFQVlBLG1CQUFBLEVBQXFCLElBWnJCO0VBYUEsS0FBQSxFQUFPLEtBYlA7RUFjQSxJQUFBLEVBQU0sSUFkTjtFQWVBLGNBQUEsRUFBZ0IsS0FmaEI7RUFnQkEsT0FBQSxFQUFTLENBQUMsRUFBRCxFQUFJLENBQUosRUFBTSxDQUFOLEVBQVEsQ0FBUixDQWhCVDtFQWlCQSxVQUFBLEVBQVksRUFqQlo7RUFrQkEsZ0JBQUEsRUFBa0IsRUFsQmxCO0VBbUJBLFNBQUEsRUFBVyxHQW5CWDtFQW9CQSxVQUFBLEVBQVksR0FwQlo7RUFxQkEsY0FBQSxFQUFnQixFQXJCaEI7RUFzQkEsZUFBQSxFQUFpQixFQXRCakI7RUF1QkEsYUFBQSxFQUFlLEVBdkJmO0VBd0JBLGVBQUEsRUFBaUIsR0F4QmpCO0VBeUJBLFdBQUEsRUFBYSxDQXpCYjtFQTBCQSxZQUFBLEVBQWMsRUExQmQ7RUEyQkEsY0FBQSxFQUFnQixHQTNCaEI7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
