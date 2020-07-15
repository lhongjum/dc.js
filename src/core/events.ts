interface IEvents {
    current: () => void;
    trigger: ((closure: () => void, delay?:number) => void);
}

export const events: IEvents = {
    current: null,
    trigger: undefined
};

/**
 * This function triggers a throttled event function with a specified delay (in milli-seconds).  Events
 * that are triggered repetitively due to user interaction such brush dragging might flood the library
 * and invoke more renders than can be executed in time. Using this function to wrap your event
 * function allows the library to smooth out the rendering by throttling events and only responding to
 * the most recent event.
 * @name events.trigger
 * @example
 * chart.on('renderlet', function(chart) {
 *     // smooth the rendering through event throttling
 *     events.trigger(function(){
 *         // focus some other chart to the range selected by user on this chart
 *         someOtherChart.focus(chart.filter());
 *     });
 * })
 * @param {Function} closure
 * @param {Number} [delay]
 * @return {undefined}
 */
events.trigger = function (closure: () => void, delay?:number) {
    if (!delay) {
        closure();
        return;
    }

    events.current = closure;

    setTimeout(() => {
        if (closure === events.current) {
            closure();
        }
    }, delay);
};