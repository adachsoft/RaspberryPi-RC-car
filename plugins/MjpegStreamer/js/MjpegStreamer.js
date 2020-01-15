class MjpegStreamer
{
    constructor()
    {
        this.imgStream = null;
        this.urlStream = null;
    }

    init()
    {
        this.imgStream = $('#img_stream');
        this.urlStream = this.imgStream.data('stream');
    }

    onConnecting()
    {
    }

    onOpen()
    {
        this.imgStream.removeAttr("src").attr("src", this.urlStream);
    }

    onClose()
    {
        this.imgStream.attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==');
    }
}