// The dojo types reference MouseWheelEvent, which in some versions of TS is an alias
// for WheelEvent, but in others it is not. This is a workaround for that.
type MouseWheelEvent = WheelEvent;
