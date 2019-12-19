class Plugins
{
    constructor()
    {
        console.log('Plugins');
        $(document).ready(()=>{
            this.tab = $('#tabPlugins');
            this.registerButtons();
        });
    }

    registerButtons()
    {
        console.log('gg: ', this.tab.find('.js-btn').length());

        this.tab.find('.js-btn').on('click', (e)=>{
            console.log('ZXCXZ');
        });
    }
}