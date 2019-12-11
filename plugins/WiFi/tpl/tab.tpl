<div id="tabWifiContainer">
    <div class="input-group input-group-sm mb-1">
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">WiFi SSID</span>
        </div>
        <div class="form-control-sm" id="currentWiFiName"></div>
    </div>
    <div class="input-group input-group-sm mb-1">
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">IP</span>
        </div>
        <div class="form-control-sm" id="currentIpAddr"></div>
    </div>

    <hr>

    {*<form action="" method="POST">
        
        <div class="input-group input-group-sm mb-1">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">WiFi</span>
            </div>
            
            
            <input type="text" name="wifi" value="" class="form-control-sm">
            
        </div>

        <div class="input-group input-group-sm mb-1">
            <button type="submit" class="btn btn-success">Save</button>
        </div>
    </form>*}

    <table class="table" id="wifi_scan">
        <thead class="thead-dark">
            <tr>
            <th scope="col">#</th>
            <th scope="col">bssid</th>
            <th scope="col">signalLevel</th>
            <th scope="col">frequency</th>
            <th scope="col">ssid</th>
            </tr>
        </thead>
        <tbody>
            <tr id="wifi_scan_tpl" class="d-none">
                <th scope="row" data-row='num'>1</th>
                <td data-row='bssid'></td>
                <td data-row='signalLevel'></td>
                <td data-row='frequency'></td>
                <td data-row='ssid'></td>
            </tr>
        </tbody>
    </table>
</div>
