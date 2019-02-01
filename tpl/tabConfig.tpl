
<div class="m-2">
    {assign var=ITEMS value=['server.port', 'engineTimeOut', 'controller']}
    {assign var=CONFIG_OBJ value=$CONFIG_SERVER}
    {assign var=CONFIG_NAME value='configServer'}
    {include file='config.tpl'}
    
    {if $CONFIG_SERVER->get('controller')==='VehicleL298n'}
        {assign var=ITEMS value=['pinMotor0', 'pinMotor1', 'pinTurn0', 'pinTurn1', 'timeOut']}
        {assign var=CONFIG_OBJ value=$CONFIG_VEHICLEL298N}
        {assign var=CONFIG_NAME value='VehicleL298n'}
        {include file='config.tpl'}
    {elseif $CONFIG_SERVER->get('controller')==='VehicleServoPWM' }
        {assign var=ITEMS value=['pinMotor0', 'pinMotor1', 'pinServo', 'servoMin', 'servoMax', 'timeOut']}
        {assign var=CONFIG_OBJ value=$CONFIG_VEHICLEL_SERVO_PWM}
        {assign var=CONFIG_NAME value='VehicleServoPWM'}
        {include file='config.tpl'}
    {/if}
    
    {assign var=ITEMS value=['maxEnginePower', 'maxTurnStrength', 'camera']}
    {assign var=CONFIG_OBJ value=$CONFIG}
    {assign var=CONFIG_NAME value='config'}
    {include file='config.tpl'}
</div>
