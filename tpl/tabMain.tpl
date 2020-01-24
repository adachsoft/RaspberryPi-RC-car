<div class="containerMain">
    <div class="panelLeft">
        {foreach from=$PLUGINS->getTplFilesPanelLeft() item=PLUGIN_TPL_FILE}
            {include file=$PLUGIN_TPL_FILE}
        {/foreach}
    </div>
    <div class="containerCtrl">
        <div class="hud">
            <span class="" id="cpu">CPU: <span class="js-value">0%<span></span>
        </div>
        {if $CONFIG->get('camera')}
        {include file=$CAMERA_TPL}
        {/if}
        <div class="meters">
            <div id="meterEnginePower" class="gauge" data-value="0"></div>
            <div id="meterTurnStrength" class="gauge" data-value="0"></div>
            <div id="meterTemp" class="gauge" data-value="0"></div>   
        </div>
    </div>
    <div class="panelRight">
        {foreach from=$PLUGINS->getTplFilesPanelRight() item=PLUGIN_TPL_FILE}
            {include file=$PLUGIN_TPL_FILE}
        {/foreach}
    </div>
</div>

<div style="display: none;">
    {include file='gamepad.tpl'}
</div>
