(function (window, $) {
    $.fn.animatinator = function(options) {
        var self = this;
        // the timer interval is what we use to animate the frames using the private var animator
        var animator;
        // the current frame we are on, public so devs can use it zero based index
        self.currentFrame = 0;
        var defaults = {
            // the element to animate the background image
            elemSelector: '',
            // the image path, must be a straight line of image frames all the same size.
            imgPath: '',
            // the width of each frame
            dimx: 0,
            // the height of the frame
            dimy: 0,
            // the number of animation frames
            animationSteps: 15,
            // the duration of the animation
            duration: 1000,
            // jquery events can be defined in these objects to animate
            // can also be just an array of events
            //example: reverse: ["mouseleave", "touchend"]
            start: {}, 
            stop: {},
            reverse: {}
        };

        // extend the options
        var opts = $.extend(defaults, options);

        // simple helper method to always return px from an int or string int.
        var toPx = function(val) {
            return parseInt(val) + 'px';
        };

        // get the time interval between frames
        var stepTime = opts.duration / opts.animationSteps;

        // generate the css steps
        var animateArray = new Array();
        for (var i = opts.animationSteps - 1; i > -1; i--) {
            animateArray.push({
                "background-position": toPx(opts.dimx * i) + " 0px"
            });
        }
        // last becomes first.
        var last = animateArray.pop();
        animateArray.unshift(last);

        self.start = function (callback, evt) {
            clearInterval(animator);
            animator = setInterval(function () {
                debugger;
                if (self.currentFrame < animateArray.length) {
                    self.css(animateArray[self.currentFrame]);
                    self.currentFrame++;
                } else {
                    self.stop(callback);
                }
            }, stepTime);
        };

        self.reverse = function(callback, evt) {
            clearInterval(animator);
            animator = setInterval(function() {
                if (self.currentFrame > 0) {
                    self.currentFrame--;
                    self.css(animateArray[self.currentFrame]);
                } else {
                    self.stop(callback);
                }
            }, stepTime);
        };

        self.stop = function(callback, evt) {
            clearInterval(animator);
            animator = undefined;
            if (typeof callback == "function") {
                callback(self, evt);
            }
        };
        $.each(opts.start, function(key, val) {
            if (typeof key == "number") {
                self.on(val, self.start);
            } else {
                self.on(key, function(evt) {
                    self.start(val, evt);
                });
            }
        });
        $.each(opts.reverse, function(key, val) {
            if (typeof key == "number") {
                self.on(val, self.reverse);
            } else {
                self.on(key, function(evt) {
                    self.reverse(val, evt);
                });
            }
        });
        $.each(opts.stop, function(key, val) {
            if (typeof key == "number") {
                self.on(val, self.stop);
            } else {
                self.on(key, function(evt) {
                    self.stop(val, evt);
                });
            }
        });

        self.css($.extend({
            width: toPx(opts.dimx),
            height: toPx(opts.dimy),
            "background-image": "url('" + opts.imgPath + "')",
        }, animateArray[self.currentFrame]));
        return self;
    };
})(window, jQuery);
