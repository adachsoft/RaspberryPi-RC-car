class PluginsTab
{
    constructor()
    {
        $(document).ready(()=>{
            this.tab = $('#tabPlugins');
            this.registerButtons();
        });
    }

    registerButtons()
    {
        this.tab.find('.js-btn').on('click', (e)=>{
            let btn = $(e.currentTarget);
            let enable = !btn.hasClass('btn-success');
            if(enable){
                btn.removeClass('btn-danger').addClass('btn-success');
                btn.text('Off');
            }else{
                btn.removeClass('btn-success').addClass('btn-danger');
                btn.text('On');
            }
            this.save(btn.data('plugin'), enable);
        });
    }

    save(plugin, enable){
        $.ajax({
            type: "POST",
            url: 'plugin.php',
            data: {
                plugin: plugin,
                enable: enable
            },
        }).done((res)=>{
            console.log('SAVE: ' + res);
        });
    }
}