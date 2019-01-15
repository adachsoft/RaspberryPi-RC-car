<?php

    require_once 'init.php';

    $imgFile = file_get_contents("http://127.0.0.1:8080/stream/snapshot.jpeg");
    
    
    file_put_contents('./snapshots/'.time().".jpg", $imgFile);