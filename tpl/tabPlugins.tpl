<div class="m-2">
    <h2>Plugins</h2>
</div>

{foreach from=$PLUGINS->getPlugins() item=PLUGIN key=KEY}
    {$PLUGIN}<br>
{/foreach}