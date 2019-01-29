
<div class="m-2">
    <form action="" method="POST">
        {assign var=PWM value=['pwmA-0', 'pwmA-1', 'pwmB-0', 'pwmB-1']}
        {foreach from=$PWM item=$ITEM}
            <div class="input-group input-group-sm mb-1">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">{$ITEM}:</span>
                </div>
                <input type="text" name="{$ITEM}" id="{$ITEM}" value="" class="form-control-sm inputInt-1">
            </div>
        {/foreach}
    </form>
    <hr>
    
</div>
