<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>RaspberryPi RC car - {$VERSION}</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=0.5">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link href="vendor/twbs/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="vendor/components/font-awesome/css/fontawesome-all.min.css" rel="stylesheet" type="text/css" />
    {foreach from=$PLUGINS_CSS_FILES item=PLUGIN}
        <link href="{$PLUGIN}" rel="stylesheet" type="text/css" />
    {/foreach}
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="vendor/gafhyb/justgage/raphael-2.1.4.min.js"></script>
    <script src="vendor/gafhyb/justgage/justgage.js"></script>
    {*<script src="/node_modules/nipplejs/dist/nipplejs.js"></script>*}
    <script src="js/PluginBase.js?t={$TIME}"></script>
    {foreach from=$JS_FILES item=$JS_FILE}
        <script src="{$JS_FILE}"></script>
    {/foreach}
    {foreach from=$PLUGINS_JS_FILES item=PLUGIN}
        <script src="{$PLUGIN}"></script>
    {/foreach}
    <script src="js/Base.js?t={$TIME}"></script>
    <script src="js/EventBus.js?t={$TIME}"></script>
    <script src="js/GamePadLib.js?t={$TIME}"></script>
    <script src="js/GamePadDrivingController.js?t={$TIME}"></script>
    <script src="js/MainRc.js?t={$TIME}"></script>
    <script src="js/PluginsTab.js?t={$TIME}"></script>
    <script src="js/PluginManager.js?t={$TIME}"></script>
    <script src="js/Meters.js?t={$TIME}"></script>
    <script src="js/Keyboard.js?t={$TIME}"></script>
    <script src="js/ConnectionStatus.js?t={$TIME}"></script>
    <script src="js/DrivingController.js?t={$TIME}"></script>
    <script>
        const eventBus = new EventBus();
        const gamePadLib = new GamePadLib();
        const gamePadDrivingController = new GamePadDrivingController(gamePadLib, eventBus);
        const meters = new Meters(eventBus);
        const keyboard = new Keyboard();
        const pluginsTab = new PluginsTab();
        const drivingController = new DrivingController(eventBus);
        var plugins = new Array();
        {foreach from=$PLUGINS_NAME item=PLUGIN}
            plugins.push(new {$PLUGIN}());
        {/foreach}
        plugins.push(new ConnectionStatus());

        const pluginManager = new PluginManager(plugins);
        const host = 'ws://{$HOST}:8000/websockets.php?t={$TIME}';
        const rcCar = new MainRc(host, pluginManager, eventBus, drivingController);
        //const rcCar = new MainRc(host, pluginManager, eventBus, gamePadDrivingController);
        
        keyboard.addEventListener(rcCar);
        keyboard.addEventListener(drivingController);

        function save()
        {
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
        
        function snapshot()
        {
            $.ajax({
                type: "POST",
                url: 'snapshot.php',
            }).done((res)=>{
                
            });
        }

        $( document ).ready(()=> {
            window.addEventListener("gamepadconnected", (e) => {
                var gp = navigator.getGamepads()[e.gamepad.index];
                console.log(
                    "Gamepad connected at index %d: %s. %d buttons, %d axes.",
                    gp.index, gp.id, gp.buttons.length, gp.axes.length
                );
            });
            $('[data-toggle="tooltip"]').tooltip();

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
    <input type="hidden" name="pluginsConfig" value='{$PLUGINS->getAllConfigInJson()}' class="js-pluginsConfig">
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
