<ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item">
        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
            <i class="fas fa-gamepad"></i>&nbsp;
            Joysticks
        </a>
    </li>
    <li class="nav-item">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">
            <i class="fas fa-arrows-alt"></i>&nbsp;
            Buttons
        </a>
    </li>
</ul>
<div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <div id="con">
            <div id="left"></div>
            <div id="right"></div>
        </div>
    </div>
    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
        <div style="position: relative; width: 100%; min-height: 50vh;">
            <div class="btnController">
                <button type="button" class="btn btn-primary btn-lg btnControlUp" id="btnUp"><i class="fas fa-arrow-circle-up"></i></button>
                <button type="button" class="btn btn-primary btn-lg btnControlDown" id="btnDown"><i class="fas fa-arrow-circle-down"></i></button>
                <button type="button" class="btn btn-primary btn-lg btnControlLeft" id="btnLeft"><i class="fas fa-arrow-circle-left"></i></button>
                <button type="button" class="btn btn-primary btn-lg btnControlRight" id="btnRight"><i class="fas fa-arrow-circle-right"></i></button>
            </div>
        </div>
    </div>
</div>