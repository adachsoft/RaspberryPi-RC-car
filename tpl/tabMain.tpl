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

<div style="display: none;">
    CURRENT SPEED:<input type="text" name="current_speed" id="current_speed" value="60">%<br>
    CURRENT TURN:<input type="text" name="current_turn" id="current_turn" value="70">%<br>
</div>
<div style="display: none;">
    {include file='gamepad.tpl'}
</div>
