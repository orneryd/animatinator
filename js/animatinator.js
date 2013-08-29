function Animatinator(options) {
    var self = this;
    // the timer interval is what we use to animate the frames using the private var animator
    var animator;
    // the current frame we are on, public so devs can use it zero based index
    self.currentFrame = 0;
    var defaults = {
        // the element to animate the background image
        elemSelector: '',
        // the image path, must be a straight line of image frames all the same size.
        pngPath: '',
        // the width of each frame
        dimx: 0,
        // the height of the frame
        dimy: 0,
        // the number of animation frames
        animationSteps: 15,
        // the duration of the animation
        duration: 1000,
        // jquery events can be defined in these objects to animate
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
    for (var i = opts.animationSteps -1; i > -1; i--)
    {
        animateArray.push({
            "background-position": toPx(opts.dimx * i) + " 0px"
        });
    }
    // last becomes first.
    var last = animateArray.pop();
    animateArray.unshift(last);
    
    self.$elem = $(opts.elemSelector);
    self.start = function (callback, evt) {
        clearInterval(animator);
        animator = setInterval(function () {
            if (self.currentFrame < animateArray.length) {
                self.currentFrame++;
                self.$elem.css(animateArray[self.currentFrame]);
            } else {
                self.stop(callback);
            }
        }, stepTime);
    };
    
    self.reverse = function (callback, evt) {
        clearInterval(animator);
        animator = setInterval(function() {
            if (self.currentFrame > 0) {
                self.currentFrame--;
                self.$elem.css(animateArray[self.currentFrame]);
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
    
    for (var startEvent in opts.start) {
        self.$elem.on(startEvent, function (evt) {
            self.start(opts.start[startEvent], evt);
        });
    }
    for (var reverseEvent in opts.reverse) {
        self.$elem.on(reverseEvent, function (evt) {
            self.reverse(opts.reverse[reverseEvent], evt);
        });
    }
    for (var stopEvent in opts.stop) {
        self.$elem.on(stopEvent, function (evt) {
            self.stop(opts.stop[stopEvent], evt);
        });
    }
    self.$elem.css($.extend({
        width: toPx(opts.dimx),
        height: toPx(opts.dimy),
        "background-image": "url('" + opts.pngPath + "')",
    }, animateArray[self.currentFrame]));
	return self;
};