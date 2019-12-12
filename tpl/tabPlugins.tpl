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
        {foreach from=$PLUGINS->getPlugins() item=PLUGIN key=KEY}
        <tr id="wifi_scan_tpl" >
            <th scope="row" data-row='num'>1</th>
            <td>{$PLUGIN}</td>
            <td>
                <button class="btn btn-success">On/Off</button>
            </td>
        </tr>
        {/foreach}
    </tbody>
</table>


    
