// used to detect the OS and browser of the user

export const useOs = () => {
    const device = useDevice();
    let devicename = '';
    if (device.isMacOS) {
        devicename = 'MacOS';
    } else if (device.isWindows) {
        devicename = 'Windows';
    } else if (device.isIos) {
        devicename = 'iOS';
    } else if (device.isAndroid) {
        devicename = 'Android';
    } else {
        return 'Unknown';
    }

    if (device.isChrome) {
        return devicename + ' Chrome';
    } else if (device.isFirefox) {
        return devicename + ' Firefox';
    } else if (device.isSafari) {
        return devicename + ' Safari';
    } else if (device.isEdge) {
        return devicename + ' Edge';
    } else {
        return devicename + ' Unknown';
    }
}