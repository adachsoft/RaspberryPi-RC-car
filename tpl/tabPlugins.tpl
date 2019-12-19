<div class="m-2">
    <h2>Plugins</h2>
</div>

<table class="table" id="wifi_scan">
    <thead class="thead-dark">
        <tr>
            <th scope="col">Number</th>
            <th scope="col">Plugin</th>
            <th scope="col">Actions</th>
        </tr>
    </thead>
    <tbody>
        {foreach from=$PLUGINS->getAllPlugins() item=PLUGIN key=KEY}
            <tr id="wifi_scan_tpl" >
                <th scope="row" data-row='num'>{$KEY + 1}</th>
                <td>{$PLUGIN['name']}</td>
                <td>
                    {if $PLUGIN['enable']}
                        <button class="btn btn-success js-btn" data-plugin="{$PLUGIN['name']}">Off</button>
                    {else}
                        <button class="btn btn-danger js-btn" data-plugin="{$PLUGIN['name']}">On</button>
                    {/if}
                </td>
            </tr>
        {/foreach}
    </tbody>
</table>


    
