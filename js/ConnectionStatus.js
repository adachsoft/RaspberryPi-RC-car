class ConnectionStatus extends Base
{
    constructor()
    {
        super();
    }

    init()
    {
        this.connectionStatusHTML = $('#connectionStatus');
    }

    onConnecting()
    {
        this.connectionStatusHTML.removeClass('badge-danger badge-success').addClass('badge-warning');
        this.connectionStatusHTML.text('Connecting');
    }

    onOpen()
    {
        this.connectionStatusHTML.removeClass('badge-danger badge-warning').addClass('badge-success');
        this.connectionStatusHTML.text('Connected');
        $(document).trigger("rc_connected");
    }

    onClose()
    {
        this.connectionStatusHTML.removeClass('badge-success badge-warning').addClass('badge-danger');
        this.connectionStatusHTML.text('Disconnected');
        $(document).trigger("rc_disconnected");
    }
}