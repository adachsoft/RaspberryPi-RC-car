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

    <!-- Modal -->
    <div class="modal fade" id="modalConnect" tabindex="-1" role="dialog" aria-labelledby="connectToWiFi" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="connectToWiFi">Connect to WiFi</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="input-group input-group-sm mb-1">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-sm">Password</span>
                </div>
                <input type="password" name="password" id="password" value="" class="form-control-sm">
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-denger data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success js-connect">Connect</button>
        </div>
        </div>
    </div>
    </div>

    <table class="table" id="wifi_scan">
        <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">bssid</th>
                <th scope="col">signalLevel</th>
                <th scope="col">frequency</th>
                <th scope="col">ssid</th>
                <th scope="col">actions</th>
            </tr>
        </thead>
        <tbody>
            <tr id="wifi_scan_tpl" class="d-none" data-ssid="">
                <th scope="row" data-row='num'>1</th>
                <td data-row='bssid'></td>
                <td data-row='signalLevel'></td>
                <td data-row='frequency'></td>
                <td data-row='ssid'></td>
                <td>
                    <button class="btn btn-success js-connect">Connect</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
