(function (window, $) {
    // simple helper method to always return px from an int or string int.
    var toPx = function (val) {
        return parseInt(val) + 'px';
    };
    $.fn.animatinator = function (options) {
        var self = this;
        // the timer interval is what we use to animate the frames using the private var animator
        var animator;
        // the current frame we are on, public so devs can use it zero based index
        self.currentFrame = 0;
        var defaults = {
            // the image path, must be a straight line of image frames all the same size.
            imgPath: '',
            // the width of each frame
            dimx: 0,
            // the height of the frame
            dimy: 0,
            // the number of animation frames
            frames: 15,
            // the duration of the animation
            duration: 1000,
            // starting frame index (0 based)
            startingFrame: 0,
            // jquery events can be defined in these objects to animate with callbacks defined
            // example:
            // start: {
            //   mouseenter: function () {},
            //   touchstart: function () {}
            // }
            // can also be just an array of events
            //example: reverse: ["mouseleave", "touchend"]
            start: {},
            stop: {},
            reverse: {}
        };

        // extend the options
        var opts = $.extend(defaults, options);
        
        // set the starting frame
        self.startingFrame = opts.startingFrame;

        // get the time interval between frames
        var stepTime = opts.duration / opts.frames;

        // generate the css steps
        var framesArray = new Array();
        for (var i = opts.frames - 1; i > -1; i--) {
            framesArray.push({
                "background-position": toPx(opts.dimx * i) + " 0px"
            });
        }
        // last becomes first.
        var last = framesArray.pop();
        framesArray.unshift(last);

        //begins animation from the current frame
        self.startAnimate = function (callback, evt) {
            clearInterval(animator);
            animator = setInterval(function () {
                if (self.currentFrame < framesArray.length) {
                    self.css(framesArray[self.currentFrame]);
                    self.currentFrame++;
                } else {
                    self.stopAnimate(callback, evt);
                }
            }, stepTime);
        };

        // starts aniating backwards from the current frame
        self.reverseAnimate = function (callback, evt) {
            clearInterval(animator);
            animator = setInterval(function () {
                if (self.currentFrame > 0) {
                    self.currentFrame--;
                    self.css(framesArray[self.currentFrame]);
                } else {
                    self.stopAnimate(callback, evt);
                }
            }, stepTime);
        };

        //stops the animation but leaves it where it is at.
        self.stopAnimate = function (callback, evt) {
            clearInterval(animator);
            animator = undefined;
            if (typeof callback == "function") {
                callback(self, evt);
            }
        };
        // jumps to display a certain frame
        self.gotoFrame = function (frame) {
            var f = framesArray[frame];
            if (f) {
                self.currentFrame = frame;
                self.css(f);
            }
        };

        // helper method to set up the events.
        var setup = function(key, val, fn) {
            if (typeof key == "number") {
                self.on(val, fn);
            } else {
                self.on(key, function(evt) {
                    fn(val, evt);
                });
            }
        };
        // setup events
        $.each(opts.start, function (key, val) {
            setup(key, val, self.startAnimate);
        });
        $.each(opts.reverse, function (key, val) {
            setup(key, val, self.reverseAnimate);
        });
        $.each(opts.stop, function (key, val) {
            setup(key, val, self.stopAnimate);
        });

        // set initial frame state.
        self.css($.extend({
            width: toPx(opts.dimx),
            height: toPx(opts.dimy),
            "background-image": "url('" + opts.imgPath + "')",
        }, framesArray[self.currentFrame]));
        return self;
    };
})(window, jQuery);