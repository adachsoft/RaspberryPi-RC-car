class MjpegStreamer
{
    constructor()
    {
        this.imgStream = null;
    }

    init()
    {
        this.imgStream = $('#img_stream');
    }

    onConnecting()
    {
        
    }

    onOpen()
    {
        let src = this.imgStream.attr('src');
        this.imgStream.removeAttr("src").attr("src", src);
    }

    onClose()
    {
        this.imgStream.attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==');
    }
}