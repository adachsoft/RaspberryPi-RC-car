<ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item">
        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#tabMain" role="tab" aria-controls="home" aria-selected="true">
            <i class="fas fa-gamepad"></i>&nbsp;
            Main
        </a>
    </li>
    <li class="nav-item">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#tabConfig" role="tab" aria-controls="profile" aria-selected="false">
            <i class="fas fa-arrows-alt"></i>&nbsp;
            Configuration
        </a>
    </li>
    <li class="nav-item">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#tabPlugins" role="tab" aria-controls="profile" aria-selected="false">
            <i class="fas fa-arrows-alt"></i>&nbsp;
            Plugins
        </a>
    </li>
    {if $CONFIG->get('camera')}
    <li class="nav-item">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#tabSnapshots" role="tab" aria-controls="profile" aria-selected="false">
            <i class="fas fa-arrows-alt"></i>&nbsp;
            Snapshots
        </a>
    </li>
    {/if}
    
    {foreach from=$PLUGINS->getTabs() item=TAB key=KEY}
        <li class="nav-item">
            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#tab_{$KEY}" role="tab" aria-controls="profile" aria-selected="false">
                <i class="fas fa-arrows-alt"></i>&nbsp;
                {$TAB['label']}
            </a>
        </li>
    {/foreach}
</ul>
<div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="tabMain" role="tabpanel" aria-labelledby="home-tab">
        {include file='tabMain.tpl'}
    </div>
    <div class="tab-pane fade" id="tabConfig" role="tabpanel" aria-labelledby="profile-tab">
        {include file='tabConfig.tpl'}
    </div>
    <div class="tab-pane fade" id="tabPlugins" role="tabpanel" aria-labelledby="profile-tab">
        {include file='tabPlugins.tpl'}
    </div>
    {if $CONFIG->get('camera')}
    <div class="tab-pane fade" id="tabSnapshots" role="tabpanel" aria-labelledby="profile-tab">
        {include file='tabSnapshots.tpl'}
    </div>
    {/if}
    {foreach from=$PLUGINS->getTabs() item=TAB key=KEY}
        <div class="tab-pane fade" id="tab_{$KEY}" role="tabpanel" aria-labelledby="profile-tab">
            {include file=$TAB['file']}
        </div>
    {/foreach}
</div>