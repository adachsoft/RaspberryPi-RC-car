
<div class="m-2">
    configServer
    <form action="save.php" method="POST">
        <input type="hidden" name="config_type" value="configServer" />
        <input type="hidden" name="url" value="index.php" />
        {assign var=SERVER value=['server.port', 'engineTimeOut', 'controller']}
        {foreach from=$SERVER item=$ITEM}
            <div class="input-group input-group-sm mb-1">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">{$ITEM}:</span>
                </div>
                <input type="text" name="config[{$ITEM}]" id="{$ITEM}" value="{$CONFIG_SERVER->getForTpl($ITEM)}" class="form-control-sm" style="width: 200px;">
            </div>
        {/foreach}
        <div class="input-group input-group-sm mb-1">
            <button type="submit" class="btn btn-success">Save</button>
        </div>
    </form>
    <hr>
    
    VehicleL298n
    <form action="save.php" method="POST">
        <input type="hidden" name="config_type" value="VehicleL298n" />
        <input type="hidden" name="url" value="index.php" />
        {assign var=SERVER value=['pinMotor0', 'pinMotor1', 'pinTurn0', 'pinTurn1', 'timeOut']}
        {foreach from=$SERVER item=$ITEM}
            <div class="input-group input-group-sm mb-1">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">{$ITEM}:</span>
                </div>
                <input type="text" name="config[{$ITEM}]" id="{$ITEM}" value="{$CONFIG_VEHICLEL298N->getForTpl($ITEM)}" class="form-control-sm" style="width: 200px;">
            </div>
        {/foreach}
        <div class="input-group input-group-sm mb-1">
            <button type="submit" class="btn btn-success">Save</button>
        </div>
    </form>
    <hr>
    
    {*config
    <form action="save.php" method="POST">
        <input type="hidden" name="config_type" value="config" />
        <input type="hidden" name="url" value="index.php" />
        {assign var=SERVER value=['maxEnginePower', 'maxTurnStrength', 'camera']}
        {foreach from=$SERVER item=$ITEM}
            <div class="input-group input-group-sm mb-1">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">{$ITEM}:</span>
                </div>
                <input type="text" name="config[{$ITEM}]" id="{$ITEM}" value="{$CONFIG->getForTpl($ITEM)}" class="form-control-sm" style="width: 200px;">
            </div>
        {/foreach}
        <div class="input-group input-group-sm mb-1">
            <button type="submit" class="btn btn-success">Save</button>
        </div>
    </form>
    <hr>*}
</div>
