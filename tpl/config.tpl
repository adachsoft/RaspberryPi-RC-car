
<h3>{$CONFIG_NAME}</h3>
<form action="save.php" method="POST">
    <input type="hidden" name="config_type" value="config" />
    <input type="hidden" name="url" value="index.php" />
    {foreach from=$ITEMS item=$ITEM}
        <div class="input-group input-group-sm mb-1">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">{$ITEM}:</span>
            </div>
            {assign var=CONF_VAL value=$CONFIG_OBJ->getForTpl($ITEM)}
            {if gettype($CONF_VAL)==='boolean'}
                <input type="hidden" name="config[{$ITEM}]" id="{$ITEM}" value="0" />
                <input type="checkbox" name="config[{$ITEM}]" id="{$ITEM}" value="1"{if $CONF_VAL} checked="checked"{/if} class="form-control-sm">
            {else}
                <input type="text" name="config[{$ITEM}]" id="{$ITEM}" value="{$CONF_VAL}" class="form-control-sm" style="width: 200px;">
            {/if}
        </div>
    {/foreach}
    <div class="input-group input-group-sm mb-1">
        <button type="submit" class="btn btn-success">Save</button>
    </div>
</form>
