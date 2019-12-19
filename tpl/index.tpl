<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>RaspberryPi RC car - {$VERSION}</title>
    
    <meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=0.5">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link href="vendor/twbs/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="vendor/components/font-awesome/css/fontawesome-all.min.css" rel="stylesheet" type="text/css" />
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="vendor/gafhyb/justgage/raphael-2.1.4.min.js"></script>
    <script src="vendor/gafhyb/justgage/justgage.js"></script>
    <script src="/node_modules/nipplejs/dist/nipplejs.js"></script>
    {foreach from=$PLUGINS_JS_FILES item=PLUGIN}
        <script src="{$PLUGIN}"></script>
    {/foreach}
    <script src="js/Base.js?t={$TIME}"></script>
    <script src="js/MainRc.js?t={$TIME}"></script>
    <script src="js/PluginsTab.js?t={$TIME}"></script>
    <script src="js/PluginManager.js?t={$TIME}"></script>
    <script src="js/Meters.js?t={$TIME}"></script>
    <script src="js/Keyboard.js?t={$TIME}"></script>
    <script src="js/ConnectionStatus.js?t={$TIME}"></script>
    <script>
        const meters = new Meters();
        const keyboard = new Keyboard();
        const pluginsTab = new PluginsTab();
        var plugins = new Array();
        {foreach from=$PLUGINS_NAME item=PLUGIN}
            plugins.push(new {$PLUGIN}());
        {/foreach}
        plugins.push(new ConnectionStatus());

        const pluginManager = new PluginManager(plugins);
        const host = 'ws://{$HOST}:8000/websockets.php?t={$TIME}';
        const rcCar = new MainRc(host, pluginManager, meters);
        
        keyboard.addEventListener(rcCar);

        function save(){
            $.ajax({
                type: "POST",
                url: 'save.php',
                data: {
                    config_type: 'config',
                    config: {
                        maxEnginePower: $('#speed').val(),
                        maxTurnStrength: $('#turn').val(),
                    }
                },
            }).done((res)=>{
                
            });
        }
        
        function snapshot(){
            $.ajax({
                type: "POST",
                url: 'snapshot.php',
            }).done((res)=>{
                
            });
        }
        
        $( document ).ready(()=> {
            $('#speed').on('change', ()=>{
                save();
            });
            $('#turn').on('change', ()=>{
                save();
            });
            $('#snapshot').on('click', ()=>{
                snapshot();
            });
        });
        
    </script>
</head>
<body>
    {foreach from=$PLUGINS->getTplFilesIndex() item=PLUGIN_TPL_FILE_INDEX}
        {include file=$PLUGIN_TPL_FILE_INDEX}
    {/foreach}
    <div class="container">
        <div class="row">
            <div class="col-sm-1">
                <span class="badge badge-pill badge badge-warning" id="connectionStatus">Connecting</span>
            </div>
            <div class="col-sm-3 input-group input-group-sm">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Max engine power[%]:</span>
                </div>
                <input type="text" name="speed" id="speed" value="{$CONFIG->get('maxEnginePower')}" class="form-control-sm inputInt">
            </div>
            <div class="col-sm-3 input-group input-group-sm">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Max turn strength[%]:</span>
                </div>
                <input type="text" name="turn" id="turn" value="{$CONFIG->get('maxTurnStrength')}" class="form-control-sm inputInt">
            </div>
            <div class="col-sm-3 input-group input-group-sm">
                {if $CONFIG->get('camera')}
                <button type="button" class="btn btn-sm btn-success" id="snapshot">Snapshot</button>
                {/if}
            </div>
        </div>
    </div>
    
    <hr class="m-0">
    
    {include file='tabs.tpl'}
</body>
</html>
