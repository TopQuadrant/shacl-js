String.prototype.includes = function (s) {
    return this.indexOf(s) !== -1;
};
var Timer = Java.type('java.util.Timer');
var Phaser = Java.type('java.util.concurrent.Phaser');

var timer = new Timer('jsEventLoop', false);
var phaser = new Phaser();

var onTaskFinished = function () {
    phaser.arriveAndDeregister();
};

this.setTimeout = function (fn, millis /* [, args...] */) {
    var args = [].slice.call(arguments, 2, arguments.length);

    var phase = phaser.register();
    var canceled = false;
    timer.schedule(function () {
        if (canceled) {
            return;
        }

        try {
            fn.apply(this, args);
        } catch (e) {
            print(e);
        } finally {
            onTaskFinished();
        }
    }, millis);

    return function () {
        onTaskFinished();
        canceled = true;
    };
};

this.clearTimeout = function (cancel) {
    cancel();
};

this.setInterval = function (fn, delay /* [, args...] */) {
    var args = [].slice.call(arguments, 2, arguments.length);

    var cancel = null;

    var loop = function () {
        cancel = this.setTimeout(loop, delay);
        fn.apply(this, args);
    };

    cancel = this.setTimeout(loop, delay);
    return function () {
        cancel();
    };
};

this.clearInterval = function (cancel) {
    cancel();
};

global = this;
window = global;
console = {
    log: function (x) {
        print(x);
    }
};
