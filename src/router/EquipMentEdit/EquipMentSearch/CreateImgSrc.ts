export default (uid: string) => {
    if (uid.length == 1) {
        return `https://static.image.mihoyo.com/hsod2_webview/images/broadcast_top/equip_icon/png/00${uid}.png`;
    }
    if (uid.length === 2) {
        return `https://static.image.mihoyo.com/hsod2_webview/images/broadcast_top/equip_icon/png/0${uid}.png`;
    }
    //https://static.image.mihoyo.com/hsod2_webview/images/broadcast_top/equip_icon/png/1442.png
    //https://static.image.mihoyo.com/hsod2_webview/images/broadcast_top/equip_icon/png/7060.png
    return `https://static.image.mihoyo.com/hsod2_webview/images/broadcast_top/equip_icon/png/${uid}.png`;
};
